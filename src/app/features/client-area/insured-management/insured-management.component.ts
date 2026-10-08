import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientDataService } from '../../../core/application/client-data.service';
import { BrokerBrand } from '../../../core/domain/insurance-broker';
import { InsuredRecord } from '../../../core/domain/insured-person';
import { NotificationService } from '../../../core/application/notification.service';
import { InsuredFilesComponent } from '../insured-files/insured-files.component';
import { InsuredFilesReadonlyComponent } from '../insured-files-readonly/insured-files-readonly.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({ selector: 'app-insured-management', standalone: true, imports: [CommonModule, ReactiveFormsModule, InsuredFilesComponent, InsuredFilesReadonlyComponent], templateUrl: './insured-management.component.html', styleUrl: './insured-management.component.scss' })
export class InsuredManagementComponent implements OnChanges {
  @Input() clientId: number | null = null;
  @Input() broker: BrokerBrand | null = null;
  readonly data = inject(ClientDataService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly notifications = inject(NotificationService);
  private readonly formBuilder = inject(FormBuilder);
  currentStep = 1;
  saved = false;
  formVisible = false;
  readOnly = false;
  editingIndex: number | null = null;
  records: InsuredRecord[] = this.data.listInsuredForLoggedClient();
  readonly pageSizeOptions = [25, 50, 100, 150];
  pageSize = 25;
  currentPage = 1;
  filesPopupVisible = false;
  selectedInsured: InsuredRecord | null = null;
  readonly insuredForm = this.formBuilder.nonNullable.group({
    id: [0, Validators.required], name: ['', Validators.required], sex: ['', Validators.required], document: ['', Validators.required],
    birthDate: ['', Validators.required], capital: ['', Validators.required], role: ['', Validators.required],
    registration: ['', Validators.required], movement: ['IN', Validators.required]
  });

  constructor() {
    this.data.insuredRecordsUpdated$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(clientId => {
        if (clientId === (this.clientId ?? this.data.client.id)) this.loadRecords();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] || changes['broker']) this.loadRecords();
  }

  private loadRecords(): void {
    this.records = this.clientId !== null && this.broker
      ? this.data.listInsuredRecordsForClient(this.clientId, this.broker)
      : this.data.listInsuredForLoggedClient();
    this.currentPage = 1;
  }

  get paginatedRecords(): InsuredRecord[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.records.slice(start, start + this.pageSize);
  }

  get pageCount(): number { return Math.max(1, Math.ceil(this.records.length / this.pageSize)); }

  setPage(page: number): void {
    this.currentPage = Math.min(Math.max(page, 1), this.pageCount);
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  saveAndContinue(): void {
    this.saved = true;
    if (this.insuredForm.invalid) {
      this.insuredForm.markAllAsTouched();
      this.notifications.show('Preencha todos os campos obrigatórios para salvar os dados.', 'error');
      return;
    }
    const formValue = this.insuredForm.getRawValue();
    const selectedClientId = this.clientId ?? this.data.client.id;
    const editingRecordId = this.editingIndex === null ? null : this.records[this.editingIndex]?.id ?? null;
    const editingRecord = editingRecordId === null
      ? undefined
      : this.records.find(item => item.id === editingRecordId && item.clientId === selectedClientId);
    const linkedClientId = selectedClientId;
    const linkedClient = this.data.getInsuredById(linkedClientId);
    const record: InsuredRecord = {
      ...editingRecord,
      ...formValue,
      id: editingRecord?.id ?? this.data.nextInsuredId(),
      clientId: selectedClientId,
      cnpj: editingRecord?.cnpj ?? linkedClient?.cnpj ?? 'Não informado',
      email: editingRecord?.email ?? (formValue.name ? `${formValue.name.toLowerCase().replace(/\s+/g, '.')}@email.com` : 'Não informado'),
      products: formValue.movement === 'EX' ? 'Nenhum' : editingRecord?.products ?? 'Não informado',
      lastRequest: editingRecord?.lastRequest ?? 'Não informado',
      status: editingRecord?.status ?? 'Ativo'
    };
    const selectedInsuredId = editingRecord?.id;
    if (selectedInsuredId === undefined) this.data.addInsuredRecord(selectedClientId, record);
    else this.data.updateInsuredRecord(selectedClientId, selectedInsuredId, record);
    this.formVisible = false;
    this.readOnly = false;
    this.selectedInsured = null;
    this.editingIndex = null;
    this.currentStep = 1;
    this.saved = false;
    this.notifications.success('Dados salvos com sucesso.');
  }

  editRecord(index: number): void {
    this.insuredForm.patchValue(this.records[index]);
    this.editingIndex = index;
    this.selectedInsured = this.records[index];
    this.formVisible = true;
    this.readOnly = false;
    this.currentStep = 1;
    this.saved = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  viewRecord(index: number): void {
    this.insuredForm.patchValue(this.records[index]);
    this.editingIndex = index;
    this.selectedInsured = this.records[index];
    this.formVisible = true;
    this.readOnly = true;
    this.currentStep = 1;
    this.saved = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addRecord(): void {
    this.insuredForm.reset({ id: Math.max(0, ...this.records.map(item => item.id)) + 1, name: '', sex: '', document: '', birthDate: '', capital: '', role: '', registration: '', movement: 'IN' });
    this.editingIndex = null;
    this.formVisible = true;
    this.readOnly = false;
    this.currentStep = 1;
    this.saved = false;
  }

  deleteRecord(index: number): void {
    const record = this.records[index];
    this.notifications.alert(`Deseja realmente excluir o segurado ${record.name} (ID ${record.id})?`, () => this.confirmDelete(record.id));
  }

  private confirmDelete(recordId: number): void {
    const record = this.records.find(item => item.id === recordId);
    if (!record) return;

    this.records = this.records.filter(item => item.id !== recordId);
    this.data.deleteInsuredRecord(record.clientId, recordId);
    if (this.editingIndex !== null && this.records[this.editingIndex]?.id === recordId) this.editingIndex = null;
    if (this.selectedInsured?.id === record.id) {
      this.selectedInsured = null;
      this.filesPopupVisible = false;
    }
  }

  openFiles(record: InsuredRecord): void {
    this.selectedInsured = record;
    this.filesPopupVisible = true;
  }

  closeFiles(): void { this.filesPopupVisible = false; }
}


