import { Injectable } from '@angular/core';

import { Country } from '../country';

const COUNTRIES = [
  new Country(1, 'India', 'New Delhi', 'INR'),
  new Country(2, 'China', 'Beijing', 'RMB')
];
let countriesPromise = Promise.resolve(COUNTRIES);

@Injectable()
export class CountryService { 
	getCountries(): Promise<Country[]> {
	    return countriesPromise;
	}
	getCountry(id: number): Promise<Country> {
        return this.getCountries()
            .then(countries => countries.find(country => country.countryId === id));
    }	
    updateCountry(country: Country): Promise<Country> {
		return this.getCountries()
		  .then(countries => {
		        let countryObj = countries.find(ob => ob.countryId === country.countryId);
                countryObj = country;
				return countryObj;
			}
		  );
    }	
    addCountry(country: Country): Promise<Country> {
		return this.getCountries()
		  .then(countries => {
		     let maxIndex = countries.length - 1;
		     let countryWithMaxIndex = countries[maxIndex];
		     country.countryId = countryWithMaxIndex.countryId + 1;
		     countries.push(country);
			 return country;
		  }
		);
    }	
}