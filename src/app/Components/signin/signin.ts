import { AuthService } from './../../AuthServices/auth-service';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, Router } from '@angular/router'
import { TokenService } from '../../AuthServices/token-service';
@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, ButtonModule, DividerModule, InputTextModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
    router = inject(Router)
    actvroute = inject(ActivatedRoute)
   private fb = inject(FormBuilder);
  Authservice = inject(AuthService)
  Tokenservice = inject(TokenService)
    readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });


    onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  this.loading.set(true);
    this.errorMessage.set(null);
     this.Authservice.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.Tokenservice.saveAuthres(res)
        const returnUrl = this.actvroute.snapshot.queryParamMap.get('returnUrl') ?? '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Invalid email or password.');
      },
      complete: () => this.loading.set(false),
    });
  }

  gotosignup(): void {
    this.router.navigate(['/signup']);
  }
}
