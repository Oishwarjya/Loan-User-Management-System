package com.capstone.backend.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.verify;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.capstone.backend.dtos.ApplyForLoanDTO;
import com.capstone.backend.entities.Loan;
import com.capstone.backend.exceptions.CannotDeleteRecordException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.exceptions.ValidationException;
import com.capstone.backend.services.LoanService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@ExtendWith(MockitoExtension.class)
@DisplayName("Loan Controller")
public class LoanControllerTest {

    @Autowired
    @InjectMocks
    LoanController loanController;

    @Mock
    LoanService loanService;

    private MockMvc mockMvc;
    ObjectMapper objMapper = new ObjectMapper();
    ObjectWriter objWriter = objMapper.writer();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(loanController).build();    
    }

    @Test
    @DisplayName("should call getAllLoans on GET to /loans")
    public void givenGETtoloans_thenReturnSuccess() throws Exception {
        Map<String, Object> retVal = new HashMap<>();
        retVal.put("statusCode",200);
        retVal.put("data", new ArrayList<Loan>());
        retVal.put("message","Successful GET for all loans");
 
        Mockito.when(loanService.getAllLoans()).thenReturn(retVal);
 
        mockMvc.perform(MockMvcRequestBuilders.get("/api/loans").contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Successful GET for all loans"));      
 
        verify(loanService).getAllLoans();
    }

    @Test
    @DisplayName("should call getLoansByUserID on GET to /loans/{userID}")
    public void givenGETloansByUserID_thenReturnSuccess() throws Exception {
        Map<String, Object> retVal = new HashMap<>();
        retVal.put("statusCode",200);
        retVal.put("data", new ArrayList<Loan>());
        retVal.put("message","Successful GET for all loans for a user");

        Mockito.when(loanService.getLoansByUserID(anyString())).thenReturn(retVal);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/loans/"+"A000001").contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Successful GET for all loans for a user"));      

        verify(loanService).getLoansByUserID("A000001");
    }

    @Test
    @DisplayName("should call addNewLoan on POST to /loan")
    public void givenPOSTloan_thenReturnSuccess() throws Exception {
        Map<String, Object> retVal = new HashMap<>();
        retVal.put("statusCode",200);
        retVal.put("data", new Loan());
        retVal.put("message","Successful POST for a loan");

        ApplyForLoanDTO dummyApplication = new ApplyForLoanDTO(
            "A000001",
            "Furniture", 
            "Wooden", 
            "Bed"
        );

        Mockito.when(loanService.addNewLoan(dummyApplication)).thenReturn(retVal);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/loan")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objWriter.writeValueAsString(dummyApplication)))
        .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Successful POST for a loan"));      

        verify(loanService).addNewLoan(dummyApplication);
    }

    @Test
    @DisplayName("should call addNewLoan on POST to /loan and return exception")
    public void givenPOSTloan_thenReturnException() throws Exception {

        ApplyForLoanDTO dummyApplication = new ApplyForLoanDTO(
            "A000001",
            "Furniture", 
            "Wooden", 
            "Bed"
        );

        Mockito.when(loanService.addNewLoan(dummyApplication))
        .thenThrow(new ResourceNotFoundException("No Items Available"));

        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class, () -> loanController.addNewLoan(dummyApplication));
        assertEquals(e.getMessage(),"No Items Available");
    }
    
    @Test
    @DisplayName("should call updateLoan on PUT to /loan")
    public void givenPUTloan_thenReturnSuccess() throws Exception {
        Loan loan = new Loan(
                (long)1,
                "A000001", 
                "Furniture", 
                (short)5, 
                "ACTIVE", 
                new SimpleDateFormat("yyyy-MM-dd").parse("2023-09-27"));
            
        Map<String, Object> retVal = new HashMap<>();
        retVal.put("statusCode",200);
        retVal.put("data", loan);
        retVal.put("message","Successful PUT for a loan");

        lenient().when(loanService.updateLoan(any())).thenReturn(retVal);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/loan")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objWriter.writeValueAsString(loan)))
        .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Successful PUT for a loan"));

        verify(loanService).updateLoan(any());
    }

    @Test
    @DisplayName("should call updateLoan on PUT to /loan and return resource not found exception")
    public void givenPUTloan_thenReturnRNFException() throws Exception {

        Loan loan = new Loan(
                (long)1,
                "A000001", 
                "Furniture", 
                (short)5, 
                "ACTIVE", 
                new SimpleDateFormat("yyyy-MM-dd").parse("2023-09-27"));

        Mockito.when(loanService.updateLoan(loan))
        .thenThrow(new ResourceNotFoundException("Loan does not exist"));

        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class, () -> loanController.updateLoan(loan));
        assertEquals(e.getMessage(),"Loan does not exist");
    }

    @Test
    @DisplayName("should call updateLoan on PUT to /loan and return validation exception")
    public void givenPUTloan_thenReturnValidationException() throws Exception {

        Loan loan = new Loan(
                (long)1,
                "A000001", 
                "Furniture", 
                (short)5, 
                "ACTIVE", 
                new SimpleDateFormat("yyyy-MM-dd").parse("2023-09-27"));

        Mockito.when(loanService.updateLoan(loan))
        .thenThrow(new ValidationException("Loan does not exist"));

        ValidationException e = assertThrows(ValidationException.class, () -> loanController.updateLoan(loan));
        assertEquals(e.getMessage(),"Loan does not exist");
    }    
    @Test
    @DisplayName("should call deleteLoan on DELETE to /loan/{loanID}")
    public void givenDELETEloan_thenReturnSuccess() throws Exception {
        Map<String, Object> retVal = new HashMap<>();
        retVal.put("statusCode",200);
        retVal.put("data", new Loan());
        retVal.put("message","Successful DELETE for a loan");

        Mockito.when(loanService.deleteLoan(anyLong())).thenReturn(retVal);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/loan/"+"12")
        .contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Successful DELETE for a loan"));      

        verify(loanService).deleteLoan(anyLong());
    }

    @Test
    @DisplayName("should call deleteLoan on DELETE to /loan and return Resource Not Found Exception")
    public void givenDELETEloan_thenReturnRNFException() throws Exception {

        Mockito.when(loanService.deleteLoan(anyLong()))
        .thenThrow(new ResourceNotFoundException("Loan does not exist"));

        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class, () -> loanController.deleteLoan((long)12));
        assertEquals(e.getMessage(),"Loan does not exist");
    }

    @Test
    @DisplayName("should call deleteLoan on DELETE to /loan and return Cannot Delete Record Exception")
    public void givenDELETEloan_thenReturnCDRException() throws Exception {

        Mockito.when(loanService.deleteLoan(anyLong()))
        .thenThrow(new CannotDeleteRecordException("Cannot delete unterminated loans"));

        CannotDeleteRecordException e = assertThrows(CannotDeleteRecordException.class, () -> loanController.deleteLoan((long)12));
        assertEquals(e.getMessage(),"Cannot delete unterminated loans");
    }
}
