package com.capstone.backend.entities;

import java.util.Date;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class Employee {
    @Id
    private String userID;

    @NotNull
    private String name;

    @NotNull
    private String designation;

    @NotNull
    private String department;

    @NotNull
    private String gender;

    @NotNull
    private Date dob;

    @NotNull
    private Date doj;
}
