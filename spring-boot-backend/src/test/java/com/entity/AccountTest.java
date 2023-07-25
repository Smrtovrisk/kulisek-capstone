package com.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AccountTest {
    private Account account;

    @BeforeEach
    public void setUp() {
        account = new Account();
    }

    @Test
    public void testAccno() {
        int accno = 123;
        account.setAccno(accno);
        assertEquals(accno, account.getAccno());
    }

    @Test
    public void testEmailid() {
        String emailid = "test@example.com";
        account.setEmailid(emailid);
        assertEquals(emailid, account.getEmailid());
    }

    @Test
    public void testAmount() {
        float amount = 1000.0f;
        account.setAmount(amount);
        assertEquals(amount, account.getAmount());
    }
}
