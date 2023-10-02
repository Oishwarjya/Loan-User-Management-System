package com.capstone.backend.exceptions;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
//import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler  {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	
	public Map<String,Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex)
	{
		Map<String,String> errorsMap = new HashMap<>();
		Map<String,Object> response =  new HashMap<>();
		ex.getBindingResult().getFieldErrors().forEach(error ->{
			errorsMap.put(error.getField(),error.getDefaultMessage().toString());
		
		});
		String message = errorsMap.values().iterator().next();
		response.put("statusCode","400");
		response.put("message",message);
		return response ;
	}
	
	@ExceptionHandler(value = TableEmptyException.class)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody ErrorResponse handleTableEmptyException(TableEmptyException ex) {
		return new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
	}

	@ExceptionHandler(value = RecordAlreadyExistsException.class)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody ErrorResponse handleRecordAlreadyExistsException(RecordAlreadyExistsException ex) {
		return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
	}

	@ExceptionHandler(value = ResourceNotFoundException.class)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody ErrorResponse handleResourceNotFoundException(ResourceNotFoundException ex) {
		return new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
	}

	@ExceptionHandler(value = CannotDeleteRecordException.class)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody ErrorResponse handleCannotDeleteRecordException(CannotDeleteRecordException ex) {
		return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
	}
	
	@ExceptionHandler(value = ValidationException.class)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody ErrorResponse handleValidationException(ValidationException ex) {
		return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
	}

}