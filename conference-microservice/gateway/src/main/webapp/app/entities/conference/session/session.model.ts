import * as dayjs from 'dayjs';
import { ISpeaker } from 'app/entities/conference/speaker/speaker.model';

export interface ISession {
  id?: number;
  title?: string;
  descriptionContentType?: string;
  description?: string;
  startDateTime?: dayjs.Dayjs;
  endDateTime?: dayjs.Dayjs;
  speakers?: ISpeaker[] | null;
}

export class Session implements ISession {
  constructor(
    public id?: number,
    public title?: string,
    public descriptionContentType?: string,
    public description?: string,
    public startDateTime?: dayjs.Dayjs,
    public endDateTime?: dayjs.Dayjs,
    public speakers?: ISpeaker[] | null
  ) {}
}
