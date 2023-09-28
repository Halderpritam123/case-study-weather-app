// page2.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component {
  isHelpPopupOpen: boolean = false;

  showHelpPopup() {
    this.isHelpPopupOpen = true;
  }

  closeHelpPopup() {
    this.isHelpPopupOpen = false;
  }
}
