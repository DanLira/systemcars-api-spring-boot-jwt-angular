import { Cars } from './../models/cars.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { SubSink } from 'subsink/dist/subsink';
import { Usuarios } from '../models/usuarios.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  formsRegister: FormGroup;
  usuarioList: Usuarios[] = [];
  cars: Cars;
  filterFormUsuario: FormGroup;
  displayedColumns: string[] = ['name', 'email', 'phone', 'action'];
  dataSource = new MatTableDataSource<Usuarios>();
  @ViewChild('MatPaginator') MatPaginator: MatPaginator;

  private readonly subs = new SubSink();

  constructor( private readonly formBuilder: FormBuilder,
               private readonly usuarioService: UsuarioService,
               private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.MatPaginator;
    this.createForm();

    this.filterFormUsuario = this.formBuilder.group({
      nomeFilterCtrl: ['']
    });

    this.usuarioService.getAllUsuario().subscribe((usuario: Usuarios[]) => {
      this.usuarioList = (!!usuario) ? usuario : [];
      this.dataSource.data = [...this.usuarioList];

  });


  }


  private createForm(): void {
    this.formsRegister = new FormGroup({


        id: new FormControl(null),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        birthday: new FormControl('', Validators.required),
        login: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        cars: new FormControl('', Validators.required)
     });
  }


  


  salvarUsuario(): void {
    const usuario: Usuarios = {
      id: this.formsRegister.get('id').value,
      firstName: this.formsRegister.get('firstName').value,
      lastName: this.formsRegister.get('lastName').value,
      email: this.formsRegister.get('email').value,
      birthday: this.formsRegister.get('birthday').value.toLocaleDateString('pt-BR'),
      login: this.formsRegister.get('login').value,
      password: this.formsRegister.get('password').value,
      phone: this.formsRegister.get('phone').value,
      cars: this.cars

    };
    if (this.formsRegister.value.id) {

        this.usuarioService.editUsuario(usuario).subscribe(() => {
          this.usuarioService.getAllUsuario().subscribe(usuarios => {
            this.usuarioList = (!!usuarios) ? usuarios : [];
            this.dataSource.data = [...this.usuarioList];
            this.toastr.success('Usuário editado com sucesso!', 'Editar');
            this.limpar();
          });
        });
    } else {
      this.subs.sink =  this.usuarioService.saveUsuario(usuario).subscribe(() => {
          this.usuarioService.getAllUsuario().subscribe(usuarios => {
            this.usuarioList = (!!usuarios) ? usuarios : [];
            this.dataSource.data = [...this.usuarioList];
            this.toastr.success('Usuário salvo com sucesso!', 'Salvar');
            this.limpar();
          });
        });
    }
  }

  private limpar(): void {
    this.formsRegister.reset();
    this.toastr.info('Campos limpos com sucesso!');
  }


  excluirUsuario(idUser: string): void {

    this.usuarioService.deleteUsuario(idUser).subscribe(() => {
      this.usuarioService.getAllUsuario().subscribe(usuarios => {
       this.usuarioList = usuarios;
       this.dataSource.data = this.usuarioList;
       this.filterFormUsuario.reset();
       this.toastr.success('Usuário excluído com sucesso!', 'Excluir');
      });
     });
  }


  getRowTableUsuario(value: any): void {

      this.formsRegister.get('firstName').setValue(value.firsName);
      this.formsRegister.get('lastName').setValue(value.lastName);
      this.formsRegister.get('email').setValue(value.lastName);
      this.formsRegister.get('birthday').setValue(new Date (this.formatDate(value.birthday)));
      this.formsRegister.get('login').setValue(value.login);
      this.formsRegister.get('password').setValue(value.password);
      this.formsRegister.get('phone').setValue(value.phone);

  }



  filterTabelaUsuario(): void {
    let filteredTable: Usuarios[] = this.usuarioList;
    if (!this.filterFormUsuario.value.nomeFilterCtrl) {
      this.dataSource.data = [...this.usuarioList];
    }
    if (this.filterFormUsuario.value.nomeFilterCtrl) {
      filteredTable = filteredTable.filter
      ( x => {
        return x.firstName ? x.firstName.toUpperCase().includes(this.filterFormUsuario.value.nomeFilterCtrl.toUpperCase()) : null;
      });
     }
    this.dataSource.data = filteredTable;
  }


  formatDate(newDate): Date {
    const split = newDate.split('/');
    return new Date(split[1] + '/' + split[0] + '/' + split[2]);
  }

}
