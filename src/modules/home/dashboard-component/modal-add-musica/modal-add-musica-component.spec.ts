import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddMusicaComponent } from './modal-add-musica-component';

describe('ModalAddMusicaComponent', () => {
  let component: ModalAddMusicaComponent;
  let fixture: ComponentFixture<ModalAddMusicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddMusicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
