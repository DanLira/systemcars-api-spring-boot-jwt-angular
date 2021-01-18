package rest.controller;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import domain.entity.Cars;
import domain.repository.CarsRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CarsController {
	
	
	private CarsRepository carsRepository;
	
	
	public CarsController(CarsRepository carsRepository) {
		super();
		this.carsRepository = carsRepository;
	}


	@PostMapping("/cars")
    @ResponseStatus(HttpStatus.CREATED)
    public Cars save(@RequestBody Cars car ){
        return carsRepository.save(car);
    }
	
	
	@GetMapping("{id}")
    public Cars getCarById(@PathVariable Integer id ){
        return carsRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Carro não encontrado"));
    }


    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id ){
    	carsRepository.findById(id)
                .map( car -> {
                	carsRepository.delete(car);
                    return car;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Carro não encontrado") );

    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update( @PathVariable Integer id,
                        @RequestBody @Validated Cars car ){
    	carsRepository
                .findById(id)
                .map(carExistente -> {
                    car.setId(carExistente.getId());
                    carsRepository.save(car);
                    return carExistente;
                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Carro não encontrado") );
    }

    @GetMapping
    public List<Cars> find(Cars filtro ){
        ExampleMatcher matcher = ExampleMatcher
                                    .matching()
                                    .withIgnoreCase()
                                    .withStringMatcher(
                                            ExampleMatcher.StringMatcher.CONTAINING );

        Example example = Example.of(filtro, matcher);
        return carsRepository.findAll(example);
    }

}
