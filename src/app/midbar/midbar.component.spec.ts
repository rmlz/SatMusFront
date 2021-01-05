import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MidbarComponent } from './midbar.component';

describe('MidbarComponent', () => {
  let component: MidbarComponent;
  let fixture: ComponentFixture<MidbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MidbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MidbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
