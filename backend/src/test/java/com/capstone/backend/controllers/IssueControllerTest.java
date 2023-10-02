package com.capstone.backend.controllers;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;

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

import com.capstone.backend.entities.Issue;
import com.capstone.backend.services.IssueService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@ExtendWith(MockitoExtension.class)
@DisplayName("Issue Controller")
public class IssueControllerTest {
    
    @Autowired
    @InjectMocks
    IssueController issueController;

    @Mock
    IssueService issueService;

    private MockMvc mockMvc;
    ObjectMapper objMapper = new ObjectMapper();
    ObjectWriter objWriter = objMapper.writer();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(issueController).build();    
    }

    @Test
    @DisplayName("should call getPurchaseHistory on GET to /purchaseHistory/{userID}")
    public void givenGETtoPurchaseHistory_thenReturnSuccess() throws Exception {
        Map<String, Object> retVal = new HashMap<>();
        retVal.put("statusCode",200);
        retVal.put("data", new ArrayList<Issue>());
        retVal.put("message","Successful GET for purchase history");
 
        Mockito.when(issueService.getPurchaseHistory(anyString())).thenReturn(retVal);
 
        mockMvc.perform(MockMvcRequestBuilders.get("/api/purchaseHistory/A000001").contentType(MediaType.APPLICATION_JSON))
        .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Successful GET for purchase history"));
 
        verify(issueService).getPurchaseHistory(anyString());
    }

}
