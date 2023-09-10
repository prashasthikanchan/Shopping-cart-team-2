import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointObserverOverviewExampleComponent } from './breakpoint-observer-overview-example.component';

describe('BreakpointObserverOverviewExampleComponent', () => {
  let component: BreakpointObserverOverviewExampleComponent;
  let fixture: ComponentFixture<BreakpointObserverOverviewExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakpointObserverOverviewExampleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakpointObserverOverviewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
