import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePopupComponent } from './issue-popup.component';

describe('IssuePopupComponent', () => {
  let component: IssuePopupComponent;
  let fixture: ComponentFixture<IssuePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
