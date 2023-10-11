import { Component } from '@angular/core';

@Component({
  selector: 'app-help-btn',
  templateUrl: './help-btn.component.html',
  styleUrls: ['./help-btn.component.css']
})
export class HelpBtnComponent {
  isHelpPopupOpen: boolean = false;

  showHelpPopup() {
    this.isHelpPopupOpen = true;

  }

  closeHelpPopup() {
    this.isHelpPopupOpen = false;
  }
}
