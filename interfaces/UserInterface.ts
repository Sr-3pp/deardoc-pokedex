export interface UserInterface {
  [key: string]: string | number | { type: any; unique: boolean } | unknown;
  _id?: string;
  email: string | { type: StringConstructor; unique: true };
  password?: string | { type: StringConstructor; bcrypt: true; select: false };
  favorites: string[];
  save: () => Promise<void>;
}
