import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdReaderComponent } from './md-reader.component';

describe('MdReaderComponent', () => {
  let component: MdReaderComponent;
  let fixture: ComponentFixture<MdReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
