package com.capstone.backend.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.capstone.backend.entities.Item;
import com.capstone.backend.exceptions.CannotDeleteRecordException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.services.ItemService;



import jakarta.validation.Valid;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {

    @Autowired
    private ItemService itemService;
    
    @GetMapping("/items")
    @ResponseBody
    public Map<String,Object> getAllItems()
    {
        return itemService.getAllItems();
    }

    @PostMapping("/item")
    @ResponseBody
    public Map<String,Object> addItem(@RequestBody Item itm) {

        return itemService.addItem(itm);
    }

    
    @PutMapping("/item")
    @ResponseBody
    public Map<String, Object> updateItem(@Valid @RequestBody Item itm) throws ResourceNotFoundException {
        return itemService.updateItem(itm);
    }

    @DeleteMapping("/item/{id}")
    public Map<String,Object> deleteItem(@PathVariable long id) throws ResourceNotFoundException, CannotDeleteRecordException
    {
        return itemService.deleteItem(id);
    }

    @GetMapping("/itemCategories")
    public Map<String, Object> getItemCategories() {
        return itemService.getItemCategories();
    }

    @GetMapping("/itemMakes/{itemCategory}")
    public Map<String, Object> getItemMakes(@PathVariable String itemCategory) {
        return itemService.getItemMakes(itemCategory);
    }

    @GetMapping("/itemDescriptions/{itemCategory}/{itemMake}")
    public Map<String, Object> getItemDescriptions(
        @PathVariable String itemCategory, @PathVariable String itemMake
    ) {
        return itemService.getItemDescriptions(itemCategory, itemMake);
    }

}