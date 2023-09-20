package com.capstone.backend.exceptions;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

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
		String field = errorsMap.keySet().iterator().next();
		String message = errorsMap.values().iterator().next();
		String errorMessage = field + " "+ message;
		response.put("statusCode","400");
		response.put("message",message);
		return response ;
	}
	
	@ExceptionHandler(value = TableEmptyException.class)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody ErrorResponse handleTableEmptyException(TableEmptyException ex) {
		System.out.println(ex.getMessage());
		return new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
	}

	@ExceptionHandler(value = RecordAlreadyExistsException.class)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody ErrorResponse handleRecordAlreadyExistsException(RecordAlreadyExistsException ex) {
		System.out.println(ex.getMessage());
		System.out.println(ex);
		return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
	}

	@ExceptionHandler(value = ResourceNotFoundException.class)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody ErrorResponse handleResourceNotFoundException(ResourceNotFoundException ex) {
		System.out.println(ex.getMessage());
		return new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage());
	}

	@ExceptionHandler(value = CannotDeleteUnterminatedLoanException.class)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody ErrorResponse handleCannotDeleteUnterminatedLoanException(CannotDeleteUnterminatedLoanException ex) {
		System.out.println(ex.getMessage());
		return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
	}
	

}