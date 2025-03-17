import { useCallback, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { ReminderUpdates } from '@/src/features/ReminderEditor/model/ReminderEditor.models';

export const useReminderList = (
  onReorder: (reminders: IReminderItem[]) => void,
  onReorderNested: (reminders: IReminderItem[]) => void,
  onAddReminder: (reminder: IReminderItem) => void,
  onEditReminder: (reminder: IReminderItem | null) => void,
  onCompleteReminder: (id: string) => void,
  // reminders: IReminderItem[],
  // onDelete: (id: string) => void,
) => {
  // const [reminders, setReminders] = useState(flatToTree(list));

  const handleReorderReminders = useCallback(
    (reminders: IReminderItem[]) => {
      onReorder(reminders);
    },
    [onReorder],
  );

  const handleReorderNestedReminders = useCallback(
    (reminders: IReminderItem[]) => {
      onReorderNested(reminders);
    },
    [onReorderNested],
  );

  // const [completedReminderIds, setCompletedReminderIds] = useState<string[]>(
  //   list.filter((item) => item.isCompleted).map((item) => item.id),
  // );
  // const [editReminder, setEditReminder] = useState<IReminderItem | null>(null);

  const handleAddReminder = useCallback(
    (reminder: IReminderItem) => {
      onAddReminder(reminder);
      // setReminders((prevState) => {
      //   return [reminder, ...prevState];
      // });
    },
    [onAddReminder],
  );

  const handleReminderComplete = useCallback(
    (id: string) => {
      onCompleteReminder(id);
    },
    [onCompleteReminder],
  );

  const handleEditReminder = useCallback(
    (reminder: IReminderItem | null) => {
      onEditReminder(reminder);
    },
    [onEditReminder],
  );

  return {
    handleReorderReminders,
    handleReorderNestedReminders,
    handleAddReminder,
    handleReminderComplete,
    handleEditReminder,
  };
};
