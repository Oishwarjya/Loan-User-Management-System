package com.capstone.backend.services;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import com.capstone.backend.dtos.ApplyForLoanDTO;
import com.capstone.backend.entities.Issue;
import com.capstone.backend.entities.Item;
import com.capstone.backend.entities.Loan;
import com.capstone.backend.exceptions.CannotDeleteRecordException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.repositories.IssueRepository;
import com.capstone.backend.repositories.ItemRepository;
import com.capstone.backend.repositories.LoanRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("Loan Service")
public class LoanServiceTest {
    
    @Autowired
    @InjectMocks
    LoanService loanService;

    @Mock
    LoanRepository loanRepository;
    
    @Mock
    ItemRepository itemRepository;

    @Mock
    IssueRepository issueRepository;

    @Test
    @DisplayName("should return employee's loans given userID")
    public void givenID_whenGET_thenReturnAllLoansForID() throws ParseException {
        List<Loan> loans = new ArrayList<>();
        loans.add(new Loan((long)3,"A000001","Furniture",(short)2,"ACTIVE",new SimpleDateFormat("yyyy-MM-dd").parse("2023-09-27")));
        loans.add(new Loan((long)4,"A000001","Electronics",(short)2,"PENDING",new SimpleDateFormat("yyyy-MM-dd").parse("2023-09-27")));
        Mockito.when(loanRepository.findAllByUserID("A000001")).thenReturn(loans);
        assertIterableEquals((List<Loan>)loanService.getLoansByUserID("A000001").get("data"), loans,"Not matching");
    }

    @Test
    @DisplayName("should return employee's loans given userID")
    public void whenGETAllLoans_thenReturnAllLoans() throws ParseException {
        List<Loan> loans = new ArrayList<>();
        loans.add(new Loan((long)3,"A000001",null, (short)2,"ACTIVE",new SimpleDateFormat("yyyy-MM-dd").parse("2023-09-27")));
        loans.add(new Loan((long)4,"A000002","Electronics",(short)2,"PENDING",new SimpleDateFormat("yyyy-MM-dd").parse("2023-09-27")));
        Mockito.when(loanRepository.findAll()).thenReturn(loans);
        assertIterableEquals((List<Loan>)loanService.getAllLoans().get("data"), loans,"Not matching");
    }

    @Nested
    @DisplayName("on applying for loan")
    public class ApplyForLoansTest {

        @Test
        @DisplayName("should return success on successful application of loan")
        public void givenApplication_whenApplyAndItemAvailable_thenReturnSuccess() {
            ApplyForLoanDTO dummyApplication = new ApplyForLoanDTO(
                "A000001",
                "Furniture", 
                "Wooden", 
                "Bed"
            );
            List<Item> items = new ArrayList<>();
            Item dummyItem = new Item(
                (long)3,
                100,
                "Wooden",
                "Furniture",
                "AVAILABLE",
                "Bed");
            items.add(dummyItem); 
            Mockito.when(itemRepository.findByItemCategoryAndItemMakeAndItemDescriptionAndItemAvailability(
                dummyApplication.getItemCategory(), 
                dummyApplication.getItemMake(), 
                dummyApplication.getItemDescription(), 
                "AVAILABLE"))
            .thenReturn(items);
            Mockito.when(loanRepository.save(any()))
            .thenReturn(new Loan(
                (long)1,
                "A000001", 
                "Furniture", 
                (short)0, 
                "PENDING", 
                (Date)null));
            dummyItem.setItemAvailability("RESERVED FOR 1");
            Mockito.when(itemRepository.save(any()))
            .thenReturn(dummyItem);
            try {
                assertEquals((Item)loanService.addNewLoan(dummyApplication).get("data"), dummyItem);
            } catch (ResourceNotFoundException e) {
                fail("Service threw ResourceNotFoundException");
            }
        }

