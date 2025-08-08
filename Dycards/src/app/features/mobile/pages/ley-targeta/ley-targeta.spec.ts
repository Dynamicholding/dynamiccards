import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeyTargeta } from './ley-targeta';

describe('LeyTargeta', () => {
  let component: LeyTargeta;
  let fixture: ComponentFixture<LeyTargeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeyTargeta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeyTargeta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
