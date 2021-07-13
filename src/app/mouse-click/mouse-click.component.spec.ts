import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouseClickComponent } from './mouse-click.component';

describe('MouseClickComponent', () => {
  let component: MouseClickComponent;
  let fixture: ComponentFixture<MouseClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouseClickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MouseClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
