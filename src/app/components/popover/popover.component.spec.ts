import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [ IonicModule.forRoot(), PopoverComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message', async () => {
  component.message = 'Test message';
  fixture.detectChanges();
  await fixture.whenStable();
  const messageElement = fixture.debugElement.query(By.css('ion-content'));
  expect(messageElement).toBeTruthy();
  expect(messageElement.nativeElement.textContent.trim()).toEqual('Test message');
});
});
