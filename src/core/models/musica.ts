import { Pessoa } from "./pessoa";

export interface Musica {
  musicaId?: number;
  nomeMusica: string;
  cantorMusica?: string | null;

  cantores?: Pessoa[]
}
