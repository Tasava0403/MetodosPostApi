import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  CrudCrudPostsService,
  CreateProduct, ProductResponse,
  UserResponse, CreateUser,
  CreateCart, CartResponse
} from './crudcrud-posts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // URL dinámica que el usuario puede cambiar
  apiBaseUrl: string = 'https://fakestoreapi.com/products';

  form: CreateProduct = {
    product: '',
    price: 0,
    description: '',
    category: ''
  };

  createdPost: ProductResponse | null = null;

  loading = false;
  errorMessage = '';

  constructor(private postsApi: CrudCrudPostsService) {}

  ProductPost(): void {
    this.errorMessage = '';
    this.createdPost = null;

    if (!this.apiBaseUrl.trim()) {
      this.errorMessage = 'La URL del API es obligatoria.';
      return;
    }

    if (!this.form.product.trim() || this.form.price <= 0 || !this.form.description.trim() || !this.form.category.trim()) {
      this.errorMessage = 'Todos los datos necesarios.';
      return;
    }

    this.loading = true;

    this.postsApi.createProduct(this.apiBaseUrl.trim(), this.form)
      .subscribe({
        next: (res) => {
          this.createdPost = res;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;

          console.error('STATUS:', err.status);
          console.error('ERROR BODY:', err.error);
          console.error('FULL ERROR:', err);

          this.errorMessage = `Error ${err.status}`;
        }
      });
  }
//******************************************************************************segundoPost */
  userBaseUrl: string = 'https://fakestoreapi.com/users';

  form2: CreateUser = {
    email: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
  };

  createdPostUser: UserResponse | null = null;

  loadingUser = false;
  errorMessageUser = '';

  UserPost(): void{
    this.errorMessageUser = '';
    this.createdPostUser = null;

    if (!this.userBaseUrl.trim()) {
      this.errorMessageUser = 'La URL del API es obligatoria.';
      return;
    }

    if (!this.form2.email.trim() || !this.form2.firstname.trim() 
        || !this.form2.lastname.trim() || !this.form2.password.trim() || !this.form2.username.trim()) {
      this.errorMessageUser = 'Todos los datos necesarios.';
      return;
    }

    this.loadingUser = true;

    this.postsApi.createUser(this.userBaseUrl.trim(), this.form2)
      .subscribe({
        next: (res) => {
          this.createdPostUser = res;
          this.loadingUser = false;
        },
        error: (err) => {
          this.loadingUser = false;

          console.error('STATUS:', err.status);
          console.error('ERROR BODY:', err.error);
          console.error('FULL ERROR:', err);

          this.errorMessageUser = `Error ${err.status}`;
        }
      });
  }
//******************************************************************************tercerPost */
  CartBaseUrl: string = 'https://fakestoreapi.com/carts';

  form3: CreateCart = {
    userId: 0,
    date: '',
    products: [
      {
        productId: 0,
        quantity: 0,
      }
    ]
  };

  cartPostUser: CartResponse | null = null;

  loadingCart = false;
  errorMessageCart = '';

  CartPost(): void{
    this.errorMessageCart = '';
    this.createdPostUser = null;

    if (!this.userBaseUrl.trim()) {
      this.errorMessageCart = 'La URL del API es obligatoria.';
      return;
    }

    if (this.form3.userId <= 0 || !this.form3.date.trim() || this.form3.products[0].productId <= 0 ||
       this.form3.products[0].quantity <= 0) {
      this.errorMessageCart = 'Todos los datos necesarios.';
      return;
    }

    this.loadingCart = true;

    this.postsApi.createCart(this.CartBaseUrl.trim(), this.form3)
      .subscribe({
        next: (res) => {
          this.cartPostUser = res;
          this.loadingCart = false;
        },
        error: (err) => {
          this.loadingCart = false;

          console.error('STATUS:', err.status);
          console.error('ERROR BODY:', err.error);
          console.error('FULL ERROR:', err);

          this.errorMessageUser = `Error ${err.status}`;
        }
      });
  }
}