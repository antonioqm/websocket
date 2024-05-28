import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { CardTradeComponent } from '../components/card-trade/card-trade.component';
import { ChartComponent } from '../components/chart/chart.component';
import { Trade } from '../models/trade.model';
import { WebSocketService } from '../services/websocket.service';
import { Tab1Page } from './tab1.page';

const USERCONFIGMock = {

};

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let websocketServiceMock: any;

  beforeEach(async () => {
    websocketServiceMock = {
      getMessages: jest.fn().mockReturnValue(of([{ s: 'ETHBTC', p: '0.1', q: '10' }])),
      getConnectionStatus: jest.fn().mockReturnValue(of(true)),
      connect: jest.fn(),
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports:[IonicModule.forRoot(), CardTradeComponent, ChartComponent],
      declarations: [Tab1Page],
      providers: [
        { provide: WebSocketService, useValue: websocketServiceMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    window.getComputedStyle = jest.fn().mockImplementation(() => {
      return {
        getPropertyValue: jest.fn()
      }
    });

    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    });

    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.position = 'absolute';
    Object.defineProperty(element, 'clientWidth', {value: 500});
    Object.defineProperty(element, 'clientHeight', {value: 500});

    document.getElementById = jest.fn().mockReturnValue(element);


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize trades and lastTrade on ngOnInit', () => {
    expect(component.trades.length).toBe(1);
    expect(component.lastTrade).toEqual({ s: 'ETHBTC', p: '0.1', q: '10' } as Trade);
    expect(component.baseCurrency).toBe('ETH');
    expect(component.quoteCurrency).toBe('BTC');
  });

  it('should call websocketService.connect on toggleConnection(true)', () => {
    component.toggleConnection(true);
    expect(websocketServiceMock.connect).toHaveBeenCalled();
  });

  it('should call websocketService.close on toggleConnection(false)', () => {
    component.toggleConnection(false);
    expect(websocketServiceMock.close).toHaveBeenCalled();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(websocketServiceMock.close).toHaveBeenCalled();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
