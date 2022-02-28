import { Collection } from './collection.ts';

function add<T>(collection: Collection, value: T): void {
  const items = list<T>(collection);

  const newItems = [...items, value];

  localStorage.setItem(collection, JSON.stringify(newItems));
}

function list<T>(collection: Collection): T[] {
  const itemsFromStorage = localStorage.getItem(collection);

  const items = itemsFromStorage ? JSON.parse(itemsFromStorage) : [];

  return items;
}

function deleteAll(collection: Collection): void {
  localStorage.removeItem(collection);
}

function deleteBy<T>(collection: Collection, key: string, value: any): void {
  const items = list(collection) as T[];

  const filteredItems = items.filter((item: any) => item[key] !== value);

  localStorage.setItem(collection, JSON.stringify(filteredItems));
}

function getBy<T>(
  collection: Collection,
  key: string,
  value: string,
): T | null {
  const items = list<T>(collection) as any[];

  for (const item of items) {
    if (item[key]?.toLowerCase() === value?.toLowerCase()) {
      return item as T;
    }
  }

  return null;
}

function update<T>(collection: Collection, id: string, content: any): void {
  const item = getBy<T>(collection, 'id', id);

  if (!item) return;

  const items = list(collection) as T[];
  const filteredItems = items.filter((item: any) => item.id !== id);

  const updatedItems = [...filteredItems, content];

  localStorage.setItem(collection, JSON.stringify(updatedItems));
}

export const LocalStorage = {
  add,
  list,
  deleteAll,
  getBy,
  deleteBy,
  update,
};
