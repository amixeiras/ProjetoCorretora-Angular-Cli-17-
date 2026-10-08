import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalAlertComponent } from './shared/feedback/global-alert/global-alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GlobalAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
