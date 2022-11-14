import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from "rxjs/operators";

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from "../../services/store.service";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  @Input() products: Product[] = [];
  @Output() loadMore = new EventEmitter<void>();

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
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading'
    this.showProductDetail = true;
    this.productService.get(id)
    .subscribe(data => {
      this.productChosen = data;
      this.statusDetail = 'success';
    }, errorMsg => {
      window.alert(errorMsg);
      this.statusDetail = 'error';
    });
  }

  readAndUpdate(id: string) {
    this.productService.get(id)
    .pipe(
      switchMap(product => {
        return this.productService.update(product.id, { title: 'change' })
      }),
    )
    .subscribe(data => {
      console.log(data);
    });

    this.productService.fetchReadAndUpdate(id, { title: 'change' })
    .subscribe(response => {
      const get = response[0];
      const update = response[1];
    })
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

  onLoadMore() {
    this.loadMore.emit();
  }

}
