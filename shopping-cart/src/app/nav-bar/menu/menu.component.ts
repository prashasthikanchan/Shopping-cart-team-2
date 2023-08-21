import { Component,HostListener,ElementRef} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isActive = false;

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  clickout(event: Event): void {
    const target = event.target as Element;
    if (this.isActive && !this.el.nativeElement.contains(target)) {
      this.isActive = false;
    }
  }
}
