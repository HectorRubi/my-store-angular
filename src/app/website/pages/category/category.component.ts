import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

import { Product } from '../../../models/product.model';
import { ProductsService } from "../../../services/products.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        this.offset = 0;
        this.products = [];
        if (this.categoryId) {
          return this.productsService
          .getByCategory(this.categoryId, this.limit, this.offset);
        }
        return [];
      }),
    )
    .subscribe(data => {
      if (data.length) {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      }
    });
  }

  loadProducts() {
    if (this.categoryId) {
      this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
      .subscribe(data => {
        if (data.length) {
          this.products = this.products.concat(data);
          this.offset += this.limit;
        }
      });
    }
  }

}
