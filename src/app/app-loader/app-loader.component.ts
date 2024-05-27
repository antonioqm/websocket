import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss'],
})
export class LoadingComponent {

  @Input() name?: string;

}
