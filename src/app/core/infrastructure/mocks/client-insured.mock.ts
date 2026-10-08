import { InsuredRecord } from '../../domain/insured-person';
import { INSURED_RECORD_MOCKS } from './insured-record.mock';

const STORAGE_KEY = 'corretora-client-insured-mocks';

function createInitialRecords(): Record<number, InsuredRecord[]> {
  return INSURED_RECORD_MOCKS.reduce(
    (recordsByClient, record) => {
      recordsByClient[record.clientId] ??= [];
      recordsByClient[record.clientId].push({ ...record });
      return recordsByClient;
    },
    {} as Record<number, InsuredRecord[]>
  );
}

function loadRecords(): Record<number, InsuredRecord[]> {
  try {
    const storedRecords = localStorage.getItem(STORAGE_KEY);
    if (storedRecords) return JSON.parse(storedRecords) as Record<number, InsuredRecord[]>;
  } catch {
    // Use the initial mock when storage is unavailable or invalid.
  }
  return createInitialRecords();
}

export const CLIENT_INSURED_MOCKS: Record<number, InsuredRecord[]> = loadRecords();

export function persistClientInsuredMocks(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(CLIENT_INSURED_MOCKS));
  } catch {
    // Keep the in-memory mock when storage is unavailable.
  }
}
