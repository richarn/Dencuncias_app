import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminPublicadasPage } from './admin-publicadas.page';

describe('AdminPublicadasPage', () => {
  let component: AdminPublicadasPage;
  let fixture: ComponentFixture<AdminPublicadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPublicadasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPublicadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
