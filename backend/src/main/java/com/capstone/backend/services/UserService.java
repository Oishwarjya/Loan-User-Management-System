package com.capstone.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.repositories.EmployeeRepository;
import com.capstone.backend.repositories.UserRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.User;
import com.capstone.backend.exceptions.ResourceNotFoundException;


import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class UserService{
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    
   


    public List < User > getAllUsers()  {
        return userRepository.findAll();
    }

    
     public Map<String, Object> login(User user) {

         Map<String, Object> object = new HashMap<>();
         User user1 = userRepository.findById(user.getUserID()).orElse(null);
         User admin = userRepository.getReferenceById("K123456");
         Pattern pattern = Pattern.compile("[a-z]\\d\\d\\d\\d\\d\\d", Pattern.CASE_INSENSITIVE);
         Matcher matcher = pattern.matcher(user.getUserID());
        if(matcher.matches())
        {
            if (user1 == null) {
                object.put("authStatus", false);
                object.put("statusCode", 404);
                object.put("message", "User not found");
                object.put("role", null);
             return object;
             }
            if(!(StringUtils.equalsIgnoreCase(user.getUserID(), "K123456")) && !(employeeRepository.existsById(user.getUserID()))) {
                object.put("authStatus", false);
                object.put("statusCode", 400);
                object.put("message", "Employee not onboarded yet");
                object.put("role", null);
                return object;
            }
            if(StringUtils.equalsIgnoreCase(user.getUserID(), "K123456")){
                 if(StringUtils.equals(user.getPassword(),admin.getPassword()))
                 {
                     object.put("authStatus", true);
                     object.put("statusCode", 200);
                     object.put("message", "Log in successfull");
                     object.put("role", "admin");
                 }
             else
             {
                 object.put("authStatus", false);
                 object.put("statusCode", 400);
                 object.put("message", "Incorrect password");
                 object.put("role", null);
             }
            
         }
         else{
             if(StringUtils.equals(user1.getPassword(),user.getPassword()))
             {
                     object.put("authStatus", true);
                     object.put("statusCode", 200);
                     object.put("message", "Log in successfull");
                     object.put("role", "user");
             }
             else
             {
                 object.put("authStatus", false);
                 object.put("statusCode", 400);
                 object.put("message", "Incorrect password");
                 object.put("role", null);
             }
            
         }
         return object;

        }
        else
        {
            object.put("availStatus", false);
            object.put("statusCode", 400);
            object.put("message", "Invalid ID");
            return object;
        }
    }
    

    public Map<String,Object> register(User user) {
        Pattern pattern = Pattern.compile("[a-z]\\d\\d\\d\\d\\d\\d", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(user.getUserID());
        Map<String, Object> object = new HashMap<>();
        if (matcher.matches()) {
            User user1 = userRepository.findById(user.getUserID()).orElse(null);
            if (user1 == null) {
                object.put("availStatus", true);
                object.put("statusCode", 200);
                object.put("data",user.getUserID());
                object.put("message", "User added successfully");
                userRepository.save(user);
                return object;
            }
            else{
                object.put("availStatus", false);
                object.put("statusCode", 400);
                object.put("data",user.getUserID());
                object.put("message", "User already exists");
                return object;
            }
        }
        else{
                object.put("availStatus", false);
                object.put("statusCode", 400);
                object.put("data",user.getUserID());
                object.put("message", "Invalid ID");
                return object;
        }
    }

    public Map<String,Object> deleteEmp(String id) throws ResourceNotFoundException
      {
          Map<String, Object> object = new HashMap<>();
      
          User e = userRepository.findById(id).orElse(null);
          if(e == null)
          {
                throw new ResourceNotFoundException("User with the given ID does not exist");
            
          }
          else
          {
            Employee emp = employeeRepository.findById(id).orElse(null);
            if(emp!=null)
            {
                employeeRepository.deleteById(id);
            }
            userRepository.deleteById(id);
            object.put("statusCode", 200);
            object.put("data",e.getUserID());
            object.put("message", "Employee deleted successfully");
          }
          return object;
      }
}
    
