package com.capstone.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApplyForLoanDTO {
    private String userID;

    private String itemCategory;

    private String itemMake;

    private String itemDescription;
}
