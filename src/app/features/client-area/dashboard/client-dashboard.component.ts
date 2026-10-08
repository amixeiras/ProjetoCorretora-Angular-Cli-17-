import { Component } from '@angular/core';
import { InsuredManagementComponent } from '../insured-management/insured-management.component';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [InsuredManagementComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent {}

