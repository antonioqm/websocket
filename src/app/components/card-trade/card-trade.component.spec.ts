import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { CardTradeComponent } from './card-trade.component';

@Component({
  template: ''
})
class MockPopoverComponent {
  @Input() message!: string;
}

describe('CardTradeComponent', () => {
  let component: CardTradeComponent;
  let fixture: ComponentFixture<CardTradeComponent>;
  let popoverController: PopoverController;

  const mockTrade = {
    e: 'trade',
    E: 123456789,
    s: 'BTCUSDT',
    t: 12345,
    p: '0.001',
    q: '1.0',
    b: 88,
    a: 50,
    T: 123456789,
    m: true,
    M: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockPopoverComponent],
      imports: [CommonModule, IonicModule.forRoot(), CardTradeComponent],
      providers: [PopoverController],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTradeComponent);
    component = fixture.componentInstance;
    popoverController = TestBed.inject(PopoverController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a trade input', () => {
    component.trade = mockTrade;
    fixture.detectChanges();
    expect(component.trade).toEqual(mockTrade);
  });

 it('should call presentPopover method with correct parameters', async () => {
  const presentSpy = jest.fn().mockResolvedValue(null);
  const createSpy = jest.spyOn(component['popoverController'], 'create').mockResolvedValue({
    present: presentSpy
  } as any);
  const eventMock = {};
  const message = 'Test Message';

  await component.presentPopover(eventMock, message);

  expect(createSpy).toHaveBeenCalledWith({
    component: PopoverComponent,
    componentProps: { message },
    event: eventMock,
    translucent: true,
  });
});

 it('should present popover', async () => {
  const eventMock = {};
  const message = 'Test Message';
  const presentSpy = jest.fn().mockResolvedValue(null);
  const createSpy = jest.spyOn(component['popoverController'], 'create').mockResolvedValue({
    present: presentSpy
  } as any);

  await component.presentPopover(eventMock, message);

  expect(createSpy).toHaveBeenCalled();
  expect(presentSpy).toHaveBeenCalled();
});

it('should instantiate popoverController in the constructor', () => {
  const popoverControllerInstance = TestBed.inject(PopoverController);
  const testComponent = new CardTradeComponent(popoverControllerInstance);
  expect(testComponent['popoverController']).toBeTruthy();
});

it('should handle async/await in presentPopover', async () => {
  const eventMock = {};
  const message = 'Test Message';
  const presentSpy = jest.fn().mockResolvedValue(null);
  const createSpy = jest.spyOn(component['popoverController'], 'create').mockResolvedValue({
    present: presentSpy
  } as any);

  await component.presentPopover(eventMock, message);

  expect(createSpy).toHaveBeenCalled();
  expect(presentSpy).toHaveBeenCalled();
});

  it('should call popover.present() in presentPopover', async () => {
  const eventMock = {};
  const message = 'Test Message';
  const presentSpy = jest.fn().mockResolvedValue(null);
  const createSpy = jest.spyOn(component['popoverController'], 'create').mockResolvedValue({
    present: presentSpy
  } as any);

  await component.presentPopover(eventMock, message);

  expect(createSpy).toHaveBeenCalled();
  expect(presentSpy).toHaveBeenCalled();
});
});
