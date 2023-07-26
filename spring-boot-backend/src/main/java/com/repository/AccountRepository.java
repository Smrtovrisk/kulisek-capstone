package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer>{
    Optional<Account> findByEmailid(String emailid);
}