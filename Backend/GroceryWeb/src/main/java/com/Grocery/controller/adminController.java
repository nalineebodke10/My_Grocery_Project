package com.Grocery.controller;

import com.Grocery.model.*;
import com.Grocery.repository.*;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.*;

import java.time.LocalDate;
import java.util.Comparator;

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

                String imageUrl = "http://localhost:8083/uploads/categories/" + fileName;

                category cat=new category();
                cat.setName(name);
                cat.setImage(imageUrl);   // ✅ CHANGED
                cat.setCreatedDate(LocalDate.now()); // ✅ ADD THIS
                categoryRepo.save(cat);
            }
        }catch(IOException e){
            e.printStackTrace();
        }
        return "SAVED";
    }
    
 // ---------------- CATEGORY UPDATE ----------------
    @PostMapping("/category/update")
    public String updateCategory(@RequestParam Long id,
                                 @RequestParam String name,
                                 @RequestParam(required=false) MultipartFile imageFile){

        try{

            category existing = categoryRepo.findById(id).orElse(null);
            if(existing==null) return "NOT FOUND";

            // Update Name
            existing.setName(name);

            // If new image selected
            if(imageFile!=null && !imageFile.isEmpty()){

                String uploadDir="uploads/categories/";
                File folder=new File(uploadDir);
                if(!folder.exists())folder.mkdirs();

                String fileName=UUID.randomUUID()+"_"+imageFile.getOriginalFilename();
                Path filePath=Paths.get(uploadDir+fileName);
                Files.write(filePath,imageFile.getBytes());

                String imageUrl =
                "http://localhost:8083/uploads/categories/"+fileName;

                existing.setImage(imageUrl);
            }

            categoryRepo.save(existing);

        }catch(IOException e){
            e.printStackTrace();
        }

        return "UPDATED";
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
            @RequestParam(required=false) String dateFilter,
            @RequestParam(required=false) String order){

        List<category> categories = categoryRepo.findByIsDeleteFalse();

        LocalDate today = LocalDate.now();

        // -------- DATE FILTER --------
        if(dateFilter != null){

            switch(dateFilter){

                case "today":
                    categories = categories.stream()
                    .filter(c -> c.getCreatedDate()!=null &&
                    c.getCreatedDate().isEqual(today))
                    .toList();
                    break;

                case "yesterday":
                    categories = categories.stream()
                    .filter(c -> c.getCreatedDate()!=null &&
                    c.getCreatedDate().isEqual(today.minusDays(1)))
                    .toList();
                    break;

                case "thisWeek":
                    categories = categories.stream()
                    .filter(c -> c.getCreatedDate()!=null &&
                    c.getCreatedDate().isAfter(today.minusDays(7)))
                    .toList();
                    break;

                case "thisMonth":
                    categories = categories.stream()
                    .filter(c -> c.getCreatedDate()!=null &&
                    c.getCreatedDate().getMonth() == today.getMonth())
                    .toList();
                    break;
            }
        }

        // -------- SORT --------
        if(order != null){

            if(order.equals("asc")){
                categories = categories.stream()
                .sorted(Comparator.comparing(category::getName))
                .toList();
            }

            if(order.equals("desc")){
                categories = categories.stream()
                .sorted(Comparator.comparing(category::getName).reversed())
                .toList();
            }
        }

        return categories;
    }

    // ---------------- GROCERIES ----------------
    @GetMapping("/groceries")
    public List<grocery> showAdminGroceries(){
        return groceryRepo.findByDeleteFalseAndCategoryIsDeleteFalse();
    }
    
 // ---------------- PENDING ORDERS (FOR DASHBOARD) ----------------
    @GetMapping("/pendingOrders")
    public List<order> getPendingOrders(){
        return orderRepo.findByStatus("Pending");
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
    public ResponseEntity<String> confirmOrder(@RequestParam Long id){

        order order = orderRepo.findById(id).orElse(null);

        if(order != null){
            order.setStatus("Confirmed");
            orderRepo.save(order);
            return ResponseEntity.ok("CONFIRMED");
        }

        return ResponseEntity.badRequest().body("FAILED");
    }

    // ---------------- USERS ----------------
    @GetMapping("/users")
    public List<user> showUsers(){
        return userRepo.findAll();
    }

    // ---------------- ADMIN LOGIN ----------------
    @PostMapping("/login")
    public ResponseEntity<?> processLogin(@RequestBody admin a,
                                          HttpServletRequest request){

        admin adminUser=adminRepo
        .findByUsernameAndPassword(
        a.getUsername(),
        a.getPassword());

        if(adminUser!=null){

            request.getSession()
            .setAttribute("adminUser",adminUser);

            return ResponseEntity.ok(adminUser);
        }
        else{
            return ResponseEntity
                   .status(401)
                   .body("Invalid Username or Password");
        }
    }

    // ---------------- LOGOUT ----------------
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){

    request.getSession().invalidate();

    return ResponseEntity.ok("LOGOUT");

    }
}
