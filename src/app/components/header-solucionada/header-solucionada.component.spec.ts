import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeaderSolucionadaComponent } from './header-solucionada.component';

describe('HeaderSolucionadaComponent', () => {
  let component: HeaderSolucionadaComponent;
  let fixture: ComponentFixture<HeaderSolucionadaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSolucionadaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderSolucionadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
