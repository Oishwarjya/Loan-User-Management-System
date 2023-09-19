package com.capstone.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.backend.entities.Item;
import java.util.List;


@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByItemCategoryAndItemMakeAndItemDescriptionAndItemAvailability(String itemCategory, String itemMake, String itemDescription, String itemAvailability);

}