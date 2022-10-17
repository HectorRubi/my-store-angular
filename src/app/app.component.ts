import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = 'https://picsum.photos/200';
  showImg = true;
  token = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'chip',
      email: 'chiop@mailito.com',
      password: 'qwerty12345',
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  login() {
    this.authService.login('chiop@mailito.com', 'qwerty12345')
    .subscribe(rta => {
      this.token = rta.access_token;
    });
  }

  getProfile() {
    this.authService.profile(this.token)
    .subscribe(profile => {
      console.log(profile);
    });
  }
}
