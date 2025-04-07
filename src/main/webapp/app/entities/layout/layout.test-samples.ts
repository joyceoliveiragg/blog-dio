import { ILayout, NewLayout } from './layout.model';

export const sampleWithRequiredData: ILayout = {
  id: 19857,
};

export const sampleWithPartialData: ILayout = {
  id: 28967,
};

export const sampleWithFullData: ILayout = {
  id: 7311,
};

export const sampleWithNewData: NewLayout = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
