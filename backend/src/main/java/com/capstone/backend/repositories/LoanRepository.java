package com.capstone.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.backend.entities.Loan;
import java.util.List;


@Repository
public interface LoanRepository extends JpaRepository<Loan, Long>{
    List<Loan> findAllByUserID(String userID);

    Loan findByLoanID(long loanID);
}
