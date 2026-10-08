import { CLIENT_MOCKS } from './client.mock';
import { InsuredRecord } from '../../domain/insured-person';

const products = ['Auto, Residencial', 'Vida', 'Saúde, Viagem', 'Auto', 'Residencial, Vida'];
const roles = ['Analista', 'Gerente', 'Professor', 'Empresário', 'Assistente'];

export const INSURED_RECORD_MOCKS: InsuredRecord[] = Array.from({ length: 50 }, (_, index) => {
  const client = CLIENT_MOCKS[index % CLIENT_MOCKS.length];
  const firstName = client.name.toLowerCase().split(' ')[0];
  return {
    id: index + 1,
    clientId: client.id,
    name: client.name,
    sex: index % 2 === 0 ? 'Masculino' : 'Feminino',
    document: `${98765432100 + index}`.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    cnpj: client.cnpj,
    birthDate: `${String((index % 27) + 1).padStart(2, '0')}/${String((index % 12) + 1).padStart(2, '0')}/19${80 + (index % 20)}`,
    capital: `R$ ${(50000 + index * 2500).toLocaleString('pt-BR')}`,
    role: roles[index % roles.length],
    registration: `MAT-${String(2300 + index)}`,
    movement: 'IN - Inclusão',
    email: `${firstName}.${index + 1}@email.com`,
    products: products[index % products.length],
    lastRequest: `${String((index % 27) + 1).padStart(2, '0')}/05/2026`,
    status: index % 4 === 1 ? 'Pendente' : 'Ativo'
  };
});