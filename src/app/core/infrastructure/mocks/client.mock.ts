import { InsuredPerson } from '../../domain/insured-person';

export const CLIENT_MOCKS: InsuredPerson[] = [
  {
    id: 1001, brokerId: 1, name: 'João Silva', cnpj: '12.345.678/0001-00', birthDate: '14/08/1986',
    email: 'joao.silva@email.com', login: 'joao.silva@email.com', password: '123456', phone: '(71) 98765-4321', address: 'Av. Oceânica, 120',
    neighborhood: 'Barra', city: 'Salvador', state: 'BA', insurance: 'Seguro Auto', status: 'Ativo'
  },
  {
    id: 1002, brokerId: 1, name: 'Maria Souza', cnpj: '98.765.432/0001-11', birthDate: '22/03/1989',
    email: 'maria.souza@email.com', login: 'maria.souza@email.com', password: '123456', phone: '(71) 91234-5678', address: 'Rua das Flores, 45',
    neighborhood: 'Pituba', city: 'Salvador', state: 'BA', insurance: 'Seguro Vida', status: 'Pendente'
  },
  {
    id: 1003, brokerId: 1, name: 'Carlos Pereira', cnpj: '45.678.912/0001-22', birthDate: '11/12/1981',
    email: 'carlos.pereira@email.com', login: 'carlos.pereira@email.com', password: '123456', phone: '(71) 97777-6666', address: 'Rua Chile, 80',
    neighborhood: 'Centro', city: 'Salvador', state: 'BA', insurance: 'Seguro Saúde', status: 'Ativo'
  },
  {
    id: 1004, brokerId: 2, name: 'Ana Oliveira', cnpj: '32.165.498/0001-33', birthDate: '07/06/1992',
    email: 'ana.oliveira@email.com', login: 'ana.oliveira@email.com', password: '123456', phone: '(71) 96666-5555', address: 'Alameda dos Jardins, 210',
    neighborhood: 'Caminho das Árvores', city: 'Salvador', state: 'BA', insurance: 'Seguro Residencial', status: 'Ativo'
  },
  {
    id: 1005, brokerId: 2, name: 'Pedro Santos', cnpj: '65.432.198/0001-44', birthDate: '19/01/1978',
    email: 'pedro.santos@email.com', login: 'pedro.santos@email.com', password: '123456', phone: '(71) 95555-4444', address: 'Rua do Sol, 18',
    neighborhood: 'Rio Vermelho', city: 'Salvador', state: 'BA', insurance: 'Seguro Vida', status: 'Pendente'
  },
  {
    id: 1006, brokerId: 2, name: 'Fernanda Costa', cnpj: '78.912.345/0001-55', birthDate: '30/10/1995',
    email: 'fernanda.costa@email.com', login: 'fernanda.costa@email.com', password: '123456', phone: '(71) 94444-3333', address: 'Av. Sete de Setembro, 900',
    neighborhood: 'Campo Grande', city: 'Salvador', state: 'BA', insurance: 'Seguro Viagem', status: 'Ativo'
  }
];