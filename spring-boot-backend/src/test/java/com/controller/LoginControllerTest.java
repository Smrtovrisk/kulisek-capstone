package com.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.entity.Login;
import com.service.LoginService;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

public class LoginControllerTest {

    @InjectMocks
    private LoginController loginController;

    @Mock
    private LoginService loginService;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(loginController).build();
    }

    @Test
    void signInTest() throws Exception {
        Login login = new Login();
        login.setEmailid("test@gmail.com");
        login.setPassword("test123");
        login.setTypeofuser("test");

        when(loginService.signIn(login)).thenReturn("Customer success");

        mockMvc.perform(post("/login/signIn")
                .content("{ \"emailid\": \"test@gmail.com\", \"password\": \"test123\", \"typeofuser\": \"test\" }")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    void signUpTest() throws Exception {
        Login login = new Login();
        login.setEmailid("test@gmail.com");
        login.setPassword("test123");
        login.setTypeofuser("test");

        when(loginService.signUp(login)).thenReturn("Account created successfully");

        mockMvc.perform(post("/login/signUp")
                .content("{ \"emailid\": \"test@gmail.com\", \"password\": \"test123\", \"typeofuser\": \"test\" }")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
}
