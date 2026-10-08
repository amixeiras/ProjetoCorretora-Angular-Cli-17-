export interface InsuredPerson {
  id: number;
  brokerId: number;
  name: string;
  cnpj: string;
  birthDate: string;
  email: string;
  login: string;
  password: string;
  phone: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  insurance: string;
  status: 'Ativo' | 'Pendente' | 'Em análise';
}

export interface InsuredRecord {
  id: number;
  clientId: number;
  name: string;
  sex: string;
  document: string;
  cnpj: string;
  birthDate: string;
  capital: string;
  role: string;
  registration: string;
  movement: string;
  email: string;
  products: string;
  lastRequest: string;
  status: 'Ativo' | 'Pendente';
}

export interface InsuranceRequest {
  id: number;
  type: string;
  description: string;
  createdAt: string;
  status: 'Em análise' | 'Respondida' | 'Concluída';
}

export interface InsuredFile {
  id: number;
  insuredId: number;
  fileName: string;
  fileType: string;
  uploadedAt: string;
}
