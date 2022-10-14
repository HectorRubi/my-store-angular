import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO } from '../../models/product.model';

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

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productService.getAll()
    .subscribe(data => {
      this.products = data;
    });
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

}
