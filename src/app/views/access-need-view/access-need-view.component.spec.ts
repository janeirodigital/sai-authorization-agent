import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessNeedViewComponent } from './access-need-view.component';

describe('AccessNeedViewComponent', () => {
  let component: AccessNeedViewComponent;
  let fixture: ComponentFixture<AccessNeedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessNeedViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessNeedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
