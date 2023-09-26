package com.capstone.backend.services;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;
import com.capstone.backend.repositories.EmployeeRepository;
import com.capstone.backend.repositories.UserRepository;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.exceptions.TableEmptyException;
import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.User;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTests {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private EmployeeService employeeService;

    

    
    
    
    @Test
    public void testAddEmp() throws RecordAlreadyExistsException, ResourceNotFoundException {
        // Mock user and employee existence
        Employee emp = new Employee();
        emp.setUserID("123");
        User user = new User();
        user.setUserID("123");

        when(userRepository.findById("123")).thenReturn(Optional.of(user));
        when(employeeRepository.findById("123")).thenReturn(Optional.empty());

        // Test the addEmp method
        Map<String, Object> result = employeeService.addEmp(emp);
        assertEquals(200, result.get("statusCode"));
        assertEquals("Employee added successfully", result.get("message"));
    }

    @Test
    public void testAddEmpUserNotFound() throws RecordAlreadyExistsException, ResourceNotFoundException{
        // Mock user not found
        Employee emp = new Employee();
        emp.setUserID("123");

        when(userRepository.findById("123")).thenReturn(Optional.empty());

        // Test the addEmp method when user is not found
        try {
            employeeService.addEmp(emp);
        } catch (ResourceNotFoundException ex) {
            assertEquals("Employee not found", ex.getMessage());
        }
        
    }

    @Test
    public void testAddEmpEmployeeAlreadyExists() throws RecordAlreadyExistsException, ResourceNotFoundException{
        // Mock user and employee existence
        Employee emp = new Employee();
        emp.setUserID("123");
        User user = new User();
        user.setUserID("123");

        when(userRepository.findById("123")).thenReturn(Optional.of(user));
        when(employeeRepository.findById("123")).thenReturn(Optional.of(emp));

        // Test the addEmp method when employee already exists
        try {
            employeeService.addEmp(emp);
        } catch (RecordAlreadyExistsException ex) {
            assertEquals("Employee already exists", ex.getMessage());
        }
    }

    // Similar tests for other methods can be added here

    @Test
    public void testUpdateEmp() throws ResourceNotFoundException {
        Employee emp = new Employee();
        emp.setUserID("1");
        emp.setName("John");
        

        when(employeeRepository.findById("1")).thenReturn(Optional.of(emp));

        Map<String, Object> result = employeeService.updateEmp(emp);
        assertEquals(200, result.get("statusCode"));
        assertEquals("Employee updated successfully", result.get("message"));
    }

    @Test
    public void testUpdateEmpNotFound() {
        Employee emp = new Employee();
        emp.setUserID("1");
        emp.setName("John");

        lenient().when(employeeRepository.findById("3")).thenReturn(Optional.empty());

        try {
            employeeService.updateEmp(emp);
        } catch (ResourceNotFoundException ex) {
            assertEquals("Employee with the given ID does not exist", ex.getMessage());
        }
    }

    @Test
    public void testDeleteEmp() throws ResourceNotFoundException {
        Employee emp = new Employee();
        emp.setUserID("1");
        emp.setName("John");
        when(employeeRepository.findById("1")).thenReturn(Optional.of(emp));

        Map<String, Object> result = employeeService.deleteEmp("1");
        assertEquals(200, result.get("statusCode"));
        assertEquals("Employee deleted successfully", result.get("message"));
    }

    @Test
    public void testDeleteEmpNotFound() {
        when(employeeRepository.findById("3")).thenReturn(Optional.empty());

        try {
            employeeService.deleteEmp("3");
        } catch (ResourceNotFoundException ex) {
            assertEquals("Employee with the given ID does not exist", ex.getMessage());
        }
    }

    @Test
    public void testGetEmp() throws ResourceNotFoundException {
        Employee emp = new Employee();
        emp.setUserID("1");
        emp.setName("John");

        when(employeeRepository.findById("1")).thenReturn(Optional.of(emp));

        Map<String, Object> result = employeeService.getEmp("1");
        assertEquals("200", result.get("statusCode"));
        assertEquals(emp,result.get("data"));
        assertEquals("Employee retrieved successfully", result.get("message"));
    }

    @Test
    public void testGetEmpNotFound() {
        when(employeeRepository.findById("3")).thenReturn(Optional.empty());

        try {
            employeeService.getEmp("3");
        } catch (ResourceNotFoundException ex) {
            assertEquals("Employee with the given ID does not exist", ex.getMessage());
        }
    }

    // @Test
    // public void testGetOnBoardEmp() throws TableEmptyException {
    //     List<User> userList = new ArrayList<>();
    //     User user1 =  new User();
    //     user1.setUserID("K071111");
    //     user1.setPassword("user1");
    //     User user2 =  new User();
    //     user1.setUserID("K071112");
    //     user1.setPassword("user2");
    //     userList.add(user1);
    //     userList.add(user2);

    //     when(userRepository.findAll()).thenReturn(userList);
    //     lenient().when(employeeRepository.existsById("1")).thenReturn(true);
    //     lenient().when(employeeRepository.existsById("2")).thenReturn(false);

    //     Map<String, Object> result = employeeService.getOnBoardEmp();
    //     assertEquals("200", result.get("statusCode"));
    //     assertEquals("New Employees retrieved successfully", result.get("message"));
    //     List<Object> onBoardList = (List<Object>) result.get("data");
    //     assertEquals(1, onBoardList.size());
    // }

    @Test
    public void testGetOnBoardEmpTableEmpty() {
        List<User> userList = new ArrayList<>();

        when(userRepository.findAll()).thenReturn(userList);

        try {
            employeeService.getOnBoardEmp();
        } catch (TableEmptyException ex) {
            assertEquals("User table is empty", ex.getMessage());
        }
    }
}

