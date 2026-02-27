package com.Grocery.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class orderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "grocery_item_id")
    private grocery groceryItem;

    // ⭐ VERY IMPORTANT (STOP INFINITE LOOP)
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id")
    private order order;

    // --- Getters & Setters ---
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public grocery getGroceryItem() {
        return groceryItem;
    }

    public void setGroceryItem(grocery groceryItem) {
        this.groceryItem = groceryItem;
    }

    public order getOrder() {
        return order;
    }

    public void setOrder(order order) {
        this.order = order;
    }
}