        @Test
        @DisplayName("should return failure if no items are available")
        public void givenApplication_whenApplyAndItemUnavailable_thenReturnFailure() {
            ApplyForLoanDTO dummyApplication = new ApplyForLoanDTO(
                "A000001",
                "Furniture", 
                "Wooden", 
                "Bed"
            );
            List<Item> items = new ArrayList<>();
            Mockito.when(itemRepository.findByItemCategoryAndItemMakeAndItemDescriptionAndItemAvailability(
                dummyApplication.getItemCategory(), 
                dummyApplication.getItemMake(), 
                dummyApplication.getItemDescription(), 
                "AVAILABLE"))
            .thenReturn(items);
            ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class, () -> loanService.addNewLoan(dummyApplication));
            assertEquals(e.getMessage(),"No items available");
        }

    }

    @Nested
    @DisplayName("on attempting to update a loan")
    public class UpdateLoanTest {

        Loan newLoan, existingLoan;
        Item item;
        List<Item> items = new ArrayList<>();
        Issue issue;
        List<Issue> issues = new ArrayList<>();

        @BeforeEach
        public void initVariablesForMocking() throws ParseException {
            newLoan = new Loan(
                (long)1,
                "A000001", 
                "Furniture", 
                (short)5, 
                "ACTIVE", 
                new SimpleDateFormat("yyyy-MM-dd").parse("2023-09-27"));
            existingLoan = new Loan(
                (long)1,
                "A000001", 
                "Furniture", 
                (short)0, 
                "PENDING", 
                (Date) null);
            item = new Item(12, 1000, "Wooden", "Furniture","UNAVAILABLE","Bed");
            items.add(item);
            issue = new Issue(10,"A000001",1,12);
            issues.add(issue);
        }

        @Test
        @DisplayName("should update loan to active from pending and update item to UNAVAILABLE if loan exists")
        public void givenLoan_whenApproveFromPending_thenUpdateSuccessfully() {
            Mockito.when(loanRepository.findById((long)1))
            .thenReturn(Optional.of(existingLoan));

            item.setItemAvailability("RESERVED FOR 1");
            items = new ArrayList<>();
            items.add(item);
            Mockito.when(itemRepository.findByItemAvailability(anyString()))
            .thenReturn(items);

            item.setItemAvailability("UNAVAILABLE");
            Mockito.when(itemRepository.save(any()))
            .thenReturn(item);

            Mockito.when(issueRepository.save(any()))
            .thenReturn(issue);

            Mockito.when(loanRepository.save(any()))
            .thenReturn(newLoan);

            try {
                assertEquals(loanService.updateLoan(newLoan).get("data"), newLoan);
                Mockito.verify(itemRepository).save(item);
            } catch (ResourceNotFoundException e) {
                fail("Service threw ResourceNotFoundException");            
            }
        }

        @Test
        @DisplayName("should terminate loan when attempting to approve loan but item is not available")
        public void givenLoan_whenApproveFromPendingButNoItem_thenThrowException() {
            Mockito.when(loanRepository.findById((long)1))
            .thenReturn(Optional.of(existingLoan));

            items = new ArrayList<>();
            Mockito.when(itemRepository.findByItemAvailability(anyString()))
            .thenReturn(items);

            Mockito.when(loanRepository.save(any()))
            .thenReturn(newLoan);
            
            ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class, () -> loanService.updateLoan(newLoan));
            assertEquals(e.getMessage(),"Item not reserved and does not exist, please re-apply for the loan");
        }

        @Test
        @DisplayName("should terminate a pending loan and update item")
        public void givenLoan_whenTerminateFromPending_thenUpdateItem() {
            newLoan.setLoanStatus("TERMINATED");


            Mockito.when(loanRepository.findById((long)1))
            .thenReturn(Optional.of(existingLoan));

            items.get(0).setItemAvailability("RESERVED FOR 1");
            Mockito.when(itemRepository.findByItemAvailability(anyString()))
            .thenReturn(items);

            Mockito.when(loanRepository.save(any()))
            .thenReturn(newLoan);
            
            item.setItemAvailability("AVAILABLE");
            Mockito.when(itemRepository.save(any()))
            .thenReturn(item);

            try {
                assertEquals(loanService.updateLoan(newLoan).get("data"), newLoan);
                Mockito.verify(itemRepository).save(item);
            } catch (ResourceNotFoundException e) {
                fail("Service threw ResourceNotFoundException");            
            }

        }

        @Test
        @DisplayName("should terminate an active loan and update item and issue")
        public void givenLoan_whenTerminateFromActive_thenUpdateItemAndIssue() {
            newLoan.setLoanStatus("TERMINATED");
            existingLoan.setLoanStatus("ACTIVE");

            Mockito.when(loanRepository.findById((long)1))
            .thenReturn(Optional.of(existingLoan));

            Mockito.when(issueRepository.findByLoanID(anyLong()))
            .thenReturn(issues);

            item.setItemAvailability("UNAVAILABLE");
            Mockito.when(itemRepository.findById(anyLong()))
            .thenReturn(Optional.of(item));

            Mockito.when(loanRepository.save(any()))
            .thenReturn(newLoan);
            
            doNothing().when(issueRepository).deleteById(anyLong());

            item.setItemAvailability("AVAILABLE");
            Mockito.when(itemRepository.save(any()))
            .thenReturn(item);

            try {
                assertEquals(loanService.updateLoan(newLoan).get("data"), newLoan);
                Mockito.verify(itemRepository).save(item);
                Mockito.verify(issueRepository).deleteById(issue.getIssueID());
            } catch (ResourceNotFoundException e) {
                fail("Service threw ResourceNotFoundException");            
            }
        }

        @Test
        @DisplayName("should throw exception if loan does not exist")
        public void givenLoan_whenUpdateNonExistentLoan_thenThrowException() {
            Mockito.when(loanRepository.findById(anyLong()))
            .thenReturn(Optional.empty());
            
            ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class, () -> loanService.updateLoan(newLoan));
            assertEquals(e.getMessage(),"Loan does not exist");

        }

    }

    @Nested
    @DisplayName("on attempting to delete a loan")
    public class DeleteLoanTest {
        Loan loan;

        @BeforeEach
        void initMock() {
            loan = new Loan((long) 1, "A000001", "Furniture", (short)5, "TERMINATED", (Date)null);
        }

        @Test
        @DisplayName("should delete loan successfully")
        public void givenTerminatedLoanID_thenDeleteSuccessfully() {
            Mockito.when(loanRepository.findById(anyLong()))
            .thenReturn(Optional.of(loan));

            try {
                assertEquals(loanService.deleteLoan(loan.getLoanID()).get("data"), loan);
            } catch (ResourceNotFoundException | CannotDeleteRecordException e) {
                fail("Service threw Exception");
            }
        }

        @Test
        @DisplayName("should throw exception when loan is not terminated")
        public void givenUnterminatedLoanID_thenThrowException() {
            loan.setLoanStatus("ACTIVE");
            Mockito.when(loanRepository.findById(anyLong()))
            .thenReturn(Optional.of(loan));

            CannotDeleteRecordException e = assertThrows(CannotDeleteRecordException.class, () -> loanService.deleteLoan(loan.getLoanID()));
            assertEquals(e.getMessage(),"Cannot delete a loan that is not terminated first");

        }

        @Test
        @DisplayName("should throw exception when loan does not exist")
        public void givenInvalidLoanID_thenThrowException() {
            Mockito.when(loanRepository.findById(anyLong()))
            .thenReturn(Optional.empty());

            ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class, () -> loanService.deleteLoan(loan.getLoanID()));
            assertEquals(e.getMessage(),"Loan does not exist");

        }
    }
}
