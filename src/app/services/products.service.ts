import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { retry } from "rxjs/operators";

import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokupppapp.com/api';
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
      retry(3)
    );
  }

  get(id: string) {
    return this.http.get<Product>(`${this.apiUrl}${this.apiRoutes.products}/${id}`);
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
