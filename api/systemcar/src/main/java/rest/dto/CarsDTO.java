package rest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CarsDTO {
	
	
	private int year;
	
	private String licensePlate;
	
	private String model;
	
	private String color;

}
