package com.capstone.backend.entities;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@RequiredArgsConstructor
@Entity
@Getter
@Setter


public class Item {

    @Id
    private String itemID;
   
    @NotNull
    @NotBlank(message = "Item value is mandatory")
    private int itemValue;

    @NotNull
    @NotBlank(message = "Item make is mandatory")
    private String itemMake;

    @NotNull
    @NotBlank(message = "Item Category is mandatory")
    private String itemCategory;

    @NotNull
    @NotBlank(message = "Status of Item is mandatory")
    private String itemAvailability;

    @NotNull
    @NotBlank(message = "Description of item is mandatory")
    private String itemDescription;
}

