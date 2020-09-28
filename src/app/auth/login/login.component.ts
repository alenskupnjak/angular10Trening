import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  moduleId: 'module.id',
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // formu definiramo kao reaktivnu
  isLoading: boolean = false; // podatak za ukljuci/iskljuci spinner

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // definiramo ulazne podatke login forme,
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    // palim spinner
    this.isLoading = true;
    // Reaktivna forma, na klik saljemo podatke u authservis
    this.authService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .then((data) => {
        this.isLoading = false;
      });
  }
}
