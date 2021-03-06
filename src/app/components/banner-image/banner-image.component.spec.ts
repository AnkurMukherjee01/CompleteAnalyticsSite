import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerImageComponent } from './banner-image.component';

describe('BannerImageComponent', () => {
  let component: BannerImageComponent;
  let fixture: ComponentFixture<BannerImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
