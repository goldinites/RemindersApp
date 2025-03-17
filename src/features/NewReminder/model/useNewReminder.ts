import { ChangeEvent, useCallback, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { createID } from '@/src/shared/utils/createId';

export const useNewReminder = (onAdd: (reminder: IReminderItem) => void) => {
  const [newReminderTitle, setNewReminderTitle] = useState<string>('');
  const [newReminder, setNewReminder] = useState<IReminderItem>({
    id: createID(),
    title: '',
    text: '',
    parentId: null,
    isCompleted: false,
    dateCreated: new Date().toString(),
    sortNumber: 0,
  });

  const handleAddReminder = useCallback(() => {
    if (!newReminder.title) {
      return;
    }

    onAdd(newReminder);
    setNewReminderTitle('');

    setNewReminder({
      id: createID(),
      title: '',
      text: '',
      parentId: null,
      isCompleted: false,
      dateCreated: new Date().toString(),
      sortNumber: 0,
    });
  }, [newReminder, onAdd]);

  const handleUpdateReminderTitle = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      const title = evt.target.value;
      setNewReminderTitle(title);
      setNewReminder((prevState) => {
        return { ...prevState, title };
      });
    },
    [],
  );

  return {
    newReminder,
    newReminderTitle,
    handleAddReminder,
    handleUpdateReminderTitle,
  };
};
