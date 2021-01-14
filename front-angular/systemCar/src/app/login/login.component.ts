import { Usuarios } from './../models/usuarios.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/guards/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../cadastro-usuario/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  usuariosList: Usuarios[];
  userInfo: Usuarios[];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private readonly toastr: ToastrService,
    private readonly usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/home';
    this.authService.logout();
    this.usuarioService.getAllUsuario()
    .subscribe((usuarios: Usuarios[]) => {
      this.usuariosList = (!!usuarios) ? usuarios : [];
  });
  }

  get f() { return this.loginForm.controls; }

 private fazerLogin() {

  const formData = new FormData();
    formData.append('username', this.f.username.value);
    formData.append('password', this.f.password.value);
    const url = environment.BASE_URL + '/signin';

    this.authService.login(url, formData).subscribe(
      (response) =>
      {
        if (response.token && this.authService.isUserLoggedIn())
        {
          this.router.navigate(['/home']);
        }
        else
        {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
      });
 }  
    










}
