import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminArregladasPage } from './admin-arregladas.page';

describe('AdminArregladasPage', () => {
  let component: AdminArregladasPage;
  let fixture: ComponentFixture<AdminArregladasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArregladasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminArregladasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
