import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStreamManagerComponent } from './data-stream-manager.component';

describe('DataStreamManagerComponent', () => {
  let component: DataStreamManagerComponent;
  let fixture: ComponentFixture<DataStreamManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataStreamManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataStreamManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
