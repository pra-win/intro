import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCopComponent } from './child-cop.component';

describe('ChildCopComponent', () => {
  let component: ChildCopComponent;
  let fixture: ComponentFixture<ChildCopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildCopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
