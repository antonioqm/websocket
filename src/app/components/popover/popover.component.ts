import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: `./popover.component.html`,
  styleUrl: './popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
  message: string = '';

 }
