import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingComponent } from './app-loader.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})
export class LoadingComponentModule {}
