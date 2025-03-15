export const createID = (): string => {
  return `${(+new Date()).toString(16)}_${Math.round(10000 * Math.random())}`;
};
