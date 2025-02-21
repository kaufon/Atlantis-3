import { Address, Cellphone, Client, Document, documentType } from "../core";

let cliente = new Client({
  name: "Pedro de Alcântara João Carlos Leopoldo Salvador",
  socialName: "Dom Pedro II",
  birthDate: new Date(1825, 11, 2),
  registrationDate: new Date(1840, 6, 23),
  cellphones: [new Cellphone({ ddd: "21", number: "99999-9999" })],
  address: new Address({
    street: "R. do Catete",
    neighborhood: "Copacabana",
    city: "Rio de Janeiro",
    state: "Rio de Janeiro",
    postalCode: "22220-000",
  }),
  documents: [
    new Document({
      number: "123456789",
      type: documentType.RG,
      expeditionDate: new Date(1835, 5, 10),
    }),
  ],
  dependents: [],
});

let dependente = new Client({
  name: "Isabel Cristina Leopoldina Augusta Micaela",
  socialName: "Princesa Isabel",
  birthDate: new Date(1846, 6, 29),
  registrationDate: new Date(1921, 10, 14),
  cellphones: [new Cellphone({ ddd: "21", number: "98888-8888" })],
  address: cliente.address.clone() as Address,
  documents: [
    new Document({
      number: "987654321",
      type: documentType.RG,
      expeditionDate: new Date(1860, 3, 15),
    }),
  ],
  guardian: cliente,
  dependents: [],
});

cliente.addDependent(dependente);

console.log(cliente);
console.log(dependente);
