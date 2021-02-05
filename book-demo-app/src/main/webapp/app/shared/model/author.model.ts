import { Moment } from 'moment';

export interface IAuthor {
  id?: number;
  fname?: string;
  lname?: string;
  email?: string;
  birthDate?: Moment;
}

export class Author implements IAuthor {
  constructor(public id?: number, public fname?: string, public lname?: string, public email?: string, public birthDate?: Moment) {}
}
