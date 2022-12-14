import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StoreService } from "../../../services/store.service";
import { AuthService } from "../../../services/auth.service";
import { UsersService } from "../../../services/users.service";

import { Category } from "../../../models/product.model";
import { User } from 'src/app/models/user.model';
import { CategoriesService } from "../../../services/categories.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  iconMenu = 'https://raw.githubusercontent.com/platzi/angular-componentes/4e39fb3cb8b9287318072def140d6b6282603993/src/assets/svg/icon_menu.svg';
  iconLogo = 'https://raw.githubusercontent.com/platzi/angular-componentes/4e39fb3cb8b9287318072def140d6b6282603993/src/assets/svg/logo_yard_sale.svg';
  iconShoppingCart = 'https://raw.githubusercontent.com/platzi/angular-componentes/4e39fb3cb8b9287318072def140d6b6282603993/src/assets/svg/icon_shopping_cart.svg';

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$
    .subscribe(products => {
      this.counter = products.length;
    });

    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    });

    this.getAllCategories();
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/']);
  }

  createUser() {
    this.usersService.create({
      name: 'chip',
      email: 'chiop@mailito.com',
      password: 'qwerty12345',
      role: 'customer',
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    });
  }

}
