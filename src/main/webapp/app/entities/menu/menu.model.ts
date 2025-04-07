export interface IMenu {
  id: number;
  title?: string | null;
}

export type NewMenu = Omit<IMenu, 'id'> & { id: null };
