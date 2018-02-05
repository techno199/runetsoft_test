import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmanagerColumnComponent } from './taskmanager-column.component';

describe('TaskmanagerColumnComponent', () => {
  let component: TaskmanagerColumnComponent;
  let fixture: ComponentFixture<TaskmanagerColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmanagerColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmanagerColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
