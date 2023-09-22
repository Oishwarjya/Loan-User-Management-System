package com.capstone.backend.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.backend.controllers.EmployeeController;
import com.capstone.backend.entities.Employee;
import com.capstone.backend.entities.Item;
import com.capstone.backend.entities.User;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.ResourceNotFoundException;
import com.capstone.backend.repositories.EmployeeRepository;
import com.capstone.backend.repositories.ItemRepository;
import com.capstone.backend.repositories.UserRepository;
import com.capstone.backend.exceptions.RecordAlreadyExistsException;
import com.capstone.backend.exceptions.CannotDeleteRecordException;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;


    public ItemService()
    {

    }

    public Map<String,Object> getAllItems()
    {
        List<Item> itemList = itemRepository.findAll();
        Map<String, Object> object = new HashMap<>();
        if(itemList.isEmpty())
        {
              object.put("statusCode", "200");
              object.put("message", "No Items Found");
              object.put("data",itemList);
              return object;
        }
        else
        {
              object.put("statusCode", "200");
              object.put("message", "Items retrieved successfully");
              object.put("data",itemList);
              return object;
        }
    }

    public Map< String, String> addItem(Item itm)
    {
        Map<String, String> object = new HashMap<>();
        itemRepository.save(itm);
        object.put("statusCode", "200");
        object.put("message", "Item added successfully");
        return object;
    }

    public Map<String,String> updateItem(Item itm) throws ResourceNotFoundException
    {
        Map<String, String> object = new HashMap<>();
    
        Item i = itemRepository.findById(itm.getItemID()).orElse(null);
        if(i == null)
        {
              throw new ResourceNotFoundException("Item with the given ID does not exist");
          
        }
        else
        {
          
          itemRepository.save(itm);
           object.put("statusCode", "200");
          object.put("message", "Item updated successfully");
        }
        return object;
    }

    public Map<String,String> deleteItem(long id) throws ResourceNotFoundException, CannotDeleteRecordException
      {
          Map<String, String> object = new HashMap<>();
      
          Item i = itemRepository.findById(id).orElse(null);
          if(i == null)
          {
                throw new ResourceNotFoundException("Item with the given ID does not exist");
            
          }
          else
          {
            if(i.getItemAvailability().equalsIgnoreCase("UNAVAILABLE")) {
                throw new CannotDeleteRecordException("Item is already sold, so cannot be deleted. Terminate the loan to delete this item.");
            }
            itemRepository.deleteById(id);
            object.put("statusCode", "200");
            object.put("message", "Item deleted successfully");
          }
          return object;
      }
    

    
    
}