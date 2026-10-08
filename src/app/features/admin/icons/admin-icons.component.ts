import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InsuranceIconService } from '../../../core/application/insurance-icon.service';
import { InsuranceIconOption } from '../../../core/domain/insurance-icon';

@Component({ selector: 'app-admin-icons', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './admin-icons.component.html', styleUrl: './admin-icons.component.scss' })
export class AdminIconsComponent {
  private readonly iconService = inject(InsuranceIconService);
  icons: InsuranceIconOption[] = this.iconService.list();
  name = '';
  fileName = '';
  imageUrl = '';
  error = '';

  selectFile(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = () => { this.imageUrl = String(reader.result); };
    reader.readAsDataURL(file);
  }

  include(): void {
    if (!this.name.trim() || !this.imageUrl) { this.error = 'Informe o nome e selecione um arquivo.'; return; }
    const id = this.iconService.nextId();
    this.iconService.save({ id, value: String(id), label: this.name.trim(), symbol: '▣', imageUrl: this.imageUrl });
    this.icons = this.iconService.list(); this.name = ''; this.fileName = ''; this.imageUrl = ''; this.error = '';
  }

  remove(icon: InsuranceIconOption): void { if (window.confirm(`Excluir o ícone ${icon.label}?`)) { this.iconService.remove(icon.id); this.icons = this.iconService.list(); } }
}
