import { Mesa } from "./mesa";
import { Musica } from "./musica";

export interface Pessoa {
  pessoaId?: number;
  nomePessoa: string;
  cpfPessoa: string;
  qtdVezCantada: number | null;

  mesa?: Mesa;             // FK mesa_pessoa_id
  musicas?: Musica[];      // via musica_cantores
}
