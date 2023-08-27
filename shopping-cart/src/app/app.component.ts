import { Component, OnDestroy,HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-cart';
  destroyed = new Subject<void>();
  currentScreenSize: string = '';
  isDarkMode: boolean = false;
  showFeedbackForm = false;
  showContact = false;
  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
  }

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
  showFeedback(){
    this.showFeedbackForm = !this.showFeedbackForm;
  }
  showContactInfo(){
    this.showContact = !this.showContact;
  }
    

}
