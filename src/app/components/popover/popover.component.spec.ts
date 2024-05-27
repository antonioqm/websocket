import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        IonicModule.forRoot(),
        PopoverComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty message initially', () => {
    expect(component.message).toBe('');
  });

  it('should render the message in the template', () => {
    component.message = 'Test message';
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('.message')).nativeElement;
    expect(messageElement.textContent).toContain('Test message');
  });

  it('should render the component template', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div')).toBeTruthy();
  });
});
