interface Item<T> {
  nested?: T[];
}

export const flatten = <T extends Item<T>>(list: T[]): T[] => {
  function getChildren(list: T[]): T[] {
    let result: T[] = [];
    const copiedList: T[] = JSON.parse(JSON.stringify(list));

    for (const item of copiedList) {
      result = [...result, item];

      if (item.nested?.length) {
        result = [...result, ...getChildren(item.nested)];
      }

      delete item?.nested;
    }

    return result;
  }

  const copiedList: T[] = JSON.parse(JSON.stringify(list));

  return getChildren(copiedList);
};
