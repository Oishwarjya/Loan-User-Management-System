package com.capstone.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.backend.entities.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, String> {


}
