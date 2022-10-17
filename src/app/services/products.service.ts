import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { retry, catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";

import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api`;
  private apiRoutes = {
    products: '/products',
  };

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}${this.apiRoutes.products}`, { params })
    .pipe(
      retry(3),
      map(products => products.map(product => {
        return {
          ...product,
          taxes: .16 * product.price
        };
      }))
    );
  }

  get(id: string) {
    return this.http.get<Product>(`${this.apiUrl}${this.apiRoutes.products}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('El producto no existe');
        }
        return throwError('Ups algo salio mal');
      })
    );
  }

  getByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}${this.apiRoutes.products}`, {
      params: { limit, offset },
    });
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}${this.apiRoutes.products}`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}${this.apiRoutes.products}/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}${this.apiRoutes.products}/${id}`);
  }
}
