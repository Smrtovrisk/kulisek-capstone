
package com.controller;

import com.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class ShoppingCartController {

    @Autowired
    ShoppingCartService shoppingCartService;

    @PostMapping("/{emailid}/add/{productId}")
    public void addItemToCart(@PathVariable String emailid, @PathVariable Long productId) {
        shoppingCartService.addItemToCart(emailid, productId);
    }

    @PostMapping("/{emailid}/checkout")
    public void checkout(@PathVariable String emailid) {
        shoppingCartService.checkout(emailid);
    }
}