import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminNoticiasPage } from './admin-noticias.page';

describe('AdminNoticiasPage', () => {
  let component: AdminNoticiasPage;
  let fixture: ComponentFixture<AdminNoticiasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNoticiasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminNoticiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
