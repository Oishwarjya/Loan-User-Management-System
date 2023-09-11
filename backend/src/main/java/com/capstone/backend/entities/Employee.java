package com.capstone.backend.entities;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
public class Employee {

    @Id
    private String userID;

    @NotNull
    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotNull
    @NotBlank(message = "Designation is mandatory")
    private String designation;

    @NotNull
    @NotBlank(message = "Department is mandatory")
    private String department;

    @NotNull
    @NotBlank(message = "gender is mandatory")
    private String gender;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date dob;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date doj;
}
