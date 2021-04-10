import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { VerdenunciasPage } from './verdenuncias.page';

describe('VerdenunciasPage', () => {
  let component: VerdenunciasPage;
  let fixture: ComponentFixture<VerdenunciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VerdenunciasPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(VerdenunciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
