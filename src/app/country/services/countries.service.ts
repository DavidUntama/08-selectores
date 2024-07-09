import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Region, SmallCountry } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private _http = inject(HttpClient);
  private _regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europa,
    Region.Oceania,
  ];
  private baseURL: string = 'https://restcountries.com/v3.1';

  get regions(): Region[] {
    return [...this._regions];
  }
  getCountriesByRegion(region: Region|null): Observable<SmallCountry[]> {
    return (
      this._http
        .get<SmallCountry[]>(
          `${this.baseURL}/region/${region}?fields=cca3,name,borders`
        )
        // .pipe(tap((r) => console.log(r))) || of([])
    );
  }
}
