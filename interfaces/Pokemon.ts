export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      showdown: {
        front_default: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
  height: number;
}
