package com.capstone.backend.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.entities.Item;
import com.capstone.backend.entities.Issue;
import com.capstone.backend.dtos.PurchaseHistoryDTO;

import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.exceptions.TableEmptyException;
import com.capstone.backend.repositories.ItemRepository;
import com.capstone.backend.repositories.IssueRepository;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;

@Service
public class IssueService {
    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private ItemRepository itemRepository;

    public Map<String,Object> getPurchaseHistory(String userID) throws ResourceNotFoundException {
        List<Issue> issues = issueRepository.findByUserID(userID);
        Map<String, Object> res = new HashMap<>();
        if(issues.size()==0) {
            throw new ResourceNotFoundException("Employee has no loans");
        }
        Item tempItem;
        List<PurchaseHistoryDTO> vals = new ArrayList<PurchaseHistoryDTO>();
        for(Issue i: issues) {
            tempItem = itemRepository.findById(i.getItemID()).orElse(null);
            PurchaseHistoryDTO tempPurchaseHistoryDTO = new PurchaseHistoryDTO();
            tempPurchaseHistoryDTO.setIssueID(i.getIssueID());
            tempPurchaseHistoryDTO.setItemCategory(tempItem.getItemCategory());
            tempPurchaseHistoryDTO.setItemDescription(tempItem.getItemDescription());
            tempPurchaseHistoryDTO.setItemMake(tempItem.getItemMake());
            tempPurchaseHistoryDTO.setItemValue(tempItem.getItemValue());
            vals.add(tempPurchaseHistoryDTO);
        }
        res.put("statusCode", 200);
        res.put("data",vals);
        res.put("message", "Items purchase history retrieved successfully");
        return res;
    }
}