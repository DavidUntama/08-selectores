import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/country.interface';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './selector-page.component.html',
  styleUrl: './selector-page.component.css',
})
export class SelectorPageComponent {
  private fb = inject(FormBuilder);
  private countriesService = inject(CountriesService);

  public myForm = this.fb.group({
    region: [Region.Americas, Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  ngOnInit(): void {
    this.onRegionChange();
  }
  onRegionChange() {
    
    this.myForm.get('region')!.valueChanges
    .pipe(      
      switchMap( (region) => this.countriesService.getCountriesByRegion(region))
    ).subscribe((countries) => {
        console.log(countries);        
      });
  }
}
