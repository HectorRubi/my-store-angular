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

  img: string = ''

  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img =>', this.img);
  }

  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();

  imageDefault = 'https://raw.githubusercontent.com/platzi/angular-componentes/2-step/src/assets/images/default.png';
  // counter = 0;
  // counterFn: number | undefined;

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
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter');
    // }, 1000);
  }

  ngAfterViewInit(): void {
    // after render
    // handler children
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // delete component
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('log hijo');
    this.loaded.emit(this.img);
  }

}
