import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name: string = 'Nicolas';
  age: number = 18;
  img: string = 'https://source.unsplash.com/random';
  btnDisabled = false;
  person = {
    name: 'Nicolas',
    age: 18,
    avatar: 'https://source.unsplash.com/random',
  }

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }

  increaseAge() {
    this.person.age += 1;
  }
}
