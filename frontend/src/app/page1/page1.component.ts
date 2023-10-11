import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'; // Import SweetAlert2

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
  cityDeleted: boolean = false; // Track whether a city has been deleted
  isLoading: boolean = false;
  showtable: boolean = false;
  notFound: boolean = false;
  isEditFormOpen: boolean = false;
  editingCity: any;

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
    this.isLoading = true;
    console.log("open list")
    this.http.get<any[]>('https://piworks.onrender.com/cities').subscribe(
      (data) => {
        this.cities = data;
        this.isModalOpen = true;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to fetch city list. Please try again later.',
        });
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
    this.notFound = false;
    this.showtable = false;
    this.isLoading = true;
    this.cityDeleted = false;

    if (this.selectedCity) {
      const searchUrl = `https://piworks.onrender.com/cities/search/${this.selectedCity}`;
      this.http.get<any[]>(searchUrl).subscribe(
        (data) => {
          sessionStorage.setItem('cityData', JSON.stringify(data));
          this.searchResults = [data];
          console.log(data)
          this.isLoading = false;
          this.showtable = true;
        },
        (error) => {
          sessionStorage.setItem('cityData', JSON.stringify(null));
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'City Not Found.',
          });
          console.error('Error searching for the city:', error);
          this.notFound = true;
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Please select a city before searching..',
      });
      this.isLoading = false;
    }
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  }

  deleteCity(cityId: number) {
    Swal.fire({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this city?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.performCityDeletion(cityId);
      }
    });
  }

  private performCityDeletion(cityId: number) {
    this.isLoading = true;
    const deleteUrl = `https://piworks.onrender.com/cities/${cityId}`;
    this.http.delete(deleteUrl).subscribe(
      () => {
        this.searchResults = this.searchResults.filter((city) => city.id !== cityId);
        this.isLoading = false;
        this.cityDeleted = true;
        this.showAlert('Success', 'City deleted successfully.');
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: 'Failed to delete the city. Please try again later.',
        });
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
    this.isLoading = true;
    if (this.cityForm.valid) {
      const addCityUrl = 'https://piworks.onrender.com/cities';
      this.http.post(addCityUrl, this.cityForm.value).subscribe(
        () => {
          this.closeAddCityModal();
          this.isLoading = false;
          this.showAlert('Success', 'City added successfully.');
        },
        (error) => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Failed to add the city. Please try again later.',
          });
          console.error('Error adding the city:', error);
        }
      );
    } else {
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: 'Please fill in all required fields.',
      });
    }
  }

  // Function to open the edit form with the selected city's data
  openEditForm(city: any) {
    this.editingCity = { ...city };
    this.isEditFormOpen = true;
  }

  // Function to close the edit form
  closeEditForm() {
    this.isEditFormOpen = false;
  }

  // Function to save the edited city data
  saveCityEdits() {
    this.isLoading = true;
    const updateUrl = `https://piworks.onrender.com/cities/${this.editingCity._id}`;
    this.http.patch(updateUrl, this.editingCity).subscribe(
      (response) => {
        this.searchResults = this.searchResults.map((city) => {
          if (city._id === this.editingCity._id) {
            return response;
          } else {
            return city;
          }
        });
        this.isEditFormOpen = false;
        this.isLoading = false;
        this.showAlert('Success', 'City data updated successfully.');
      },
      (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: 'Failed to update city data. Please try again later.',
        });
        console.error('Error updating city data:', error);
      }
    );
  }

  private showAlert(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
}
