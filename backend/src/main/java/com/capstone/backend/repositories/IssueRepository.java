package com.capstone.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.backend.entities.Issue;
import java.util.List;


@Repository
public interface IssueRepository extends JpaRepository<Issue, Long>{
    List<Issue> findByUserID(String userID);

    List<Issue> findByLoanID(long loanID);
}
