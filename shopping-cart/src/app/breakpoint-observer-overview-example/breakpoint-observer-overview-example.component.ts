import { Component, OnInit,OnDestroy } from '@angular/core';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-breakpoint-observer-overview-example',
  templateUrl: './breakpoint-observer-overview-example.component.html',
  styleUrls: ['./breakpoint-observer-overview-example.component.css']
})
export class BreakpointObserverOverviewExampleComponent implements OnDestroy{

  destroyed = new Subject<void>();
  currentScreenSize: string='';

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
    [Breakpoints.Handset, 'Handset'],
    [Breakpoints.Tablet, 'Tablet'],
    [Breakpoints.Web, 'Web'],
    [Breakpoints.HandsetPortrait, 'HandsetPortrait'],
    [Breakpoints.TabletPortrait, 'TabletPortrait'],
    [Breakpoints.WebPortrait, 'WebPortrait'],
    [Breakpoints.HandsetLandscape, 'HandsetLandscape'],
    [Breakpoints.TabletLandscape, 'TabletLandscape'],
    [Breakpoints.WebLandscape, 'WebLandscape']
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe(Array.from(this.displayNameMap.keys()))
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

