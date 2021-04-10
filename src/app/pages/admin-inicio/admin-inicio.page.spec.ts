import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminInicioPage } from './admin-inicio.page';

describe('AdminInicioPage', () => {
  let component: AdminInicioPage;
  let fixture: ComponentFixture<AdminInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
