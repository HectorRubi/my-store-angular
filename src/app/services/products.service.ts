import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api';
  private apiRoutes = {
    products: '/products',
  };

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Product[]>(`${this.apiUrl}${this.apiRoutes.products}`);
  }

  get(id: string) {
    return this.http.get<Product>(`${this.apiUrl}${this.apiRoutes.products}/${id}`);
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
