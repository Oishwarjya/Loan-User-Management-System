package com.capstone.backend.services;

import java.util.HashMap;
import java.util.Map;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.controllers.EmployeeController;
import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.User;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.repositories.EmployeeRepository;
import com.capstone.backend.repositories.UserRepository;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    public EmployeeService()
    {

    }

    public Map<String,String> addEmp(Employee emp) throws RecordAlreadyExistsException,ResourceNotFoundException
    {
          Map<String, String> object = new HashMap<>();
          User user = userRepository.findById(emp.getUserID()).orElse(null);
          Employee e = employeeRepository.findById(emp.getUserID()).orElse(null);
          if(user == null)
          {
                throw new ResourceNotFoundException("Employee not found");
          }
          else if(e == null)
          {
                employeeRepository.save(emp);
                object.put("statusCode", "200");
                object.put("message", "Employee added successfully");
            
          }
          else
          {
            System.out.println("Exception caught");
            throw new RecordAlreadyExistsException("Employee already exists");
          }
      return object;
    }



}