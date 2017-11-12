import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonyTileComponent } from './testimony-tile.component';

describe('TestimonyTileComponent', () => {
  let component: TestimonyTileComponent;
  let fixture: ComponentFixture<TestimonyTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonyTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonyTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
