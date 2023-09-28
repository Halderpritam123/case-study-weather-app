import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component {
  selectedCity: string = '';
  cities: any[] = [];
  isModalOpen: boolean = false;
  searchResults: any[] = [];
  searchData: string = ''; // Define searchData property
  cityData: any; // Define cityData property

  constructor(private http: HttpClient) {}

  openCityListModal() {
    // Fetch city list from the backend
    this.http.get<any[]>('http://localhost:8080/cities').subscribe(data => {
      this.cities = data;
      this.isModalOpen = true;
    });
  }

  closeCityListModal() {
    this.isModalOpen = false;
  }

  selectCity(cityName: string) {
    this.selectedCity = cityName;
    this.isModalOpen = false;
  }

  searchCity() {
    if (this.selectedCity) {
      const searchUrl = `http://localhost:8080/cities/search/${this.selectedCity}`;
      this.http.get<any[]>(searchUrl).subscribe(data => {
        // Convert the received object into an array of objects
        this.searchResults = [data]; // Wrap the object in an array
        console.log(data); // Add this line to check if data is received
      });
    } else {
      // Handle case when no city is selected for search
      this.searchResults = [];
    }
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }
}
