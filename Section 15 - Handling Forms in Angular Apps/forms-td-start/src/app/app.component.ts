import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(form:NgForm) {
  //   console.log(form)
  // }

  @ViewChild('form') signupForm;
  defaultQuestion = 'pet'
  genders = ['male','female']

  onSubmit() {
    console.log(this.signupForm)
  }

}
