package com;

import com.entity.Product;
import com.repository.ProductRepository;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import com.entity.Login;
import com.repository.LoginRepository;

@SpringBootApplication(scanBasePackages = "com")
@EntityScan(basePackages = "com.entity")
@EnableJpaRepositories(basePackages = "com.repository")
public class SpringBootBackendApplication {

    @Autowired
    LoginRepository loginRepository;

    @Autowired
    ProductRepository productRepository;
    
    @PostConstruct
    public void setupDatabase() {
        adminAccountCreate();
        defaultProductCreate();
    }
    
    public void adminAccountCreate() {
        Login ll = new Login();
        ll.setEmailid("admin@gmail.com");
        ll.setPassword("admin@123");
        ll.setTypeofuser("admin");
        loginRepository.save(ll);
        System.out.println("Admin account created...");
    }

    public void defaultProductCreate() {
        long productCount = productRepository.count();
        if (productCount == 0) {
            Product defaultProduct = new Product();
            defaultProduct.setName("Paracetamol");
            defaultProduct.setDescription("Having a headache?.");
            defaultProduct.setPrice(100.0);
            productRepository.save(defaultProduct);
            System.out.println("Default product created...");
        }
    }
    
    public static void main(String[] args) {
        SpringApplication.run(SpringBootBackendApplication.class, args);
        System.out.println("Spring Boot backend ready");
    }
}
