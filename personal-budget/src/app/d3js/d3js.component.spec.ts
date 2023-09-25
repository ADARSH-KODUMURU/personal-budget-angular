import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3jsComponent } from './d3js.component';

describe('D3jsComponent', () => {
  let component: D3jsComponent;
  let fixture: ComponentFixture<D3jsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [D3jsComponent]
    });
    fixture = TestBed.createComponent(D3jsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
