package com.capstone.backend.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.backend.services.IssueService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class IssueController {
    
    @Autowired
    private IssueService issueService;

    @GetMapping("/purchaseHistory/{userID}")
    public Map<String, Object> getPuchaseHistory(@PathVariable String userID) {
        return issueService.getPurchaseHistory(userID);
    }
}
