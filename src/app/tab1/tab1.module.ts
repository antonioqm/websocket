import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab1Page } from './tab1.page';

import { CardTradeComponent } from '../components/card-trade/card-trade.component';
import { ChartComponent } from '../components/chart/chart.component';

import { LoadingComponentModule } from '../app-loader/app-loader.module';
import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoadingComponentModule,
    Tab1PageRoutingModule,
    ChartComponent,
    CardTradeComponent
  ],
  declarations: [Tab1Page, ]
})
export class Tab1PageModule {}
