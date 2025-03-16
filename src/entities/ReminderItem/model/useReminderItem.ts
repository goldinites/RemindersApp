import { ChangeEvent, useCallback, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';

export const useReminderItem = (
  isCompleted: boolean,
  onEdit: (reminder: IReminderItem) => void,
  nested?: IReminderItem[],
) => {
  const [isReminderCompleted, setIsReminderCompleted] =
    useState<boolean>(isCompleted);

  const [nestedItems, setNestedItems] = useState<IReminderItem[] | undefined>(
    nested,
  );

  const handleUpdateNestedItems = useCallback((items: IReminderItem[]) => {
    setNestedItems(items);
  }, []);

  const handleCompleteReminder = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsReminderCompleted(event.target.checked);
    },
    [],
  );

  const handleEditReminder = useCallback(
    (reminder: IReminderItem) => {
      onEdit(reminder);
    },
    [onEdit],
  );

  return {
    nestedItems,
    handleUpdateNestedItems,
    isReminderCompleted,
    handleCompleteReminder,
    handleEditReminder,
  };
};
