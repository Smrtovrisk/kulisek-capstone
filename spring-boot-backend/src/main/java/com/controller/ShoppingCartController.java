package com.controller;

import com.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/cart")
public class ShoppingCartController {

    @Autowired
    ShoppingCartService shoppingCartService;

    @PostMapping("/{emailid}/add/{productId}")
    public ResponseEntity<String> addItemToCart(@PathVariable String emailid, @PathVariable Long productId) {
        shoppingCartService.addItemToCart(emailid, productId);
        return ResponseEntity.ok("Item was added to cart successfully");
    }

    @PostMapping("/{emailid}/checkout")
    public ResponseEntity<String> checkout(@PathVariable String emailid, @RequestBody Double totalCost) {
        try {
            shoppingCartService.checkout(emailid, totalCost);
            return ResponseEntity.ok("Checkout was successful"); 
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An error occurred during checkout");
        }
    }
}
