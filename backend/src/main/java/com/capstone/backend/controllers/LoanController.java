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

import com.capstone.backend.dtos.ApplyForLoanDTO;
import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.Loan;
import com.capstone.backend.entities.User;
import com.capstone.backend.exceptions.CannotDeleteRecordException;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.exceptions.TableEmptyException;
import com.capstone.backend.services.LoanService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {
    
    @Autowired
    private LoanService loanService;

    @GetMapping("/loans")
    public Map<String, Object> getAllLoans() {
        return loanService.getAllLoans();
    }

    @GetMapping("/loans/{userID}")
    public Map<String, Object> getLoansByUserID(@PathVariable String userID) {
        return loanService.getLoansByUserID(userID);
    }

    @PostMapping("/loan")
    public Map<String, Object> addNewLoan(@RequestBody ApplyForLoanDTO loan) throws ResourceNotFoundException {
        return loanService.addNewLoan(loan);
    }

    @PutMapping("/loan")
    public Map<String, Object> updateLoan(@Valid @RequestBody Loan loan) throws ResourceNotFoundException {
        return loanService.updateLoan(loan);
    }

    @DeleteMapping("/loan/{loanID}")
    public Map<String, Object> deleteLoan(@PathVariable long loanID) throws ResourceNotFoundException, CannotDeleteRecordException {
        return loanService.deleteLoan(loanID);
    }
}
