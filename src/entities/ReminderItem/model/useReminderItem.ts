import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';

export const useReminderItem = (
  isCompleted: boolean,
  level: number,
  onEdit: (reminder: IReminderItem) => void,
  onAdd?: () => void,
) => {
  const [isReminderCompleted, setIsReminderCompleted] =
    useState<boolean>(isCompleted);

  const paddingLeft = useMemo(() => {
    if (level === 1) {
      return 12;
    }

    return 36 * (level - 1);
  }, [level]);

  const handleCompleteReminder = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsReminderCompleted(event.target.checked);
    },
    [setIsReminderCompleted],
  );

  const handleEditReminder = useCallback(
    (reminder: IReminderItem) => {
      onEdit(reminder);
    },
    [onEdit],
  );

  const handleAddReminder = useCallback(() => {
    if (onAdd) {
      onAdd();
    }
  }, [onAdd]);

  const defineColorOfBorder = useMemo(() => {
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

  return {
    isReminderCompleted,
    handleCompleteReminder,
    paddingLeft,
    handleEditReminder,
    defineColorOfBorder,
    handleAddReminder,
  };
};
