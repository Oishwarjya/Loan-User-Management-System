package com.capstone.backend.entities;


import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@DynamicInsert
@NoArgsConstructor
public class Issue {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long issueID;

    @NotNull(message="Employee ID cannot be null")
    @NotBlank(message="Employee ID cannot be blank")
    private String userID;

    @NotNull(message="Loan Type cannot be null")   
    private long loanID;

    @NotNull(message="Loan Type cannot be null")   
    private long itemID;
}