import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  cityData: any | null = null;
  status: boolean = false;
  currentDayName: string = '';
  currentTime: string = '';

  constructor() {}

  ngOnInit(): void {
    const storedData = sessionStorage.getItem('cityData');
    if (storedData) {
      if (JSON.parse(storedData)) {
        this.cityData = [JSON.parse(storedData)];
        this.status = true;
      } else {
        this.status = false;
      } 
      this.currentTime = this.getCurrentTime(); // Set the current time
    }
     // Get the current day name
     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     const currentDate = new Date();
     this.currentDayName = daysOfWeek[currentDate.getDay()]
  }
 


  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  }
  parseFloat(value: string): number {
    return parseFloat(value);
  }
  getDayName(index: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = new Date().getDay();
    
    // Calculate the index for the forecast card
    let cardIndex = currentDayIndex + index;
    if (cardIndex > 6) {
      cardIndex -= 7;
    }
  
    return days[cardIndex];
  }
  
  
}
