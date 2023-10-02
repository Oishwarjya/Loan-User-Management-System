package com.capstone.backend.entities;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonFormat;

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
    
    public Loan(long loanId, String userID, String loanType, short loanDuration, String loanStatus, Date issueDate) {
        this.loanID = loanId;
        this.userID = userID;   
        this.loanType = loanType;
        this.loanDuration = loanDuration;
        this.loanStatus = loanStatus;
        this.issueDate = issueDate;
       
    }

    @ManyToOne
    @JoinColumn(name = "userID",referencedColumnName = "userID",insertable = false,updatable = false)
    private Employee employee;

    @OneToOne(mappedBy = "loan",cascade = CascadeType.ALL)
	private Issue issue;
}
