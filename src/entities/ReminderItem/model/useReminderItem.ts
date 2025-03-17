import { useCallback, useEffect, useMemo, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { getAllReminderChildren } from '@/src/widgets/ReminderList/model/RemindersListMethods';

interface UseReminderItem {
  reminder: IReminderItem;
  onEdit: (reminder: IReminderItem) => void;
  onComplete: (id: string[]) => void;
  completedReminderIds?: string[];
}

export const useReminderItem = ({
  reminder,
  onEdit,
  onComplete,
  completedReminderIds,
}: UseReminderItem) => {
  const [nestedItems, setNestedItems] = useState<IReminderItem[] | undefined>(
    reminder.nested,
  );

  const handleUpdateNestedItems = useCallback((items: IReminderItem[]) => {
    setNestedItems(items);
  }, []);

  const handleCompleteReminder = useCallback(() => {
    let result = [reminder.id];

    if (reminder?.nested) {
      result = [
        ...result,
        ...getAllReminderChildren(reminder).map((item) => item.id),
      ];
    }

    onComplete(result);
  }, [reminder, onComplete]);

  const handleEditReminder = useCallback(
    (reminder: IReminderItem) => {
      onEdit(reminder);
    },
    [onEdit],
  );

  const isReminderCompleted = useMemo(() => {
    if (!completedReminderIds || !reminder.id) {
      return false;
    }

    return completedReminderIds.includes(reminder.id);
  }, [completedReminderIds, reminder.id]);

  useEffect(() => {
    handleUpdateNestedItems(reminder.nested ?? []);
  }, [handleUpdateNestedItems, reminder.nested]);

  return {
    nestedItems,
    handleUpdateNestedItems,
    handleCompleteReminder,
    handleEditReminder,
    isReminderCompleted,
  };
};
