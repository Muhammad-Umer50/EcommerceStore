import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Navbar } from './Components/navbar/navbar';
import { TokenService } from './AuthServices/token-service';
import { Footer } from "./Components/footer/footer";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ECommerceStore');

}
