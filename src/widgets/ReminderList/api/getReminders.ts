import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { createID } from '@/src/shared/utils/createId';

export const getReminders = (): IReminderItem[] => {
  let result: IReminderItem[] = [];

  for (let i = 0; i < 3; i++) {
    result.push({
      id: createID(),
      title: `reminder ${i + 1}`,
      parentId: null,
      text: 'reminder text',
      isCompleted: false,
      dateCreated: '04.14.2019',
    });
  }

  result = [
    ...result,
    {
      id: createID(),
      title: `reminder 4`,
      parentId: result[2].id,
      text: 'reminder text',
      isCompleted: false,
      dateCreated: '05.06.2021',
      dateFinished: '05.13.2021',
    },
    {
      id: createID(),
      title: `reminder 5`,
      parentId: result[2].id,
      text: 'reminder text',
      isCompleted: false,
      dateCreated: '11.13.2020',
    },
  ];

  return result;
};
