import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ProductsService } from '../../../../services/products.service';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    });
  }

  loadProducts() {
    this.productService.getAll(this.limit, this.offset)
    .subscribe(data => {
      if (data.length) {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      }
    });
  }

}
