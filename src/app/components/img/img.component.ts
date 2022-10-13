import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();

  imageDefault = 'https://raw.githubusercontent.com/platzi/angular-componentes/2-step/src/assets/images/default.png'

  constructor() {
    // before - during render
    // NO Async -- once time
    console.log('constructor', 'imgValue => ', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // before render
    // changes inputs -- many times
    console.log('ngOnChanges', 'imgValue => ', this.img);
    console.log({ changes });
  }

  ngOnInit(): void {
    // before render
    // async - fetch, etc. - once time
    console.log('ngOnInit', 'imgValue => ', this.img);
  }

  ngAfterViewInit(): void {
    // after render
    // handler children
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // delete component
    console.log('ngOnDestroy');
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
