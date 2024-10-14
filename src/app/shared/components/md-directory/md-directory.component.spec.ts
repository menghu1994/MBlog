import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDirectoryComponent } from './md-directory.component';

describe('MdDirectoryComponent', () => {
  let component: MdDirectoryComponent;
  let fixture: ComponentFixture<MdDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdDirectoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
