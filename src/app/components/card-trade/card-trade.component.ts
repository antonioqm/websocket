import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { Trade } from 'src/app/models/trade.model';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-card-trade',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ],
  templateUrl: './card-trade.component.html',
  styleUrl: './card-trade.component.scss',
})
export class CardTradeComponent {
  @Input() trade!: Trade;

  constructor(private popoverController: PopoverController) { }

  async presentPopover(ev: any, message: string) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      componentProps: { message },
      event: ev,
      translucent: true
    });
    await popover.present();
  }
}
