import ReminderItem from '@/src/entities/ReminderItem';
import { useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { createID } from '@/src/shared/utils/createId';

export const NewReminder = () => {
  const [newReminder, setNewReminder] = useState<IReminderItem>({
    id: createID(),
    title: 'Новое напоминание',
    text: '',
    parentId: null,
    isCompleted: false,
  });

  return (
    <ReminderItem
      data={newReminder}
      isNewReminder={true}
      onEdit={() => false}
    />
  );
};
