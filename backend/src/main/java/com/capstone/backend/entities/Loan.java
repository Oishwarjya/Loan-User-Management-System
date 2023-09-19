package com.capstone.backend.entities;

import java.util.Date;

import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity
@DynamicInsert
@NoArgsConstructor
public class Loan {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long loanID;

    @NotNull(message="Employee ID cannot be null")
    @NotBlank(message="Employee ID cannot be blank")
    private String userID;

    @NotNull(message="Loan Type cannot be null")
    @NotBlank(message="Loan Type cannot be blank")
    private String loanType;

    private short loanDuration;

    @Column(name="loanStatus", columnDefinition = "varchar(15) default 'PENDING'")
    private String loanStatus;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date issueDate;
}
