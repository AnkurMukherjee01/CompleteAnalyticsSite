import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBatchesComponent } from './recent-batches.component';

describe('RecentBatchesComponent', () => {
  let component: RecentBatchesComponent;
  let fixture: ComponentFixture<RecentBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentBatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
