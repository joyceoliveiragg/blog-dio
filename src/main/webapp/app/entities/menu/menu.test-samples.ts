import { IMenu, NewMenu } from './menu.model';

export const sampleWithRequiredData: IMenu = {
  id: 26476,
};

export const sampleWithPartialData: IMenu = {
  id: 15461,
  title: 'because conceal substantiate',
};

export const sampleWithFullData: IMenu = {
  id: 277,
  title: 'wilt honesty',
};

export const sampleWithNewData: NewMenu = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
