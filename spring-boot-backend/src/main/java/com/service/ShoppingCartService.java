package com.service;

import com.entity.*;
import com.repository.AccountRepository;
import com.repository.ProductRepository;
import com.repository.ShoppingCartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class ShoppingCartService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Transactional
    public void addItemToCart(String emailid, Long productId) {
        Optional<Account> optionalAccount = accountRepository.findByEmailid(emailid);
        if (!optionalAccount.isPresent()) {
            throw new RuntimeException("Account not found");
        }
        Account account = optionalAccount.get();

        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (!optionalProduct.isPresent()) {
            throw new RuntimeException("Product not found");
        }
        Product product = optionalProduct.get();

        Optional<ShoppingCart> optionalShoppingCart = shoppingCartRepository.findByAccount(account);
        if (!optionalShoppingCart.isPresent()) {
            ShoppingCart shoppingCart = new ShoppingCart();
            shoppingCart.setAccount(account);
            shoppingCartRepository.save(shoppingCart);
        }
        ShoppingCart shoppingCart = optionalShoppingCart.get();

        boolean productExistsInCart = false;
        for (CartItem cartItem : shoppingCart.getCartItems()) {
            if (cartItem.getProduct().getId().equals(productId)) {
                cartItem.setQuantity(cartItem.getQuantity() + 1);
                productExistsInCart = true;
                break;
            }
        }

        if (!productExistsInCart) {
            CartItem newCartItem = new CartItem();
            newCartItem.setProduct(product);
            newCartItem.setQuantity(1);
            newCartItem.setShoppingCart(shoppingCart);
            shoppingCart.getCartItems().add(newCartItem);
        }

        shoppingCartRepository.save(shoppingCart);
    }

    @Transactional
    public void checkout(String emailid, Double totalCost) {
        Optional<Account> optionalAccount = accountRepository.findByEmailid(emailid);
        if (!optionalAccount.isPresent()) {
            throw new RuntimeException("Account not found");
        }
        Account account = optionalAccount.get();

        if (account.getAmount() < totalCost) {
            throw new RuntimeException("Insufficient funds");
        }

        account.setAmount(account.getAmount() - totalCost.floatValue());
        accountRepository.save(account);
    }}
