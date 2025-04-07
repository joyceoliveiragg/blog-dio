export interface ILayout {
  id: number;
}

export type NewLayout = Omit<ILayout, 'id'> & { id: null };
