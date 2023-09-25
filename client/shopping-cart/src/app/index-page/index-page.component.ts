import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ClothingDataService } from '../service/clothing-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  indexPageItems: {
    brands: [{ name: string, image: string }],
    categories: [{ name: string, image: string }],
    gender: [{ name: string, image: string }]
  } =
    { brands: [{ name: '', image: '' }], categories: [{ name: '', image: '' }], gender: [{ name: '', image: '' }] }
  brands: [{ name: string, image: string }] = [{ name: '', image: '' }];
  allCategories: [{ name: string, image: string }] = [{ name: '', image: '' }];
  genderOptions: [{ name: string, image: string }] = [{ name: '', image: '' }];
  constructor(private clothingDataService: ClothingDataService, private router: Router) { }
  ngOnInit(): void {
    this.clothingDataService.getBrands().subscribe(data => {
      this.brands = data;
    });
    this.clothingDataService.getCategory().subscribe(data => {
      this.allCategories = data;
    });
    this.clothingDataService.getGender().subscribe(data => {
      this.genderOptions = data;
    });
  }

  onClickBrand(name: string) {
    this.router.navigate(['/clothes/search'], { queryParams: { q: name.toLowerCase() } });
  }
  onClickCategory(name: string) {
    this.router.navigate(['/clothes/search'], { queryParams: { q: name.toLowerCase() } });
  }
  onClickGender(name: string) {
    this.router.navigate(['/clothes/search'], { queryParams: { q: name.toLowerCase() } });
  }

  @ViewChild('brandList') brandList: ElementRef | undefined;

  scroll(direction: 'left' | 'right'): void {
    const container = this.brandList?.nativeElement;
    if (container) {
      const scrollAmount = 200;
      const scrollPosition = container.scrollLeft;

      if (direction === 'left') {
        container.scrollLeft = Math.max(scrollPosition - scrollAmount, 0);
      } else {
        container.scrollLeft = Math.min(scrollPosition + scrollAmount, container.scrollWidth - container.clientWidth);
      }
    }
  }
}
