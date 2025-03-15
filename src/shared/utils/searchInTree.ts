interface Item<T> {
  [key: string]: unknown;
  nested?: T[];
}

export const searchInTree = <T extends Item<T>>(
  tree: T | T[],
  prop: string,
  value: number | string | boolean,
): T | null => {
  let result: T | null = null;
  const preparedTree = Array.isArray(tree) ? tree : [tree];

  for (const item of preparedTree) {
    if (item[prop] === value) {
      return item;
    }

    if (item.nested?.length) {
      for (let i = 0; result === null && i < item.nested.length; i++) {
        result = searchInTree<T>(item.nested[i], prop, value);
      }

      return result;
    }
  }

  return null;
};
