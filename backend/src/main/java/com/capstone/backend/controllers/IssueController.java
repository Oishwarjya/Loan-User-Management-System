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

import com.capstone.backend.dtos.PurchaseHistoryDTO;
import com.capstone.backend.entities.Issue;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.exceptions.TableEmptyException;
import com.capstone.backend.services.IssueService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class IssueController {
    
    @Autowired
    private IssueService issueService;

    @GetMapping("/purchaseHistory/{userID}")
    public Map<String, Object> getPuchaseHistory(@PathVariable String userID) throws ResourceNotFoundException {
        return issueService.getPurchaseHistory(userID);
    }
}
