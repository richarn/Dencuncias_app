import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ResultadosPage } from './resultados.page';

describe('ResultadosPage', () => {
  let component: ResultadosPage;
  let fixture: ComponentFixture<ResultadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultadosPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
