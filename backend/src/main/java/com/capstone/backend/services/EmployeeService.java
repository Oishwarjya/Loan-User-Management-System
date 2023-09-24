package com.capstone.backend.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.controllers.EmployeeController;
import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.User;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.exceptions.TableEmptyException;
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

    public Map<String,Object> addEmp(Employee emp) throws RecordAlreadyExistsException,ResourceNotFoundException
    {
          Map<String, Object> object = new HashMap<>();
          User user = userRepository.findById(emp.getUserID()).orElse(null);
          Employee e = employeeRepository.findById(emp.getUserID()).orElse(null);
          if(user == null)
          {
                throw new ResourceNotFoundException("Employee not found");
          }
          else if(e == null)
          {
                employeeRepository.save(emp);
                object.put("statusCode", 200);
                object.put("message", "Employee added successfully");
            
          }
          else
          {
            System.out.println("Exception caught");
            throw new RecordAlreadyExistsException("Employee already exists");
          }
      return object;
    }

    public Map<String,Object> getAllEmp() 

    {
            List<Employee> empList = employeeRepository.findAll();
            Map<String, Object> object = new HashMap<>();
            if(empList.isEmpty())
            {
                  object.put("statusCode", 200);
                  object.put("message", "No Employees onboarded yet");
                  object.put("data",empList);
                  return object;
            }
            else
            {
                  object.put("statusCode", 200);
                  object.put("message", "Employees retrieved successfully");
                  object.put("data",empList);
                  return object;
            }
      }

      public Map<String,Object> updateEmp(Employee emp) throws ResourceNotFoundException
      {
          Map<String, Object> object = new HashMap<>();
      
          Employee e = employeeRepository.findById(emp.getUserID()).orElse(null);
          if(e == null)
          {
                throw new ResourceNotFoundException("Employee with the given ID does not exist");
            
          }
          else
          {
            employeeRepository.deleteById(emp.getUserID());
            employeeRepository.save(emp);
            object.put("statusCode", 200);
            object.put("message", "Employee updated successfully");
          }
          return object;
      }

      public Map<String,Object> deleteEmp(String id) throws ResourceNotFoundException
      {
          Map<String, Object> object = new HashMap<>();
      
          Employee e = employeeRepository.findById(id).orElse(null);
          if(e == null)
          {
                throw new ResourceNotFoundException("Employee with the given ID does not exist");
            
          }
          else
          {
            employeeRepository.deleteById(id);
            object.put("statusCode", 200);
            object.put("message", "Employee deleted successfully");
          }
          return object;
      }

      public Map<String,Object> getEmp(String id) throws ResourceNotFoundException
      {
          Map<String, Object> object = new HashMap<>();
      
          Employee e = employeeRepository.findById(id).orElse(null);
          if(e == null)
          {
                throw new ResourceNotFoundException("Employee with the given ID does not exist");
            
          }
          else
          {
            
            object.put("statusCode", "200");
            object.put("data",e);
            object.put("message", "Employee retrieved successfully");
          }
          return object;
      }

      public Map<String,Object> getOnBoardEmp() throws TableEmptyException

    {
            // List<String> onBoardList = new ArrayList<String>();
            List<Object> onBoardList = new ArrayList<Object>();
            List<User> userList =  userRepository.findAll();
            List<Employee> empList =  employeeRepository.findAll();

            if(userList.isEmpty())
            {
                  throw new TableEmptyException("User table is empty");
            }
            else
            {
                  Map<String, Object> object = new HashMap<>();
                  for(User user : userList)
                  {
                        if(!employeeRepository.existsById(user.getUserID()))
                        {
                              Map<String, Object> obj = new HashMap<>();
                              obj.put("userID", user.getUserID().toString());
                              onBoardList.add(obj);
                        }
                  }
                  object.put("statusCode", "200");
                  object.put("message", "New Employees retrieved successfully");
                  object.put("data",onBoardList);
                  return object;
            }
      }


}
