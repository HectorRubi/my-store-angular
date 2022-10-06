import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name: string = 'Nicolas';
  age: number = 18;
  img: string = 'https://source.unsplash.com/random'
}
