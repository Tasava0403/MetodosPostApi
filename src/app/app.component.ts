import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CrudCrudPostsService,
  CreateProduct, ProductResponse,
  CreateUser, UserResponse,
  CreateCart, CartResponse,
  CreateLogin, LoginResponse
} from './crudcrud-posts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private postsApi: CrudCrudPostsService) { }

  /* ══════════════════════════════════════════════════
     PRIMER POST — Producto (ngModel)
  ══════════════════════════════════════════════════ */
  productUrl = 'https://fakestoreapi.com/products';

  form: CreateProduct = { title: '', price: 0, description: '', category: '', image: '' };

  createdPost: ProductResponse | null = null;
  loading = false;
  errorMessage = '';

  ProductPost(): void {
    this.errorMessage = '';
    this.createdPost = null;

    if (!this.form.title.trim() || this.form.price <= 0 ||
      !this.form.description.trim() || !this.form.category.trim()) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.loading = true;
    this.postsApi.createProduct(this.productUrl, this.form).subscribe({
      next: res => { this.createdPost = res; this.loading = false; },
      error: err => { this.errorMessage = `Error ${err.status}`; this.loading = false; }
    });
  }

  /* ══════════════════════════════════════════════════
     SEGUNDO POST — Usuario completo (ngModel)
     Campos: identidad, acceso, contacto, dirección
  ══════════════════════════════════════════════════ */
  userUrl = 'https://fakestoreapi.com/users';

  form2: CreateUser = {
    email: '', username: '', password: '',
    firstname: '', lastname: '', phone: '',
    city: '', street: '', number: 0, zipcode: ''
  };

  createdPostUser: UserResponse | null = null;
  loadingUser = false;
  errorMessageUser = '';

  UserPost(): void {
    this.errorMessageUser = '';
    this.createdPostUser = null;

    const f = this.form2;
    if (!f.email.trim() || !f.username.trim() || !f.password.trim() ||
      !f.firstname.trim() || !f.lastname.trim() || !f.phone.trim() ||
      !f.city.trim() || !f.street.trim() || f.number <= 0 || !f.zipcode.trim()) {
      this.errorMessageUser = 'Todos los campos son obligatorios.';
      return;
    }

    this.loadingUser = true;
    this.postsApi.createUser(this.userUrl, this.form2).subscribe({
      next: res => { this.createdPostUser = res; this.loadingUser = false; },
      error: err => { this.errorMessageUser = `Error ${err.status}`; this.loadingUser = false; }
    });
  }

  /* ══════════════════════════════════════════════════
     TERCER POST — Carrito (ngModel)
  ══════════════════════════════════════════════════ */
  cartUrl = 'https://fakestoreapi.com/carts';

  form3: CreateCart = {
    userId: 0,
    date: '',
    products: [{ productId: 0, quantity: 0 }]
  };

  cartPostUser: CartResponse | null = null;
  loadingCart = false;
  errorMessageCart = '';

  CartPost(): void {
    this.errorMessageCart = '';
    this.cartPostUser = null;

    if (this.form3.userId <= 0 || !this.form3.date.trim() ||
      this.form3.products[0].productId <= 0 || this.form3.products[0].quantity <= 0) {
      this.errorMessageCart = 'Todos los campos son obligatorios.';
      return;
    }

    this.loadingCart = true;
    this.postsApi.createCart(this.cartUrl, this.form3).subscribe({
      next: res => { this.cartPostUser = res; this.loadingCart = false; },
      error: err => { this.errorMessageCart = `Error ${err.status}`; this.loadingCart = false; }
    });
  }

  /* ══════════════════════════════════════════════════
     CUARTO POST — Login (ngModel)
  ══════════════════════════════════════════════════ */
  loginUrl = 'https://fakestoreapi.com/auth/login';

  form4: CreateLogin = {
    username: '',
    password: ''
  };

  loginPostResponse: LoginResponse | null = null;
  loadingLogin = false;
  errorMessageLogin = '';

  LoginPost(): void {
    this.errorMessageLogin = '';
    this.loginPostResponse = null;

    if (!this.form4.username.trim() || !this.form4.password.trim()) {
      this.errorMessageLogin = 'Usuario y contraseña son obligatorios.';
      return;
    }

    // Truco: Si el usuario coincide con el que acabamos de "crear" en el Paso 2,
    // simulamos el login exitoso (ya que FakeStore no guarda el dato real).
    const usernameCreado = this.form2.username.trim().toLowerCase();
    const passwordCreado = this.form2.password.trim();
    const usernameIntento = this.form4.username.trim().toLowerCase();
    const passwordIntento = this.form4.password.trim();

    if (
      usernameCreado !== '' &&
      usernameIntento === usernameCreado &&
      passwordIntento === passwordCreado
    ) {
      this.loadingLogin = true;
      setTimeout(() => {
        this.loginPostResponse = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake-token-local' };
        this.loadingLogin = false;
      }, 600);
      return;
    }

    this.loadingLogin = true;
    this.postsApi.loginUser(this.loginUrl, this.form4).subscribe({
      next: res => { this.loginPostResponse = res; this.loadingLogin = false; },
      error: err => { this.errorMessageLogin = `Error ${err.status}: Credenciales inválidas`; this.loadingLogin = false; }
    });
  }
}