import { useMemo } from 'react';

export const useReminderItemStyles = (level: number, isPresent?: boolean) => {
  const paddingLeft = useMemo(() => {
    if (level === 1) {
      return 12;
    }

    return 36 * (level - 1);
  }, [level]);

  const borderColor = useMemo(() => {
    switch (level) {
      case 1:
        return 'border-indigo-300';
      case 2:
        return 'border-indigo-400';
      case 3:
        return 'border-indigo-500';
      case 4:
        return 'border-indigo-600';
      case 5:
        return 'border-indigo-700';
      default:
        return 'border-indigo-700';
    }
  }, [level]);

  const position = useMemo(() => {
    return isPresent ? 'static' : 'absolute';
  }, [isPresent]);

  return {
    paddingLeft,
    borderColor,
    position,
  };
};
