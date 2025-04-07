import dayjs from 'dayjs/esm';

export interface IPost {
  id: number;
  title?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  authorName?: string | null;
  publishDate?: dayjs.Dayjs | null;
  category?: string | null;
}

export type NewPost = Omit<IPost, 'id'> & { id: null };
