package com.Grocery.controller;

import com.Grocery.model.*;
import com.Grocery.repository.*;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class adminController {

    @Autowired private categoryRepo categoryRepo;
    @Autowired private groceryRepo groceryRepo;
    @Autowired private cartRepo cartRepo;
    @Autowired private serviceRepo serviceRepo;
    @Autowired private teamRepo teamRepo;
    @Autowired private orderRepo orderRepo;
    @Autowired private userRepo userRepo;
    @Autowired private adminRepo adminRepo;

    // ---------------- DASHBOARD ----------------
    @GetMapping("/dashboard")
    public Map<String,Object> adminDashboard(HttpServletRequest request){

        if(request.getSession().getAttribute("adminUser")==null){
            return null;
        }

        Map<String,Object> data = new HashMap<>();
        data.put("categories",categoryRepo.findAll());
        data.put("groceries",groceryRepo.findAll());
        data.put("orders",orderRepo.findByStatus("Pending"));
        return data;
    }

    // ---------------- CATEGORY SAVE ----------------
    @PostMapping("/category/save")
    public String saveCategory(@RequestParam String name,
                               @RequestParam MultipartFile imageFile){

        try{
            if(imageFile!=null && !imageFile.isEmpty()){

                String uploadDir="uploads/categories/";
                File folder=new File(uploadDir);
                if(!folder.exists())folder.mkdirs();

                String fileName=UUID.randomUUID()+"_"+imageFile.getOriginalFilename();
                Path filePath=Paths.get(uploadDir+fileName);
                Files.write(filePath,imageFile.getBytes());

                category cat=new category();
                cat.setName(name);
                cat.setImage(fileName);
                categoryRepo.save(cat);
            }
        }catch(IOException e){
            e.printStackTrace();
        }
        return "SAVED";
    }

    // ---------------- GROCERY SAVE ----------------
    @PostMapping("/grocery/save")
    public String saveGrocery(@ModelAttribute grocery g,
                              @RequestParam MultipartFile imageFile){

        try{
            if(imageFile!=null && !imageFile.isEmpty()){

                String uploadDir="uploads/groceries/";
                File folder=new File(uploadDir);
                if(!folder.exists())folder.mkdirs();

                String fileName=UUID.randomUUID()+"_"+imageFile.getOriginalFilename();
                Path filePath=Paths.get(uploadDir+fileName);
                Files.write(filePath,imageFile.getBytes());
                g.setImage(fileName);
            }
            groceryRepo.save(g);
        }catch(IOException e){
            e.printStackTrace();
        }
        return "SAVED";
    }

    // ---------------- GROCERY UPDATE ----------------
    @PostMapping("/grocery/update")
    public String updateGrocery(@ModelAttribute grocery g,
                                @RequestParam MultipartFile imageFile){

        try{
            grocery existing=groceryRepo.findById(g.getId()).orElse(null);
            if(existing==null) return "NOT FOUND";

            existing.setName(g.getName());
            existing.setPrice(g.getPrice());
            existing.setDiscountPercent(g.getDiscountPercent());
            existing.setCategory(g.getCategory());

            if(imageFile!=null && !imageFile.isEmpty()){

                String uploadDir="uploads/groceries/";
                File folder=new File(uploadDir);
                if(!folder.exists())folder.mkdirs();

                String fileName=UUID.randomUUID()+"_"+imageFile.getOriginalFilename();
                Path filePath=Paths.get(uploadDir+fileName);
                Files.write(filePath,imageFile.getBytes());
                existing.setImage(fileName);
            }
            groceryRepo.save(existing);

        }catch(IOException e){
            e.printStackTrace();
        }
        return "UPDATED";
    }

    // ---------------- CATEGORY DELETE ----------------
    @DeleteMapping("/category/{id}")
    public String deleteCategory(@PathVariable Long id){

        Optional<category> c=categoryRepo.findById(id);
        if(c.isPresent()){
            category cat=c.get();
            cat.setDelete(true);
            categoryRepo.save(cat);
        }
        return "DELETED";
    }

    // ---------------- GROCERY DELETE ----------------
    @DeleteMapping("/grocery/{id}")
    public String deleteGrocery(@PathVariable Long id){

        Optional<grocery> g=groceryRepo.findById(id);
        if(g.isPresent()){
            grocery item=g.get();
            item.setDelete(true);
            groceryRepo.save(item);
        }
        return "DELETED";
    }

    // ---------------- FILTERED CATEGORIES ----------------
    @GetMapping("/categories")
    public List<category> showAdminCategories(
            @RequestParam(required=false) String search,
            @RequestParam(required=false) String dateFilter,
            @RequestParam(required=false) String startDate,
            @RequestParam(required=false) String endDate,
            @RequestParam(required=false,defaultValue="name") String sortBy,
            @RequestParam(required=false,defaultValue="asc") String order){

        List<category> categories=categoryRepo.findByIsDeleteFalse();

        if(search!=null && !search.isEmpty()){
            categories=categories.stream()
            .filter(c->c.getName().toLowerCase()
            .contains(search.toLowerCase()))
            .toList();
        }

        return categories;
    }

    // ---------------- GROCERIES ----------------
    @GetMapping("/groceries")
    public List<grocery> showAdminGroceries(){
        return groceryRepo.findByDeleteFalseAndCategoryIsDeleteFalse();
    }

    // ---------------- ORDERS ----------------
    @GetMapping("/orders")
    public Map<String,Object> viewOrders(){

        List<order> orders=orderRepo.findByStatus("Confirmed");

        Map<String,Map<String,Integer>> ordersProductMap=new HashMap<>();

        for(order ord:orders){

            String orderId=ord.getOrderId();
            ordersProductMap.putIfAbsent(orderId,new HashMap<>());

            if(ord.getOrderItems()!=null){
                for(orderItem oi:ord.getOrderItems()){
                    String product=oi.getGroceryItem().getName();
                    int qty=oi.getQuantity();

                    ordersProductMap.get(orderId)
                    .put(product,
                    ordersProductMap.get(orderId)
                    .getOrDefault(product,0)+qty);
                }
            }
        }

        Map<String,Object> data=new HashMap<>();
        data.put("orders",orders);
        data.put("ordersProductMap",ordersProductMap);

        return data;
    }

    // ---------------- CONFIRM ORDER ----------------
    @PostMapping("/confirmOrder")
    public String confirmOrder(@RequestParam Long id){

        order order=orderRepo.findById(id).orElse(null);
        if(order!=null){
            order.setStatus("Confirmed");
            orderRepo.save(order);
        }
        return "CONFIRMED";
    }

    // ---------------- USERS ----------------
    @GetMapping("/users")
    public List<user> showUsers(){
        return userRepo.findAll();
    }

    // ---------------- ADMIN LOGIN ----------------
    @PostMapping("/login")
    public admin processLogin(@RequestBody admin a,
                              HttpServletRequest request){

        admin admin=adminRepo
        .findByUsernameAndPassword(
        a.getUsername(),
        a.getPassword());

        if(admin!=null){
            request.getSession()
            .setAttribute("adminUser",admin);
            return admin;
        }
        return null;
    }

    // ---------------- LOGOUT ----------------
    @GetMapping("/logout")
    public String logout(HttpServletRequest request){
        request.getSession().invalidate();
        return "LOGOUT";
    }
}
