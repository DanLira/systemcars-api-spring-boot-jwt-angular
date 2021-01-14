import { CadastroCarrosComponent } from './cadastro-carros/cadastro-carros.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

{
    path: 'home',
    component: HomeComponent,
    //canActivate: [AuthGuard]
},

{
    path: 'login',
    component: LoginComponent
},

{
  path: 'usuario',
  component: CadastroUsuarioComponent
},

{
  path: 'cars',
  component: CadastroCarrosComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
