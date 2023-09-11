package com.capstone.backend.services;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.controllers.EmployeeController;
import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.User;
import com.capstone.backend.repositories.EmployeeRepository;
import com.capstone.backend.repositories.UserRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    public EmployeeService()
    {

    }

    public Map<String,String> addEmp(Employee emp)
    {
          Map<String, String> object = new HashMap<>();
          User user = userRepository.findById(emp.getUserID()).orElse(null);
          if(user == null)
          {
                object.put("status", "failure");
                object.put("message", "Employee does not exist");
                return object;
          }
          else
          {
                employeeRepository.save(emp);
                object.put("status", "success");
                object.put("message", "Employee added successfully");
          }
          return object;
    }



}
