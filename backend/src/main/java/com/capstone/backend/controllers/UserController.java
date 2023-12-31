package com.capstone.backend.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.entities.User;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    

    @GetMapping("/users")
    public List < User > getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/login")
    @ResponseBody
    public Object login(@Valid @RequestBody User user) {
        return userService.login(user);
    }

    @PostMapping("/register")
    @ResponseBody
    public Object register(@Valid @RequestBody User user) 
    {
        return userService.register(user);
    }

    @DeleteMapping("/user/{id}")
    public Map<String,Object> deleteEmp(@PathVariable String id) throws ResourceNotFoundException
    {
        return userService.deleteEmp(id);
    }

}
