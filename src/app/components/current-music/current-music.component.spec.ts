import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentMusicComponent } from './current-music.component';

describe('CurrentMusicComponent', () => {
  let component: CurrentMusicComponent;
  let fixture: ComponentFixture<CurrentMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentMusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
