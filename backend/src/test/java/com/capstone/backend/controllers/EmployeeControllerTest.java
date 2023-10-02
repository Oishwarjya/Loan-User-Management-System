package com.capstone.backend.controllers;


import com.capstone.backend.entities.Employee;

import com.capstone.backend.services.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.mockito.Mockito.when;

public class EmployeeControllerTest {

    private MockMvc mockMvc;

    @InjectMocks
    private EmployeeController employeeController;

    @Mock
    private EmployeeService employeeService;

    ObjectMapper objectMapper = new ObjectMapper();
    ObjectWriter objectWriter = objectMapper.writer();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(employeeController).build();
    }

    @Test
    void testGetEmp() throws Exception {
        // Mock the behavior of the employeeService to return a result
        when(employeeService.getEmp("employeeId123")).thenReturn(createGetEmpResponse());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/employee/employeeId123"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testAddEmp() throws Exception {
        // Create a sample employee object
        Employee employee = new Employee();
        employee.setUserID("userId123");

        // Mock the behavior of the employeeService to return a result
        when(employeeService.addEmp(employee)).thenReturn(createAddEmpResponse());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/employee")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(employee)))
            .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void testGetAllEmp() throws Exception {
        // Mock the behavior of the employeeService to return a result
        when(employeeService.getAllEmp()).thenReturn(createGetAllEmpResponse());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/employees"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testUpdateEmp() throws Exception {
        // Create a sample employee object
        Employee employee = new Employee();
        employee.setUserID("userId123");

        // Mock the behavior of the employeeService to return a result
        when(employeeService.updateEmp(employee)).thenReturn(createUpdateEmpResponse());

        mockMvc.perform(MockMvcRequestBuilders.put("/api/employee/userId123")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(employee)))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testDeleteEmp() throws Exception {
        // Mock the behavior of the employeeService to return a result
        when(employeeService.deleteEmp("employeeId123")).thenReturn(createDeleteEmpResponse());

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/employee/employeeId123"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    void testGetOnBoardEmp() throws Exception {
        // Mock the behavior of the employeeService to return a result
        when(employeeService.getOnBoardEmp()).thenReturn(createGetOnBoardEmpResponse());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/employees/onboard"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }

    private Map<String, Object> createGetEmpResponse() {
        Map<String, Object> response = new HashMap<>();
        Employee employee = new Employee();
        employee.setUserID("employeeId123");
        response.put("statusCode", 200);
        response.put("message", "Employee retrieved successfully");
        response.put("data", employee);
        return response;
    }

    private Map<String, Object> createAddEmpResponse() {
        Map<String, Object> response = new HashMap<>();
        response.put("statusCode", 200);
        response.put("message", "Employee added successfully");
        return response;
    }

    private Map<String, Object> createGetAllEmpResponse() {
        Map<String, Object> response = new HashMap<>();
        List<Employee> empList = new ArrayList<>();
        // Populate empList with Employee objects as needed
        response.put("statusCode", 200);
        response.put("message", "Employees retrieved successfully");
        response.put("data", empList);
        return response;
    }

    private Map<String, Object> createUpdateEmpResponse() {
        Map<String, Object> response = new HashMap<>();
        response.put("statusCode", 200);
        response.put("message", "Employee updated successfully");
        return response;
    }

    private Map<String, Object> createDeleteEmpResponse() {
        Map<String, Object> response = new HashMap<>();
        response.put("statusCode", 200);
        response.put("message", "Employee deleted successfully");
        return response;
    }

    private Map<String, Object> createGetOnBoardEmpResponse() {
        Map<String, Object> response = new HashMap<>();
        List<Object> onBoardList = new ArrayList<>();
        // Populate onBoardList with objects as needed
        response.put("statusCode", 200);
        response.put("message", "New Employees retrieved successfully");
        response.put("data", onBoardList);
        return response;
    }

    
}