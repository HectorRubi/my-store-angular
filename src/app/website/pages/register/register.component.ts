import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OnExit } from '../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  onExit(): boolean | Observable<boolean> | Promise<boolean> {
    const rta = confirm('Estas seguro de salir?');
    return rta;
  }

}
