package com.capstone.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.User;
import com.capstone.backend.services.EmployeeService;

import jakarta.validation.Valid;

import com.capstone.backend.controllers.EmployeeController;


@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/employee")
    @ResponseBody
    public Object addEmp(@Valid @RequestBody Employee emp) {
        return employeeService.addEmp(emp);
    }





}
