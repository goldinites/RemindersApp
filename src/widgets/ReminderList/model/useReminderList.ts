import { useCallback, useEffect, useMemo, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { ReminderUpdates } from '@/src/features/ReminderEditor/model/ReminderEditor.models';
import { flatten } from '@/src/shared/utils/flatten';
import { flatToTree } from '@/src/shared/utils/flatToTree';
import { getAllReminderChildren } from '@/src/widgets/ReminderList/model/RemindersListMethods';
import { searchInTree } from '@/src/shared/utils/searchInTree';

export const useReminderList = (list: IReminderItem[]) => {
  const [reminders, setReminders] = useState(flatToTree(list));
  const [completedReminderIds, setCompletedReminderIds] = useState<string[]>(
    list.filter((item) => item.isCompleted).map((item) => item.id),
  );
  const [editReminder, setEditReminder] = useState<IReminderItem | null>(null);

  const handleAddReminder = useCallback((reminder: IReminderItem) => {
    setReminders((prevState) => {
      return [reminder, ...prevState];
    });
  }, []);

  const handleReminderComplete = useCallback(
    (ids: string[]) => {
      const origin = ids[0];
      const reminderAlreadyCompleted = completedReminderIds.includes(origin);

      setCompletedReminderIds((prevState) => {
        return reminderAlreadyCompleted
          ? prevState.filter((item) => {
              return ids.every((id) => id !== item);
            })
          : [...prevState, ...ids];
      });
    },
    [completedReminderIds],
  );

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
      const deletedReminder = searchInTree(prevState, 'id', id);

      if (deletedReminder) {
        const deletedReminders = [
          deletedReminder,
          ...getAllReminderChildren(deletedReminder),
        ];

        prevState = flatten(prevState);

        prevState = prevState.filter((reminder) => {
          return deletedReminders.every(
            (deleted) => deleted.id !== reminder.id,
          );
        });

        return flatToTree(prevState);
      }

      return prevState;
    });

    console.log(id);

    setEditReminder(null);
  }, []);

  const handleSetEditReminder = useCallback((value: IReminderItem | null) => {
    setEditReminder(value);
  }, []);

  const titleText = useMemo(() => {
    if (editReminder) {
      return `Редактирование ${editReminder.title}`;
    }

    return 'Напоминания';
  }, [editReminder]);

  useEffect(() => {
    for (const id of completedReminderIds) {
      setTimeout(() => {
        handleDeleteReminder(id);
      }, 700);
    }
  }, [completedReminderIds, handleDeleteReminder]);

  return {
    reminders,
    completedReminderIds,
    setReminders,
    editReminder,
    handleAddReminder,
    handleReminderComplete,
    handleUpdateReminder,
    handleDeleteReminder,
    handleSetEditReminder,
    titleText,
  };
};
