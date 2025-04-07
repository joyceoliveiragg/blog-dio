import dayjs from 'dayjs/esm';

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  id: 8730,
  title: 'lawful above unless',
  description: 'save',
};

export const sampleWithPartialData: IPost = {
  id: 8720,
  title: 'trick ugh',
  description: 'vivaciously including replicate',
  publishDate: dayjs('2025-04-06T14:39'),
};

export const sampleWithFullData: IPost = {
  id: 9917,
  title: 'clearly darn icy',
  description: 'wide recount',
  imageUrl: 'outrank',
  authorName: 'strategy knottily yuck',
  publishDate: dayjs('2025-04-06T11:02'),
  category: 'tectonics scram',
};

export const sampleWithNewData: NewPost = {
  title: 'willfully settler',
  description: 'consequently',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
