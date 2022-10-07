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

  names: string[] = ['Nico', 'Juli', 'Santi'];
  newName = '';

  taskList: string[] = [];
  newTask: string = '';

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }

  increaseAge() {
    this.person.age += 1;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.person.name = element.value;
  }

  addName() {
    this.names.push(this.newName);
    this.newName = '';
  }

  deleteName(index: number) {
    this.names.splice(index, 1);
  }

  addTask() {
    this.taskList.push(this.newTask);
    this.newTask = '';
  }

  deleteTask(index: number) {
    this.taskList.splice(index, 1);
  }
}
