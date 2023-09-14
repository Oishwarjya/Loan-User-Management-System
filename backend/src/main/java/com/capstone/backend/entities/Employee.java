package com.capstone.backend.entities;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "employee")
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
    //@JsonFormat(pattern = "yyyy-MM-DD")
    private Date dob;

    @NotNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    //@JsonFormat(pattern = "yyyy-MM-DD")
    private Date doj;
}
