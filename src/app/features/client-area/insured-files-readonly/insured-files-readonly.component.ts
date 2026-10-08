import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ClientDataService } from '../../../core/application/client-data.service';
import { InsuredFile } from '../../../core/domain/insured-person';

@Component({
  selector: 'app-insured-files-readonly',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insured-files-readonly.component.html',
  styleUrl: './insured-files-readonly.component.scss'
})
export class InsuredFilesReadonlyComponent implements OnInit {
  @Input({ required: true }) insuredId = 0;
  @Input({ required: true }) insuredName = '';
  @Output() closed = new EventEmitter<void>();

  private readonly clientData = inject(ClientDataService);
  readonly filePageSize = 5;
  filePage = 1;
  fileRecords: InsuredFile[] = [];

  ngOnInit(): void {
    this.fileRecords = this.clientData.getFilesByInsuredId(this.insuredId);
    window.dispatchEvent(new CustomEvent('insured-files-requested', { detail: { insuredId: this.insuredId } }));
  }

  close(): void { this.closed.emit(); }

  get visibleFiles(): InsuredFile[] {
    const start = (this.filePage - 1) * this.filePageSize;
    return this.fileRecords.slice(start, start + this.filePageSize);
  }

  get filePageCount(): number { return Math.max(1, Math.ceil(this.fileRecords.length / this.filePageSize)); }

  setFilePage(page: number): void {
    this.filePage = Math.min(Math.max(page, 1), this.filePageCount);
  }
}
