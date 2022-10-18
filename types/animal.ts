export interface Animal {
  description: string;
  gender: string;
  name: string;
  race: string;
  type: string;
}

export interface AnimalMongo extends Animal {
  _id: string;
}
