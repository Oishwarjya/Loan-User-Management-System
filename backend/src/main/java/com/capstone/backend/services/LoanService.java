package com.capstone.backend.services;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.Issue;
import com.capstone.backend.entities.Item;
import com.capstone.backend.entities.Loan;
import com.capstone.backend.entities.User;
import com.capstone.backend.dtos.ApplyForLoanDTO;
import com.capstone.backend.exceptions.CannotDeleteRecordException;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.exceptions.TableEmptyException;
import com.capstone.backend.repositories.IssueRepository;
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

    @Autowired
    private IssueRepository issueRepository;
   
    public LoanService() {
    }

    public Map<String, Object> getLoansByUserID(String id) throws ResourceNotFoundException
    {
        Map<String, Object> res = new HashMap<>();
        
        List<Loan> l = loanRepository.findAllByUserID(id);
        if(l.size() == 0) {
          res.put("statusCode", 200);
          res.put("data",l);
          res.put("message", "No loans in the system for the user");
      }
        else {
            res.put("statusCode", 200);
            res.put("data",l);
            res.put("message", "Loan details retrieved successfully");
          }
          return res;
    }

    public Map<String, Object> addNewLoan(ApplyForLoanDTO loanApplication) throws RecordAlreadyExistsException, ResourceNotFoundException { 
        Map<String, Object> res = new HashMap<>();
        List<Item> items = itemRepository.findByItemCategoryAndItemMakeAndItemDescriptionAndItemAvailability(
            loanApplication.getItemCategory(), 
            loanApplication.getItemMake(), 
            loanApplication.getItemDescription(),
            "AVAILABLE");
        if(items.size() == 0) {
            throw new ResourceNotFoundException("No items available");
        } else {
            Loan l = new Loan();
            l.setUserID(loanApplication.getUserID());
            l.setLoanType(loanApplication.getItemCategory());
            l = loanRepository.save(l);
            Item i = items.get(0);
            i.setItemAvailability("RESERVED FOR "+l.getLoanID());
            itemRepository.save(i);
            res.put("statusCode", 200);
            res.put("message", "Loan added successfully");
            res.put("itemValue", items.get(0).getItemValue());            
        }
        return res;
    }

    public Map<String, Object> getAllLoans() throws TableEmptyException
    {
        Map<String, Object> res = new HashMap<>();
        
        List<Loan> l = loanRepository.findAll();
        if(l.size() == 0) {
          res.put("statusCode", 200);
          res.put("data",l);
          res.put("message", "No loans in the system");
      }
        else {
            res.put("statusCode", 200);
            res.put("data",l);
            res.put("message", "Loan details retrieved successfully");
          }
          return res;
    }

    public Map<String, Object> updateLoan(Loan loan) throws ResourceNotFoundException
    {
        Map<String, Object> res = new HashMap<>();
    
        Loan l = loanRepository.findById(loan.getLoanID()).orElse(null);
        if(l == null)
        {
              throw new ResourceNotFoundException("Loan does not exist");
        }
        else
        {
          long id = loan.getLoanID();
          if(loan.getLoanStatus().equalsIgnoreCase("TERMINATED")) {
            if(l.getLoanStatus().equalsIgnoreCase("ACTIVE")) {
              List<Issue> issue = issueRepository.findByLoanID(id);
              if(issue.size()!=0) {
                Item i = itemRepository.findById(issue.get(0).getItemID()).orElse(null);
                if(i != null) {
                    i.setItemAvailability("AVAILABLE");
                    itemRepository.save(i);
                }
              }
            } else if(l.getLoanStatus().equalsIgnoreCase("PENDING")) {
              List<Item> items = itemRepository.findByItemAvailability("RESERVED FOR "+id);
              if(items.size()>0) {
                  Item i = items.get(0);
                  i.setItemAvailability("AVAILABLE");
                  itemRepository.save(i);
              }
            }
          }
          if(l.getLoanStatus().equalsIgnoreCase("PENDING") && loan.getLoanStatus().equalsIgnoreCase("ACTIVE")) {
            List<Item> items = itemRepository.findByItemAvailability("RESERVED FOR "+l.getLoanID());
            if(items.size() == 0) {
              l.setLoanStatus("TERMINATED");
              loanRepository.save(l);
              throw new ResourceNotFoundException("Item not reserved and does not exist, please re-apply for the loan");
            }
            Item i = items.get(0);
            i.setItemAvailability("UNAVAILABLE");
            itemRepository.save(i);
            Issue issue = new Issue();
            issue.setItemID(i.getItemID());
            issue.setLoanID(l.getLoanID());
            issue.setUserID(l.getUserID());
            issueRepository.save(issue);
          }
          loanRepository.save(loan);
          res.put("statusCode", "200");
          res.put("message", "Loan details updated successfully");
        }
        return res;
    }

    public Map<String, Object> deleteLoan(long id) throws ResourceNotFoundException, CannotDeleteRecordException
    {
        Map<String, Object> res = new HashMap<>();
    
        Loan l = loanRepository.findById(id).orElse(null);
        if(l == null)
        {
            throw new ResourceNotFoundException("Loan does not exist");
        } else if(!l.getLoanStatus().equalsIgnoreCase("TERMINATED")) {
            throw new CannotDeleteRecordException("Cannot delete a loan that is not terminated first");
        } else {
          loanRepository.deleteById(id);
          res.put("statusCode", "200");
          res.put("message", "Loan deleted successfully");
        }
        return res;
    }
}