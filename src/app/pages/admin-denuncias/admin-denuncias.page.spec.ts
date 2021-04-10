import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminDenunciasPage } from './admin-denuncias.page';

describe('AdminDenunciasPage', () => {
  let component: AdminDenunciasPage;
  let fixture: ComponentFixture<AdminDenunciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDenunciasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDenunciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
