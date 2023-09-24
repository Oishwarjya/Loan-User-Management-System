package com.capstone.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstone.backend.entities.Item;
import java.util.List;


@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByItemCategoryAndItemMakeAndItemDescriptionAndItemAvailability(String itemCategory, String itemMake, String itemDescription, String itemAvailability);

    List<Item> findByItemAvailability(String itemAvailability);

    @Query("SELECT DISTINCT i.itemCategory FROM Item i")
    List<String> findDistinctItemCategories();

    @Query("SELECT DISTINCT i.itemMake FROM Item i WHERE itemCategory = :itemCategory")
    List<String> findDistinctItemMakes(@Param("itemCategory") String itemCategory);

    @Query("SELECT DISTINCT i.itemDescription FROM Item i WHERE itemCategory = :itemCategory AND itemMake = :itemMake")
    List<String> findDistinctItemDescriptions(
        @Param("itemCategory") String itemCategory,
        @Param("itemMake")String itemMake);

}