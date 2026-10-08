import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { InsuredFile, InsuredPerson, InsuredRecord, InsuranceRequest } from '../domain/insured-person';
import { BrokerBrand } from '../domain/insurance-broker';
import { CLIENT_MOCKS } from '../infrastructure/mocks/client.mock';
import { CLIENT_INSURED_MOCKS, persistClientInsuredMocks } from '../infrastructure/mocks/client-insured.mock';

@Injectable({ providedIn: 'root' })
export class ClientDataService {
  private loggedClientId = 1001;

  get client(): { id: number; name: string; role: string } {
    const loggedClient = this.getLoggedClient();
    return { id: loggedClient.id, name: loggedClient.name, role: 'Cliente' };
  }

  readonly insuredPeople: InsuredPerson[] = CLIENT_MOCKS;
  readonly insuredRecordsUpdated$ = new Subject<number>();
  get insuredRecords(): InsuredRecord[] { return Object.values(CLIENT_INSURED_MOCKS).flat(); }

  listInsuredForLoggedClient(): InsuredRecord[] {
    return (CLIENT_INSURED_MOCKS[this.client.id] ?? []).map(record => ({ ...record }));
  }

  listForBroker(broker: BrokerBrand): InsuredPerson[] {
    return this.insuredPeople.filter(person => person.brokerId === broker.id).map((person, index) => ({
      ...person,
      insurance: broker.products[index % broker.products.length]?.name ?? person.insurance
    }));
  }

  getLoggedClient(): InsuredPerson {
    return this.insuredPeople.find(person => person.id === this.loggedClientId) ?? this.insuredPeople[0];
  }

  setLoggedClient(clientId: number): void {
    if (this.insuredPeople.some(person => person.id === clientId)) this.loggedClientId = clientId;
  }

  getInsuredById(insuredId: number): InsuredPerson | undefined {
    return this.insuredPeople.find(person => person.id === insuredId);
  }

  listInsuredRecordsForBroker(broker: BrokerBrand): InsuredRecord[] {
    return this.insuredRecords.map((record, index) => ({
      ...record,
      products: broker.products[index % broker.products.length]?.name ?? record.products
    }));
  }

  listInsuredRecordsForClient(clientId: number, broker: BrokerBrand): InsuredRecord[] {
    return (CLIENT_INSURED_MOCKS[clientId] ?? [])
      .map((record, index) => ({
        ...record,
        products: broker.products[index % broker.products.length]?.name ?? record.products
      }));
  }

  nextInsuredId(): number {
    return Math.max(0, ...this.insuredRecords.map(record => record.id)) + 1;
  }

  addInsuredRecord(clientId: number, record: InsuredRecord): void {
    const records = CLIENT_INSURED_MOCKS[clientId] ?? (CLIENT_INSURED_MOCKS[clientId] = []);
    records.push({ ...record, clientId });
    persistClientInsuredMocks();
    this.insuredRecordsUpdated$.next(clientId);
  }

  updateInsuredRecord(clientId: number, insuredId: number, record: InsuredRecord): void {
    const records = CLIENT_INSURED_MOCKS[clientId] ?? (CLIENT_INSURED_MOCKS[clientId] = []);
    const index = records.findIndex(item => item.id === insuredId);
    if (index < 0) return;
    records[index] = { ...record, id: insuredId, clientId };
    persistClientInsuredMocks();
    this.insuredRecordsUpdated$.next(clientId);
  }

  deleteInsuredRecord(clientId: number, recordId: number): void {
    const records = CLIENT_INSURED_MOCKS[clientId];
    if (!records) return;
    CLIENT_INSURED_MOCKS[clientId] = records.filter(record => record.id !== recordId);
    persistClientInsuredMocks();
    this.insuredRecordsUpdated$.next(clientId);
  }

  readonly requests: InsuranceRequest[] = [
    { id: 1, type: 'Seguro Auto', description: 'Solicitação de segunda via da apólice', createdAt: '18/09/2026', status: 'Em análise' },
    { id: 2, type: 'Seguro Vida', description: 'Atualização de beneficiários', createdAt: '11/09/2026', status: 'Respondida' },
    { id: 3, type: 'Seguro Residencial', description: 'Envio de documentos do imóvel', createdAt: '28/08/2026', status: 'Concluída' }
  ];

  getFilesByInsuredId(insuredId: number): InsuredFile[] {
    return [
      { id: 1, insuredId, fileName: 'documento-identidade.pdf', fileType: 'PDF', uploadedAt: '10/05/2026' },
      { id: 2, insuredId, fileName: 'comprovante-residencia.pdf', fileType: 'PDF', uploadedAt: '10/05/2026' },
      { id: 3, insuredId, fileName: 'proposta-seguro.pdf', fileType: 'PDF', uploadedAt: '11/05/2026' },
      { id: 4, insuredId, fileName: 'foto-documento.jpg', fileType: 'JPG', uploadedAt: '11/05/2026' },
      { id: 5, insuredId, fileName: 'declaracao-saude.pdf', fileType: 'PDF', uploadedAt: '12/05/2026' },
      { id: 6, insuredId, fileName: 'contrato-assinado.pdf', fileType: 'PDF', uploadedAt: '13/05/2026' }
    ];
  }
}
