import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SubSink } from 'subsink';
import { Cars } from '../models/cars.model';
import { CarsService } from './carsService.service';

@Component({
  selector: 'app-cadastro-carros',
  templateUrl: './cadastro-carros.component.html',
  styleUrls: ['./cadastro-carros.component.scss']
})
export class CadastroCarrosComponent implements OnInit {

  formsRegister: FormGroup;
  carsList: Cars[] = [];
  cars: Cars;
  filterFormCarro: FormGroup;
  displayedColumns: string[] = ['model', 'year', 'licensePlate', 'action'];
  dataSource = new MatTableDataSource<Cars>();
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  private readonly subs = new SubSink();

  constructor( private readonly formBuilder: FormBuilder,
               private readonly carsService: CarsService,
               private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.createForm();

    this.filterFormCarro = this.formBuilder.group({
      nomeFilterCtrl: ['']
    });

    this.carsService.getAllCar().subscribe((car: Cars[]) => {
      this.carsList = (!!car) ? car : [];
      this.dataSource.data = [...this.carsList];

  });


  }


  private createForm(): void {
    this.formsRegister = new FormGroup({

        id: new FormControl(null),
        year: new FormControl('', Validators.required),
        licensePlate: new FormControl('', Validators.required),
        model: new FormControl('', Validators.required),
        color: new FormControl('', Validators.required),
     });
  }

  salvarCarro(): void {
    const car: Cars = {
      id: this.formsRegister.get('id').value,
      year: this.formsRegister.get('year').value,
      licensePlate: this.formsRegister.get('licensePlate').value,
      model: this.formsRegister.get('model').value,
      color: this.formsRegister.get('color').value

    };
    if (this.formsRegister.value.id) {

        this.carsService.editCar(car).subscribe(() => {
          this.carsService.getAllCar().subscribe(cars => {
            this.carsList = (!!cars) ? cars : [];
            this.dataSource.data = [...this.carsList];
            this.toastr.success('Carro editado com sucesso!', 'Editar');
            this.limpar();
          });
        });
    } else {
      this.subs.sink =  this.carsService.saveCar(car).subscribe(() => {
          this.carsService.getAllCar().subscribe(cars => {
            this.carsList = (!!cars) ? cars : [];
            this.dataSource.data = [...this.carsList];
            this.toastr.success('Carro salvo com sucesso!', 'Salvar');
            this.limpar();
          });
        });
    }
  }

  private limpar(): void {
    this.formsRegister.reset();
    this.toastr.info('Campos limpos com sucesso!');
  }


  excluirCarro(idCar: string): void {

    this.carsService.deleteCar(idCar).subscribe(() => {
      this.carsService.getAllCar().subscribe(cars => {
       this.carsList = cars;
       this.dataSource.data = this.carsList;
       this.filterFormCarro.reset();
       this.toastr.success('Carro excluído com sucesso!', 'Excluir');
      });
     });
  }


  getRowTableC(value: any): void {

      this.formsRegister.get('year').setValue(value.year);
      this.formsRegister.get('licensePlate').setValue(value.licensePlate);
      this.formsRegister.get('model').setValue(value.model);
      this.formsRegister.get('color').setValue(value.color);

  }



  filterTabelaCarro(): void {
    let filteredTable: Cars[] = this.carsList;
    if (!this.filterFormCarro.value.nomeFilterCtrl) {
      this.dataSource.data = [...this.carsList];
    }
    if (this.filterFormCarro.value.nomeFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x => {
        return x.model ? x.model.toUpperCase().includes(this.filterFormCarro.value.nomeFilterCtrl.toUpperCase()) : null;
      });
     }
    this.dataSource.data = filteredTable;
  }

}
