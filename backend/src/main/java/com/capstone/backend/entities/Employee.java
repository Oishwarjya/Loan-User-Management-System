package com.capstone.backend.entities;

import java.util.Date;
import java.util.List;


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
@NoArgsConstructor
@Entity
public class Employee {


    @Id
    private String userID;

    @NotNull(message = "Name can not be null")
    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotNull(message = "Designation can not be null")
    @NotBlank(message = "Designation is mandatory")
    private String designation;

    @NotNull(message = "Department can not be null")
    @NotBlank(message = "Department is mandatory")
    private String department;

    @NotNull(message = "Gender can not be null")
    @NotBlank(message = "gender is mandatory")
    private String gender;

    @NotNull(message = "dob can not be null")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dob;

    @NotNull(message = "doj can not be null")
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date doj;

    
	@OneToMany(mappedBy = "employee",cascade = CascadeType.ALL)
	private List<Issue> issues;

	@OneToMany(mappedBy = "employee",cascade = CascadeType.ALL)
	private List<Loan> loans; 

}
