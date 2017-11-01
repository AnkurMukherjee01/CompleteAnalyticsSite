import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatwedidComponent } from './whatwedid.component';

describe('WhatwedidComponent', () => {
  let component: WhatwedidComponent;
  let fixture: ComponentFixture<WhatwedidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatwedidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatwedidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
