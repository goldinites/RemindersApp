interface Item<T> {
  id: string;
  parentId: string | null;
  nested?: T[];
}

export const flatToTree = <T extends Item<T>>(list: T[]): T[] => {
  const copiedList: T[] = JSON.parse(JSON.stringify(list));

  return copiedList
    .reduce((acc: T[], item) => {
      const nested = copiedList.filter((i) => i.parentId === item.id);

      if (nested.length) {
        item.nested = nested;
      }

      acc.push(item);

      return acc;
    }, [])
    .filter((item: T) => !item.parentId);
};
