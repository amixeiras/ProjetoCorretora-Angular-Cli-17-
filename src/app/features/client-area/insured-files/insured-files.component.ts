import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ClientDataService } from '../../../core/application/client-data.service';
import { InsuredFile } from '../../../core/domain/insured-person';

@Component({
  selector: 'app-insured-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insured-files.component.html',
  styleUrl: './insured-files.component.scss'
})
export class InsuredFilesComponent implements OnInit {
  @Input({ required: true }) insuredId = 0;
  @Input({ required: true }) insuredName = '';
    @Input() readOnly = false;
  @Output() closed = new EventEmitter<void>();

  private readonly clientData = inject(ClientDataService);
  readonly filePageSize = 5;
  filePage = 1;
  selectedFileName = '';
  fileRecords: InsuredFile[] = [];

  ngOnInit(): void {
    this.fileRecords = this.clientData.getFilesByInsuredId(this.insuredId);
    window.dispatchEvent(new CustomEvent('insured-files-requested', { detail: { insuredId: this.insuredId } }));
  }

  close(): void { this.closed.emit(); }

  selectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFileName = input.files?.[0]?.name ?? '';
  }

  includeFile(): void {
    if (!this.selectedFileName) return;
    this.fileRecords = [...this.fileRecords, {
      id: Math.max(0, ...this.fileRecords.map(file => file.id)) + 1,
      insuredId: this.insuredId,
      fileName: this.selectedFileName,
      fileType: this.selectedFileName.split('.').pop()?.toUpperCase() ?? 'ARQ',
      uploadedAt: new Date().toLocaleDateString('pt-BR')
    }];
    this.selectedFileName = '';
  }

  deleteFile(fileIndex: number): void {
    const file = this.visibleFiles[fileIndex];
    if (!file || !window.confirm(`Deseja realmente excluir o arquivo ${file.fileName}?`)) return;
    const absoluteIndex = (this.filePage - 1) * this.filePageSize + fileIndex;
    this.fileRecords = this.fileRecords.filter((_, index) => index !== absoluteIndex);
    this.setFilePage(this.filePage);
  }

  get visibleFiles(): InsuredFile[] {
    const start = (this.filePage - 1) * this.filePageSize;
    return this.fileRecords.slice(start, start + this.filePageSize);
  }

  get filePageCount(): number { return Math.max(1, Math.ceil(this.fileRecords.length / this.filePageSize)); }
  setFilePage(page: number): void { this.filePage = Math.min(Math.max(page, 1), this.filePageCount); }
}
