import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = 'https://picsum.photos/200';
  showImg = true;
  imgRta = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  downloadPDF() {
    this.filesService.getFile(
      'my.pdf',
      'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
      'application/pdf'
    ).subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      })
    }
  }

}
