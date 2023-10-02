package com.capstone.backend.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import com.capstone.backend.dtos.PurchaseHistoryDTO;
import com.capstone.backend.entities.Issue;
import com.capstone.backend.entities.Item;
import com.capstone.backend.repositories.IssueRepository;
import com.capstone.backend.repositories.ItemRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("Issue Service")
public class IssueServiceTest {

    @Autowired
    @InjectMocks
    IssueService issueService;
    
    @Mock
    ItemRepository itemRepository;

    @Mock
    IssueRepository issueRepository;

    @Test
    @DisplayName("should get purchase history of user")
    public void givenUserID_thenReturnPurchaseHistory() {
        List<Issue> issues = new ArrayList<>();
        issues.add(new Issue(2,"A000001",1,10));
        issues.add(new Issue(3,"A000001",2,11));
        List<Item> items = new ArrayList<>();
        items.add(new Item(10,100,"Wooden","Furniture","UNAVAILABLE","bed"));
        items.add(new Item(11,100,"Wooden","Furniture","UNAVAILABLE","bed"));

        Mockito.when(issueRepository.findByUserID(anyString()))
        .thenReturn(issues);

        Mockito.when(itemRepository.findById((long)10))
        .thenReturn(Optional.of(items.get(0)));

        Mockito.when(itemRepository.findById((long)11))
        .thenReturn(Optional.of(items.get(1)));

        List<PurchaseHistoryDTO> res = (List<PurchaseHistoryDTO>) issueService.getPurchaseHistory("A000001").get("data");
        assertEquals(res.get(0).getIssueID(), (long)2);
    }

    @Test
    @DisplayName("should get empty purchase history of user")
    public void givenInvalidUserIDOrIfNoItems_thenReturnEmptyPurchaseHistory() {

        Mockito.when(issueRepository.findByUserID(anyString()))
        .thenReturn(new ArrayList<Issue>());

        List<PurchaseHistoryDTO> res = (List<PurchaseHistoryDTO>) issueService.getPurchaseHistory("A000001").get("data");
        assertEquals(res.size(), 0);
    }
}
