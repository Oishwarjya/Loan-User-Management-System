package com.capstone.backend.services;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.Item;
import com.capstone.backend.entities.Loan;
import com.capstone.backend.entities.User;
import com.capstone.backend.dtos.ApplyForLoanDTO;

import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.exceptions.TableEmptyException;
import com.capstone.backend.repositories.ItemRepository;
import com.capstone.backend.repositories.LoanRepository;
import com.capstone.backend.repositories.UserRepository;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;

@Service
public class LoanService {
    @Autowired
    private LoanRepository loanRepository ;

    @Autowired
    private ItemRepository itemRepository ;
   
    public LoanService() {
    }

    public Map<String, Object> getLoansByUserID(String id) throws ResourceNotFoundException
    {
        Map<String, Object> res = new HashMap<>();
        
        List<Loan> l = loanRepository.findAllByUserID(id);
        if(l.size() == 0) {
            throw new ResourceNotFoundException("No loans for this user");    
        }
        else {
            res.put("statusCode", 200);
            res.put("data",l);
            res.put("message", "Loan details retrieved successfully");
          }
          return res;
    }

    public Map<String, Object> addNewLoan(ApplyForLoanDTO loanApplication) throws RecordAlreadyExistsException, ResourceNotFoundException { // ADD ITEM UNAVAILABLE ERROR
        Map<String, Object> res = new HashMap<>();
        List<Item> items = itemRepository.findByItemCategoryAndItemMakeAndItemDescriptionAndItemAvailability(
            loanApplication.getItemCategory(), 
            loanApplication.getItemMake(), 
            loanApplication.getItemDescription(),
            "AVAILABLE");
        if(items.size() == 0) {
            // THROW ITEM UNAVAILABLE EXCEPTION
            throw new ResourceNotFoundException("No items available");
        } else {
            Loan l = new Loan();
            l.setUserID(loanApplication.getUserID());
            l.setLoanType(loanApplication.getItemCategory());
            loanRepository.save(l);
            Item i = items.get(0);
            i.setItemAvailability("RESERVED");
            itemRepository.save(i);
            res.put("statusCode", 200);
            res.put("message", "Loan added successfully");
            res.put("itemValue", items.get(0).getItemValue());            
        }
        return res;
    }
}