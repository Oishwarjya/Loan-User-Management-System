package com.capstone.backend.entities;

import org.hibernate.annotations.DynamicInsert;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;


@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
@DynamicInsert

public class Item {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long itemID;
   
    @NotNull
    private int itemValue;

    @NotNull
    @NotBlank(message = "Item make is mandatory")
    private String itemMake;

    @NotNull
    @NotBlank(message = "Item Category is mandatory")
    private String itemCategory;

    @Column(name="itemAvailability", columnDefinition = "varchar(30) default 'AVAILABLE'")
    private String itemAvailability;

    @NotNull
    @NotBlank(message = "Description of item is mandatory")
    private String itemDescription;

}
