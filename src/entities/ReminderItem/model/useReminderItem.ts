import { useCallback, useEffect, useMemo, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { getAllReminderChildren } from '@/src/widgets/ReminderList/model/RemindersListMethods';

interface UseReminderItem {
  reminder: IReminderItem;
  onEdit: (reminder: IReminderItem) => void;
  onComplete: (id: string[]) => void;
  completedReminderIds?: string[];
  nested?: IReminderItem[];
}

export const useReminderItem = ({
  reminder,
  onEdit,
  onComplete,
  completedReminderIds,
  nested,
}: UseReminderItem) => {
  const [nestedItems, setNestedItems] = useState<IReminderItem[] | undefined>(
    nested,
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
    const allNestedCompleted = reminder.nested?.every((nested) => {
      return completedReminderIds?.some((id) => nested.id === id);
    });

    if (allNestedCompleted && !isReminderCompleted) {
      onComplete([reminder.id]);
    }
  }, [
    completedReminderIds,
    isReminderCompleted,
    onComplete,
    reminder.id,
    reminder.nested,
  ]);

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
