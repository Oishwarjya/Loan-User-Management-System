package com.capstone.backend.services;


import com.capstone.backend.entities.User;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.repositories.EmployeeRepository;
import com.capstone.backend.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        // Mock userRepository to return an empty list
        when(userRepository.findAll()).thenReturn(new ArrayList<>());

        // Call the getAllUsers method
        List<User> result = userService.getAllUsers();

        // Check if the result is not null and empty
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    // @Test
    // void testLoginAdminIncorrectPassword() {
    //     // Mock userRepository to return an admin user (K123456)
    //     User admin = new User("k123456", "adminPassword");
    //     when(userRepository.getReferenceById("k123456")).thenReturn(admin);
        

    //     // Create a user for login with an incorrect password
    //     User user = new User("k123456", "wrongPassword");
    //     when(userRepository.findById(user.getUserID())).thenReturn(Optional.of(user));

    //     // Call the login method
    //     Map<String,Object> result = userService.login(user);

    //     // Check if login fails when the password is incorrect
    //     assertNotNull(result);
    //     System.out.println(result);
    //     assertFalse((boolean) result.get("authStatus"));
    //     assertEquals(400, result.get("statusCode"));
    //     assertEquals("Incorrect password", result.get("message"));
    //     assertNull(result.get("role"));
    // }

    @Test
    void testLoginUserNotFound() {
        // Mock userRepository to return an admin user (K123456)
        User admin = new User("K123456", "adminPassword");
        when(userRepository.findById("K123456")).thenReturn(Optional.of(admin));
        

        // Create a user for login
        User user = new User("K123567", "userPassword");
        

        // Mock userRepository to return null for non-existing user
        when(userRepository.findById("k123567")).thenReturn(null);

        // Call the login method
        Map<String,Object> result = userService.login(user);

        // Check if login fails when the user is not found
        assertNotNull(result);
        assertFalse((boolean) result.get("authStatus"));
        assertEquals(404, result.get("statusCode"));
        assertEquals("User not found", result.get("message"));
        assertNull(result.get("role"));
    }

    @Test
    void testLoginUserEmployeeNotOnboarded() {
        // Mock userRepository to return an admin user (K123456)
        User admin = new User("K123456", "adminPassword");
        when(userRepository.getReferenceById("K123456")).thenReturn(admin);

        // Create a user for login
        User user = new User("K123457", "userPassword");

        // Mock userRepository to return a user, but employeeRepository returns null
        when(userRepository.findById("K123457")).thenReturn(Optional.of(user));
        when(employeeRepository.existsById("K123457")).thenReturn(false);

        // Call the login method
        var result = userService.login(user);

        // Check if login fails when the employee is not onboarded
        assertNotNull(result);
        assertFalse((boolean) result.get("authStatus"));
        assertEquals(400, result.get("statusCode"));
        assertEquals("Employee not onboarded yet", result.get("message"));
        assertNull(result.get("role"));
    }

    @Test
    void testRegisterNewUser() {
        // Create a new user
        User newUser = new User("k234567", "newPassword");

        // Mock userRepository to return null for the new user
        when(userRepository.findById("k234567")).thenReturn(Optional.empty());

        // Call the register method
        
        Map<String,Object> result = userService.register(newUser);
        
        // Check if registration is successful for a new user
        assertNotNull(result);
        
        assertTrue((boolean) result.get("availStatus"));
        assertEquals(200, result.get("statusCode"));
        assertEquals("User added successfully", result.get("message"));
    }

    @Test
    void testRegisterExistingUser() {
        // Mock userRepository to return an existing user (K123456)
        User existingUser = new User("K123456", "existingPassword");
        when(userRepository.findById("K123456")).thenReturn(Optional.of(existingUser));

        // Create a new user with the same ID as the existing user
        User newUser = new User("K123456", "newPassword");

        // Call the register method
        var result = userService.register(newUser);

        // Check if registration fails for an existing user
        assertNotNull(result);
        assertFalse((boolean) result.get("availStatus"));
        assertEquals(400, result.get("statusCode"));
        assertEquals("User already exists", result.get("message"));
    }

    @Test
    void testRegisterInvalidUserID() {
        // Create a new user with an invalid user ID
        User newUser = new User("invalidUserID", "newPassword");

        // Call the register method
        var result = userService.register(newUser);

        // Check if registration fails for an invalid user ID
        assertNotNull(result);
        assertFalse((boolean) result.get("availStatus"));
        assertEquals(400, result.get("statusCode"));
        assertEquals("Invalid ID", result.get("message"));
    }

    @Test
    void testDeleteEmployee() throws ResourceNotFoundException {
        // Mock userRepository to return an admin user (K123456)
        User admin = new User("K123456", "adminPassword");
        when(userRepository.getReferenceById("K123456")).thenReturn(admin);

        // Mock userRepository to return an admin user for findById
        when(userRepository.findById("K123456")).thenReturn(Optional.of(admin));

        // Mock employeeRepository to return a non-null employee
        // Employee emp = new Employee("K123456");
        // when(employeeRepository.findById("K123456")).thenReturn(emp);

        // Call the deleteEmp method
        var result = userService.deleteEmp("K123456");

        // Check if employee deletion is successful for the admin user
        assertNotNull(result);
    }
}