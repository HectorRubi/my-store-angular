import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from "../../models/product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    title: '',
    image: '',
    price: 0,
    description: '',
    category: '',
    rating: {
      rate: 0,
      count: 0
    }
  };

  @Output() addedProduct = new EventEmitter<Product>();

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

}
