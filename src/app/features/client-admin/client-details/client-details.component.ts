import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrokerBrand } from '../../../core/domain/insurance-broker';
import { InsuredPerson } from '../../../core/domain/insured-person';
import { InsuredManagementComponent } from '../../client-area/insured-management/insured-management.component';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule, InsuredManagementComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent {
  @Input({ required: true }) client!: InsuredPerson;
  @Input({ required: true }) broker!: BrokerBrand;
  @Output() closed = new EventEmitter<void>();

}
