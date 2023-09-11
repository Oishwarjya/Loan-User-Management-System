package com.capstone.backend.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.controllers.EmployeeController;
import com.capstone.backend.entities.Employee;
import com.capstone.backend.repositories.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeService()
    {

    }

    public Map<String,String> addEmp(Employee emp)
    {
          Map<String, String> object = new HashMap<>();
          employeeRepository.save(emp);
          return object;
    }



}
