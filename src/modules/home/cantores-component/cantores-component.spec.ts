import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantoresComponentComponent } from './cantores-component';

describe('CantoresComponentComponent', () => {
  let component: CantoresComponentComponent;
  let fixture: ComponentFixture<CantoresComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CantoresComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CantoresComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
