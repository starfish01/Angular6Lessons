import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  defaultDownSelect='a'

  @ViewChild('form') form;

  onSubmit() {
    console.log(this.form)
  }

}
