import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourierService } from '../../services/courier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courier-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './courier-registration.component.html',
  styleUrls: ['./courier-registration.component.css'],
})
export class CourierRegistrationComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private courierService: CourierService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      status: ['ACTIVE', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.courierService.createCourier(this.registerForm.value).subscribe({
        next: () => {
          alert('Courier Registered Successfully!');
          this.router.navigate(['/couriers']);
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
    }
  }
}
