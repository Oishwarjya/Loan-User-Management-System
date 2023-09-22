package com.capstone.backend.exceptions;

public class CannotDeleteRecordException extends Exception {
    private static final long serialVersionUID = 1L;
	private String message;

	public CannotDeleteRecordException(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
