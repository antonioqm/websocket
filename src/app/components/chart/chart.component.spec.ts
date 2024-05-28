import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { WebSocketService } from 'src/app/services/websocket.service';
import { ChartComponent } from './chart.component';

const mockWebSocketService = {
  getMessages: jest.fn().mockReturnValue(of([
    { e: 'trade', E: 1716866820157, s: 'ETHBTC', t: 447945251, p: '0.05639000', q: '0.00200000', b: 3984385518, a: 3984386337, T: 1716866820157, m: true, M: true }
  ])),
  getConnectionStatus: jest.fn().mockReturnValue(of(true))
};

jest.mock('echarts', () => ({
  init: jest.fn().mockReturnValue({
    setOption: jest.fn(),
    dispose: jest.fn(),
  }),
}));


describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let wsService: WebSocketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, IonicModule.forRoot(), ChartComponent],
      providers: [
        { provide: WebSocketService, useValue: mockWebSocketService }
      ]
    }).compileComponents();

    wsService = TestBed.inject(WebSocketService);
  });

  jest.mock('echarts', () => ({
    init: jest.fn().mockReturnValue({
      setOption: jest.fn(),
      dispose: jest.fn(),
    }),
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.getThemeColor = jest.fn().mockReturnValue('mock-color');
    window.matchMedia = jest.fn().mockReturnValue({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    });


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the chart', () => {
    jest.spyOn(component, 'initializeChart');
    component.ngOnInit();
    expect(component.initializeChart).toHaveBeenCalled();
  });

  it('should handle new data from WebSocket', () => {
    const initialLength = component.prices.length;
    component.ngOnInit();
    expect(component.prices.length).toBeGreaterThan(initialLength);
  });

  it('should add data to chart', () => {
    const initialTimesLength = component.times.length;
    const initialPricesLength = component.prices.length;
    component.addData('12:00:00', 0.056);
    expect(component.times.length).toBe(initialTimesLength + 1);
    expect(component.prices.length).toBe(initialPricesLength + 1);
  });

  it('should return true if there are messages', () => {
    component.prices = [0.056];
    expect(component.hasMessage).toBe(true);
  });

  it('should return false if there are no messages', () => {
    component.prices = [];
    expect(component.hasMessage).toBe(false);
  });

  it('should unsubscribe on destroy', () => {
    jest.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should get chart options', () => {
    const options = component.getChartOptions();
    expect(options).toHaveProperty('title');
    expect(options).toHaveProperty('tooltip');
    expect(options).toHaveProperty('xAxis');
    expect(options).toHaveProperty('yAxis');
    expect(options).toHaveProperty('series');
  });

  it('should update chart theme', () => {
    jest.spyOn(component.chart, 'setOption');
    component.updateChartTheme();
    expect(component.chart.setOption).toHaveBeenCalled();
  });

  it('should get theme color', () => {
    const color = component.getThemeColor('--chart-tooltip-bg');
    expect(color).toBeDefined();
  });
});
