package com.capstone.backend.entities;


import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
@Table(name = "user")
@Getter
@Setter


public class User {

    @Id
    private String userID;
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    // @OnDelete(action = OnDeleteAction.CASCADE)
	// @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true)
	// @JoinColumn(name = "userID")
	// private List<Issue> issues;

	// @OnDelete(action = OnDeleteAction.CASCADE)
	// @OneToMany(cascade = CascadeType.REMOVE, orphanRemoval = true)
	// @JoinColumn(name = "userID")
	// private List<Loan> loans;

    // @OnDelete(action = OnDeleteAction.CASCADE)
	// @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	// @JoinColumn(name = "userID")
	// private Employee employee;

	@OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
	private Employee employee;

}
