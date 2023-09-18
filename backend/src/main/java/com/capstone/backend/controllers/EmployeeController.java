package com.capstone.backend.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.User;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.exceptions.TableEmptyException;
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
    

    @GetMapping("/employee/{id}")
    public Map<String,Object> getEmp(@PathVariable String id) throws ResourceNotFoundException {

        return employeeService.getEmp(id);
    }

    @PostMapping("/employee")
    @ResponseBody
    public Map<String,String> addEmp(@Valid @RequestBody Employee emp) throws RecordAlreadyExistsException,ResourceNotFoundException {

        return employeeService.addEmp(emp);
    }

    @GetMapping("/employees")
    @ResponseBody
    public Map<String,Object> getAllEmp() throws TableEmptyException
    {
        return employeeService.getAllEmp();
    }

    @PutMapping("/employee/{id}")
    public Map<String,String> updateEmp(@RequestBody Employee emp) throws ResourceNotFoundException
    {
        return employeeService.updateEmp(emp);
    }

    @DeleteMapping("/employee/{id}")
    public Map<String,String> deleteEmp(@PathVariable String id) throws ResourceNotFoundException
    {
        return employeeService.deleteEmp(id);
    }

    @GetMapping("/employees/onboard")
    public Map<String,Object> getOnBoardEmp() throws TableEmptyException
    {
        return employeeService.getOnBoardEmp();
    }





}
