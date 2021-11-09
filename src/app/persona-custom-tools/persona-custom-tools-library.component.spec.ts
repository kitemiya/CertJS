import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaCustomToolsLibraryComponent } from './persona-custom-tools-library.component';

describe('PersonaCustomToolsLibraryComponent', () => {
  let component: PersonaCustomToolsLibraryComponent;
  let fixture: ComponentFixture<PersonaCustomToolsLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaCustomToolsLibraryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaCustomToolsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
