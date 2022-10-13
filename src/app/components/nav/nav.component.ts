import { Component, OnInit } from '@angular/core';

import { StoreService } from "../../services/store.service";

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

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

}
