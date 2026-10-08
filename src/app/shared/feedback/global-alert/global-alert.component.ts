import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/application/notification.service';

@Component({
  selector: 'app-global-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './global-alert.component.html',
  styleUrl: './global-alert.component.scss'
})
export class GlobalAlertComponent {
  readonly notifications = inject(NotificationService);
}
