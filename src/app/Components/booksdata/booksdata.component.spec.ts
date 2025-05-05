import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksdataComponent } from './booksdata.component';

describe('BooksdataComponent', () => {
  let component: BooksdataComponent;
  let fixture: ComponentFixture<BooksdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
