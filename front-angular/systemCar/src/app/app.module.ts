import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatDialogModule, MatDatepickerModule, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthService } from './core/guards/auth.service';
import { AuthGuard } from './core/guards/auth.guard';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatListModule } from '@angular/material/list';
import { CadastroCarrosComponent } from './cadastro-carros/cadastro-carros.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpInterceptorProviders } from './core/interceptors/http-interceptor-providers';

@NgModule({
  declarations: [	
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroUsuarioComponent,
      CadastroCarrosComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDatepickerModule,
    MatToolbarModule,
    ToastrModule,
    MatPaginatorModule,
    MatTableModule,
    MatExpansionModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    MatGridListModule,
    LayoutModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatListModule,
    MatNativeDateModule

  ],
  providers: [AuthGuard, AuthService, MatDatepickerModule, CookieService, HttpInterceptorProviders,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'} ],
    //exports: [NgxMaskModule],
    bootstrap: [AppComponent]
})
export class AppModule { }
