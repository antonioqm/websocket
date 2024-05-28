import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { TabsPage } from './tabs.page';

describe('TabsPage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
            params: of({ id: '1' })
          },
        },
      ],
    }).compileComponents();
  }));

  it('should create the tabs page', () => {
    const fixture = TestBed.createComponent(TabsPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
