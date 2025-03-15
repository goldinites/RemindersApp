import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { createID } from '@/src/shared/utils/createId';

export const getReminders = (): IReminderItem[] => {
  const result: IReminderItem[] = [];

  for (let i = 0; i < 3; i++) {
    result.push({
      id: createID(),
      title: `reminder ${i + 1}`,
      parentId: null,
      text: 'reminder text',
      isCompleted: false,
    });
  }

  result[2] = {
    ...result[2],
    nested: [
      {
        id: createID(),
        title: `reminder 4`,
        parentId: null,
        text: 'reminder text',
        isCompleted: false,
      },
      {
        id: createID(),
        title: `reminder 5`,
        parentId: null,
        text: 'reminder text',
        isCompleted: false,
      },
    ],
  };

  return result;
};
