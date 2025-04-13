export interface Animal {
  id?: number;
  nome: string;
  descricao: string;
  dataNascimento: string;
  especie: string;
  habitat: string;
  pais_origem: string;
  cuidados?: number[]; // IDs dos cuidados relacionados
}

export interface Care {
  id?: number;
  nome: string;
  descricao: string;
  frequencia: string;
  animais?: number[]; // IDs dos animais aos quais o cuidado se aplica
}
