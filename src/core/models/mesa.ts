import { Musica } from "./musica";
import { Pessoa } from "./pessoa";

export interface Mesa {
  mesaId?: number;
  nome?: string;

  participantesMesa?: Pessoa[];
  lstMusicas?: Musica[];
}
