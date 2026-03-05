import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/* ─── PRIMER POST: Producto ─── */
export interface CreateProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
export interface ProductResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

/* ─── SEGUNDO POST: Usuario completo ─── */
export interface CreateUser {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}
export interface UserResponse {
  id: number;
}

/* ─── TERCER POST: Carrito ─── */
export interface CreateCart {
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}
export interface CartResponse {
  id: number;
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}

/* ─────────────────────────────────────────────────── */

@Injectable({ providedIn: 'root' })
export class CrudCrudPostsService {

  constructor(private http: HttpClient) {}

  // Primer POST — Crear producto
  createProduct(baseUrl: string, payload: CreateProduct): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(baseUrl, payload);
  }

  // Segundo POST — Crear usuario (body anidado según FakeStore API)
  createUser(baseUrl: string, payload: CreateUser): Observable<UserResponse> {
    const body = {
      email:    payload.email,
      username: payload.username,
      password: payload.password,
      name: {
        firstname: payload.firstname,
        lastname:  payload.lastname
      },
      address: {
        city:    payload.city,
        street:  payload.street,
        number:  payload.number,
        zipcode: payload.zipcode,
        geolocation: { lat: '0', long: '0' }
      },
      phone: payload.phone
    };
    return this.http.post<UserResponse>(baseUrl, body);
  }

  // Tercer POST — Crear carrito
  createCart(baseUrl: string, payload: CreateCart): Observable<CartResponse> {
    return this.http.post<CartResponse>(baseUrl, payload);
  }
}