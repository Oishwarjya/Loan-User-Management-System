package com.capstone.backend.entities;


import org.checkerframework.checker.units.qual.t;
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

    
    public Issue(int issueID, String userID, int loanID, int itemID) {
        this.issueID = issueID;
        this.userID = userID;
        this.loanID = loanID;
        this.itemID = itemID;
    }

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long issueID;

    @NotNull(message="Employee ID cannot be null")
    @NotBlank(message="Employee ID cannot be blank")
    private String userID;

    @NotNull(message="Loan ID cannot be null")   
    private long loanID;

    @NotNull(message="Loan Type cannot be null")   
    private long itemID;

    @OneToOne
    @JoinColumn(name = "loanID",referencedColumnName = "loanID",insertable = false,updatable = false)
    private Loan loan;

    @ManyToOne
    @JoinColumn(name = "userID",referencedColumnName = "userID",insertable = false,updatable = false)
    private Employee employee;
}