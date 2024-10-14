import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAnimationComponent } from './ng-animation.component';

describe('NgAnimationComponent', () => {
  let component: NgAnimationComponent;
  let fixture: ComponentFixture<NgAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgAnimationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
