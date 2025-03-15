import { useCallback, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { ReminderUpdates } from '@/src/features/ReminderEditor/model/ReminderEditor.models';
import { flatten } from '@/src/shared/utils/flatten';
import { flatToTree } from '@/src/shared/utils/flatToTree';

export const useReminderList = (list: IReminderItem[]) => {
  const [reminders, setReminders] = useState(list);
  const [editReminder, setEditReminder] = useState<IReminderItem | null>(null);

  const handleUpdateReminder = useCallback((updates: ReminderUpdates) => {
    setReminders((prevState) => {
      const reminders = flatten(prevState);

      let result: IReminderItem[] = reminders.map((reminder) => {
        if (reminder.id === updates.id) {
          return { ...reminder, title: updates.title, text: updates.text };
        }

        return reminder;
      });

      result = flatToTree(result);
      return result;
    });

    setEditReminder(null);
  }, []);

  const handleDeleteReminder = useCallback((id: string) => {
    setReminders((prevState) => {
      const reminders = flatten(prevState);

      let result: IReminderItem[] = reminders.filter(
        (reminder) => reminder.id !== id,
      );

      result = flatToTree(result);

      return result;
    });

    setEditReminder(null);
  }, []);

  const handleSetEditReminder = useCallback((value: IReminderItem | null) => {
    setEditReminder(value);
  }, []);

  return {
    reminders,
    editReminder,
    handleUpdateReminder,
    handleDeleteReminder,
    handleSetEditReminder,
  };
};
