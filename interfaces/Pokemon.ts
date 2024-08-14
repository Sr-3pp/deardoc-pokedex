export interface Pokemon {
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
}
