import { TokenService } from './../../AuthServices/token-service';
import { AuthService } from './../../AuthServices/auth-service';
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

// Cross-field validator: password / confirmPassword must match
function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword
    ? { passwordMismatch: true }
    : null;
}

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    MessageModule,
    DividerModule,
    ToastModule,
    RouterLink
],
  providers: [MessageService],   // ← this line is required
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
      router = inject(Router)
    actvroute = inject(ActivatedRoute)
   private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private AuthService = inject(AuthService)
  private TokenService = inject(TokenService)

  loading = signal(false);
  submitted = signal(false);

  form: FormGroup = this.fb.group(
    {
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
        //  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
    //  acceptTerms: [false, [Validators.requiredTrue]],
    },
  );

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted());
  }

  readonly errorMessage = signal<string | null>(null);
  onSubmit(): void {
    this.submitted.set(true);
    this.AuthService.register(this.form.value).subscribe({
      next: (res) => {
        this.TokenService.saveAuthres(res)
        const returnUrl = this.actvroute.snapshot.queryParamMap.get('returnUrl') ?? '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Invalid email or password.');
      },
      complete: () => this.loading.set(false),
    });

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    // Replace with a real API call (e.g. this.authService.signup(this.form.value))
    setTimeout(() => {
      this.loading.set(false);
      this.messageService.add({
        severity: 'success',
        summary: 'Account created',
        detail: `Welcome, ${this.form.value.fullName}!`,
      });
      this.form.reset({ acceptTerms: false });
      this.submitted.set(false);
    }, 1200);
  }
}
