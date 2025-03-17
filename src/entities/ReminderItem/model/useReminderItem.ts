import { useCallback, useEffect, useMemo, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';

interface UseReminderItem {
  reminder: IReminderItem;
  onReorder: (reminders: IReminderItem[]) => void;
  onEdit: (reminder: IReminderItem) => void;
  onComplete: (id: string) => void;
  completedReminderIds?: string[];
}

export const useReminderItem = ({
  reminder,
  onReorder,
  onEdit,
  onComplete,
  completedReminderIds,
}: UseReminderItem) => {
  const handleSortNestedItems = useCallback(
    (reminders: IReminderItem[] | undefined) => {
      return reminders?.sort((a, b) => a.sortNumber - b.sortNumber);
    },
    [],
  );

  const [nestedItems, setNestedItems] = useState<IReminderItem[] | undefined>(
    handleSortNestedItems(reminder.nested),
  );

  const handleUpdateNestedItems = useCallback(
    (items: IReminderItem[]) => {
      setNestedItems(items);
      onReorder(items);
    },
    [onReorder],
  );

  useEffect(() => {
    const sorted = handleSortNestedItems(reminder.nested);
    setNestedItems(sorted);
  }, [handleSortNestedItems, reminder.nested]);

  const handleCompleteReminder = useCallback(
    (id: string) => {
      onComplete(id);
    },
    [onComplete],
  );

  const handleEditReminder = useCallback(
    (reminder: IReminderItem) => {
      onEdit(reminder);
    },
    [onEdit],
  );

  const isReminderCompleted = useMemo(() => {
    // if (!completedReminderIds || !reminder.id) {
    //   return false;
    // }
    //
    // return completedReminderIds.includes(reminder.id);
    return false;
  }, [completedReminderIds, reminder.id]);

  useEffect(() => {
    // handleUpdateNestedItems(reminder.nested ?? []);
  }, [handleUpdateNestedItems, reminder.nested]);

  return {
    nestedItems,
    handleUpdateNestedItems,
    handleCompleteReminder,
    handleEditReminder,
    isReminderCompleted,
  };
};
