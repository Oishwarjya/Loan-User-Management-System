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
import com.capstone.backend.entities.Item;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.services.EmployeeService;
import com.capstone.backend.services.UserService;
import com.capstone.backend.services.ItemService;



import jakarta.validation.Valid;

import com.capstone.backend.controllers.EmployeeController;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {

    @Autowired
    private ItemService itemService;
    

    //@PostMapping("/items")
    //@ResponseBody

    //public Map<String,String> addItem(@Valid @RequestBody Item item) throws RecordAlreadyExistsException,ResourceNotFoundException {

      //  return employeeService.addEmp(emp);
    //}





}

