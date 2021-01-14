/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarsServiceService } from './carsService.service';

describe('Service: CarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarsServiceService]
    });
  });

  it('should ...', inject([CarsServiceService], (service: CarsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
