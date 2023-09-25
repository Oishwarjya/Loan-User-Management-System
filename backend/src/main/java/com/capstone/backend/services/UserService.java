package com.capstone.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.repositories.UserRepository;


import com.capstone.backend.entities.User;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.exceptions.TableEmptyException;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

@Service
public class UserService{
    
    @Autowired
    private UserRepository userRepository;

    
    public UserService() {
    }


    public List < User > getAllUsers()  {
        return userRepository.findAll();
    }

    
     public Object login(User user) {

         Map<String, Object> object = new HashMap<>();
         User user1 = userRepository.findById(user.getUserID()).orElse(null);
         User admin = userRepository.getReferenceById("K123456");
         Pattern pattern = Pattern.compile("[a-z]\\d\\d\\d\\d\\d\\d", Pattern.CASE_INSENSITIVE);
         Matcher matcher = pattern.matcher(user.getUserID());
        if(matcher.matches())
        {
            if (user1 == null) {
             object.put("authStatus", false);
             object.put("role", null);
             return object;
             }

            if(StringUtils.equalsIgnoreCase(user.getUserID(), "K123456")){
                 if(StringUtils.equals(user.getPassword(),admin.getPassword()))
                 {
                     object.put("authStatus", true);
                     object.put("role", "admin");
                 }
             else
             {
                 object.put("authStatus", false);
                 object.put("role", "admin");
             }
            
         }
         else{
             if(StringUtils.equals(user1.getPassword(),user.getPassword()))
             {
                     object.put("authStatus", true);
                     object.put("role", "user");
             }
             else
             {
                 object.put("authStatus", false);
                 object.put("role", "user");
             }
            
         }
         return object;

        }
        else
        {
            return "Invalid ID";
        }
    }
    

    public Object register(User user) {
        Pattern pattern = Pattern.compile("[a-z]\\d\\d\\d\\d\\d\\d", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(user.getUserID());
        Map<String, Object> object = new HashMap<>();
        if (matcher.matches()) {
            User user1 = userRepository.findById(user.getUserID()).orElse(null);
            if (user1 == null) {
                object.put("availStatus", true);
                userRepository.save(user);
                return object;
            }
            else{
                object.put("availStatus", false);
                return object;
            }
        }
        else{
            return "Invalid ID";
        }
    }

    public Map<String,String> deleteEmp(String id) throws ResourceNotFoundException
      {
          Map<String, String> object = new HashMap<>();
      
          User e = userRepository.findById(id).orElse(null);
          if(e == null)
          {
                throw new ResourceNotFoundException("User with the given ID does not exist");
            
          }
          else
          {
            userRepository.deleteById(id);
            object.put("statusCode", "200");
            object.put("message", "Employee deleted successfully");
          }
          return object;
      }
}
    

