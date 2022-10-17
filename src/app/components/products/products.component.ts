import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from "../../services/store.service";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: '',
      name: ''
    },
  };
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onShowDetail(id: string) {
    this.productService.get(id)
    .subscribe(data => {
      this.productChosen = data;
      this.showProductDetail = true;
    });
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla bla',
      images: [''],
      price: 1000,
      categoryId: 2,
    };

    this.productService.create(product)
    .subscribe(data => {
      console.log('created', data);
      this.products.unshift(data);
    });
  }

  updateProduct(id: string) {
    const changes: UpdateProductDTO = {
      title: 'Nuevo titulo',
    };
    this.productService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct(id: string) {
    this.productService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadProducts() {
    this.productService.getAll(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
