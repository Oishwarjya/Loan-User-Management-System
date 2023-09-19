package com.capstone.backend.dtos;

import java.util.Date;

import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Data
public class ApplyForLoanDTO {
    private String userID;

    private String itemCategory;

    private String itemMake;

    private String itemDescription;
}
