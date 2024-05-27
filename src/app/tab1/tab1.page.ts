import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Trade } from '../models/trade.model';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  lastTrade!: Trade;
  trades: Trade[] = [];
  connectionStatus$:  Observable<boolean> = this.websocketService.getConnectionStatus();
  private subscription: any;
  baseCurrency: string = '';
  quoteCurrency: string = '';
  selectedPair: string = 'ethbtc';

  constructor(
    private websocketService: WebSocketService
  ) { }

  ngOnInit() {
    this.subscription = this.websocketService.getMessages().subscribe((messages: any[]) => {
      messages.forEach((message: any) => {
        this.trades.push(message);
        this.lastTrade = message;
        if (this.trades.length > 50) {
          this.trades.splice(0, this.trades.length - 50);
        }
      });
    });

    // Extrair os símbolos do par de negociação
    this.baseCurrency = this.lastTrade?.s.substring(0, 3);  // 'ETH'
    this.quoteCurrency = this.lastTrade?.s.substring(3);    // 'BTC'
  }

  toggleConnection(checked: boolean) {
    if (checked) {
      this.websocketService.connect();
    } else {
      this.websocketService.close();
    }
  }
  ngOnDestroy() {
    this.websocketService.close();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
