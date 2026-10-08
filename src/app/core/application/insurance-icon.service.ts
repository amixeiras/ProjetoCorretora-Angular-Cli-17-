import { Injectable } from '@angular/core';
import { InsuranceIconOption } from '../domain/insurance-icon';
import { INSURANCE_ICON_MOCKS } from '../infrastructure/mocks/insurance-icon.mock';

@Injectable({ providedIn: 'root' })
export class InsuranceIconService {
  private readonly icons = [...INSURANCE_ICON_MOCKS];

  list(): InsuranceIconOption[] { return this.icons; }
  save(icon: InsuranceIconOption): void { this.icons.push(icon); }
  nextId(): number { return Math.max(0, ...this.icons.map(icon => icon.id)) + 1; }
  remove(id: number): void {
    const index = this.icons.findIndex(icon => icon.id === id);
    if (index >= 0) this.icons.splice(index, 1);
  }
}
