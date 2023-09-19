package com.capstone.backend.dtos;

import lombok.Data;

@Data
public class PurchaseHistoryDTO {
    private long issueID;

    private String itemCategory;
    private String itemMake;
    private String itemDescription;
    private int itemValue;

}
