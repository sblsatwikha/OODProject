import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayExpensePage } from './display-expense.page';

describe('DisplayExpensePage', () => {
  let component: DisplayExpensePage;
  let fixture: ComponentFixture<DisplayExpensePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DisplayExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
