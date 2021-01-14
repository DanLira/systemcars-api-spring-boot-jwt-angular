package domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import domain.entity.Cars;

public interface CarsRepository extends JpaRepository<Cars, Integer> {

}
