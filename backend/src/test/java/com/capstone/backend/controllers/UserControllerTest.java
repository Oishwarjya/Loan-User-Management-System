package com.capstone.backend.controllers;

import com.capstone.backend.controllers.UserController;
import com.capstone.backend.entities.User;
import com.capstone.backend.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;

public class UserControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;
    ObjectMapper objectMapper = new ObjectMapper();
    ObjectWriter objectWriter = objectMapper.writer();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }


    @Test
    void testLogin() throws Exception {
        // Create a sample user object
        User user = new User("K123456", "password123");

        // Mock the userService to return a result
        when(userService.login(user)).thenReturn(createLoginResponse());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(user)))
            .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void testRegisterNewUser() throws Exception {
        // Create a sample user object
        User user = new User("K123456", "newPassword");

        // Mock the userService to return a result
        when(userService.register(user)).thenReturn(createRegisterResponse());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(user)))
            .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void testDeleteUser() throws Exception {
        // Mock the userService to return a result
        when(userService.deleteEmp("K123456")).thenReturn(createDeleteUserResponse());

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/user/K123456"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }


    private Map<String, Object> createLoginResponse() {
        Map<String, Object> response = new HashMap<>();
        // Create the expected response based on your service logic
        response.put("authStatus", true);
        response.put("statusCode", 200);
        response.put("message", "Log in successful");
        response.put("role", "user");
        return response;
    }

    private Map<String, Object> createRegisterResponse() {
        Map<String, Object> response = new HashMap<>();
        // Create the expected response based on your service logic
        response.put("availStatus", true);
        response.put("statusCode", 200);
        response.put("message", "User added successfully");
        return response;
    }

    private Map<String, String> createDeleteUserResponse() {
        Map<String, String> response = new HashMap<>();
        // Create the expected response based on your service logic
        response.put("statusCode", "200");
        response.put("message", "User deleted successfully");
        return response;
    }

}