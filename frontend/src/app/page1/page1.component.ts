import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  searchData: string = '';
  cityData: any;
  isAddCityModalOpen: boolean = false;
  cityForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.cityForm = this.fb.group({
      name: ['', Validators.required],
        temp: ['', Validators.required],
        humidity: ['', Validators.required],
        wind_speed: ['', Validators.required],
        sunrise: ['', Validators.required],
        sunset: ['', Validators.required],
        cloud_pct: ['', Validators.required],
        min_temp: ['', Validators.required],
        max_temp: ['', Validators.required],
        wind_degrees: ['', Validators.required]
    });
  }

  openCityListModal() {
    this.http.get<any[]>('http://localhost:8080/cities').subscribe(
      (data) => {
        this.cities = data;
        this.isModalOpen = true;
      },
      (error) => {
        this.showAlert('Error', 'Failed to fetch city list. Please try again later.');
        console.error('Error fetching city list:', error);
      }
    );
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
      this.http.get<any[]>(searchUrl).subscribe(
        (data) => {
          this.searchResults = [data];
          console.log(data);
        },
        (error) => {
          this.showAlert('Error', 'Failed to search for the city. Please try again later.');
          console.error('Error searching for the city:', error);
        }
      );
    } else {
      this.showAlert('Info', 'Please select a city before searching.');
    }
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }

  deleteCity(cityId: number) {
    const deleteUrl = `http://localhost:8080/cities/${cityId}`;
    this.http.delete(deleteUrl).subscribe(
      () => {
        this.searchResults = this.searchResults.filter((city) => city.id !== cityId);
        this.showAlert('Success', 'City deleted successfully.');
      },
      (error) => {
        this.showAlert('Error', 'Failed to delete the city. Please try again later.');
        console.error('Error deleting the city:', error);
      }
    );
  }

  openAddCityModal() {
    this.isAddCityModalOpen = true;
  }

  closeAddCityModal() {
    this.isAddCityModalOpen = false;
    this.cityForm.reset();
  }

  addCity() {
    if (this.cityForm.valid) {
      const addCityUrl = 'http://localhost:8080/cities'; // Adjust the URL as needed
      this.http.post(addCityUrl, this.cityForm.value).subscribe(
        () => {
          this.closeAddCityModal();
          this.showAlert('Success', 'City added successfully.');
          // Refresh the city list here if needed
        },
        (error) => {
          this.showAlert('Error', 'Failed to add the city. Please try again later.');
          console.error('Error adding the city:', error);
        }
      );
    } else {
      this.showAlert('Error', 'Please fill in all required fields.');
    }
  }

  private showAlert(title: string, message: string) {
    alert(`${title}: ${message}`);
  }
}
