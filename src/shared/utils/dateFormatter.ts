export const dateFormatter = (date: string) => {
  return new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};
