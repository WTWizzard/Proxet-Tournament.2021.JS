export interface Teams {
  team1: string[];
  team2: string[];
}

export type Player = {
  name: string;
  vehicleType: number;
  waitTime: number;
};

export interface PlayerArr {
  type1: Player[];
  type2: Player[];
  type3: Player[];
}
