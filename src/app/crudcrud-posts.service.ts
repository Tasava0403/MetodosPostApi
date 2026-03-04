import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateProduct {
    product: string,
    price: number,
    description: string,
    category: string
}

export interface ProductResponse {
  product: string,
  price: number,
  description: string,
  category: string
}

@Injectable({ providedIn: 'root' })
export class CrudCrudPostsService {

  constructor(private http: HttpClient) {}

  createProduct(baseUrl: string, payload: CreateProduct): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(baseUrl, payload);
  }
//segundo post
  createUser(baseUrl: string, payload: CreateUser): Observable<UserResponse> {
    return this.http.post<UserResponse>(baseUrl, payload);
  }
//tercer post
  createCart(baseUrl: string, payload: CreateCart): Observable<CartResponse> {
    return this.http.post<CartResponse>(baseUrl, payload);
  }
}

//**************************************************segundoPost***************************/
export interface CreateUser {
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface UserResponse {
  id: number;
}

//**************************************************tercerPost***************************/
export interface CreateCart {
  userId: number;
  date: string;
  products: [
    {
      productId: number;
      quantity: number;
    }
  ]
}

export interface CartResponse {
  userId: number;
  date: string;
  products: [
    {
      productId: number;
      quantity: number;
    }
  ]
}