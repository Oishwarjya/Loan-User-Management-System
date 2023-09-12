package com.capstone.backend.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.User;
import com.capstone.backend.services.EmployeeService;
import com.capstone.backend.services.UserService;

import jakarta.validation.Valid;

import com.capstone.backend.controllers.EmployeeController;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    

    @PostMapping("/employee")
    @ResponseBody
    public Map<String,String> addEmp(@Valid @RequestBody Employee emp) {

        return employeeService.addEmp(emp);
    }





}