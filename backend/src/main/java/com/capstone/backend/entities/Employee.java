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
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-DD")
    private Date dob;

    @NotNull(message = "doj can not be null")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-DD")
    private Date doj;
}
