import { useCallback, useMemo, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';

export const useReminderItem = (
  id: string,
  onEdit: (reminder: IReminderItem) => void,
  onComplete: (id: string) => void,
  completedReminderIds: string[],
  nested?: IReminderItem[],
) => {
  const [nestedItems, setNestedItems] = useState<IReminderItem[] | undefined>(
    nested,
  );

  const handleUpdateNestedItems = useCallback((items: IReminderItem[]) => {
    setNestedItems(items);
  }, []);

  const handleCompleteReminder = useCallback(() => {
    if (nestedItems?.length) {
    }
    onComplete(id);
  }, [id, nestedItems, onComplete]);

  const handleEditReminder = useCallback(
    (reminder: IReminderItem) => {
      onEdit(reminder);
    },
    [onEdit],
  );

  const isReminderCompleted = useMemo(() => {
    if (!completedReminderIds || !id) {
      return false;
    }

    return completedReminderIds.includes(id);
  }, [completedReminderIds, id]);

  return {
    nestedItems,
    handleUpdateNestedItems,
    handleCompleteReminder,
    handleEditReminder,
    isReminderCompleted,
  };
};
