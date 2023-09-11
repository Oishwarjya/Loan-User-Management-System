package com.capstone.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.backend.entities.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {


}
