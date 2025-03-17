import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { createID } from '@/src/shared/utils/createId';

export const getReminders = (): IReminderItem[] => {
  let result: IReminderItem[] = [];

  for (let i = 0; i < 2; i++) {
    result.push({
      id: createID(),
      title: `reminder ${i + 1}`,
      parentId: null,
      text: 'reminder text',
      isCompleted: false,
      dateCreated: '04.14.2019',
      sortNumber: 0,
    });
  }

  // result[1] = { ...result[1], isCompleted: true };

  result = [
    ...result,
    {
      id: createID(),
      title: `reminder hz`,
      parentId: result[1].id,
      text: 'reminder text',
      isCompleted: false,
      dateCreated: '05.06.2021',
      dateFinished: '05.13.2021',
      sortNumber: 0,
    },
    {
      id: createID(),
      title: `reminder hz2`,
      parentId: result[1].id,
      text: 'reminder text',
      isCompleted: false,
      dateCreated: '11.13.2020',
      sortNumber: 0,
    },
    {
      id: createID(),
      title: `reminder hz3`,
      parentId: result[1].id,
      text: 'reminder text',
      isCompleted: false,
      dateCreated: '05.06.2021',
      dateFinished: '05.13.2021',
      sortNumber: 0,
    },
  ];

  result = [
    ...result,
    {
      id: createID(),
      title: `reminder hz4`,
      parentId: result[2].id,
      text: 'reminder text',
      isCompleted: false,
      dateCreated: '05.06.2021',
      dateFinished: '05.13.2021',
      sortNumber: 0,
    },
    {
      id: createID(),
      title: `reminder hz5`,
      parentId: result[2].id,
      text: 'reminder text',
      isCompleted: false,
      dateCreated: '05.06.2021',
      dateFinished: '05.13.2021',
      sortNumber: 0,
    },
  ];

  // result = [
  //   ...result,
  //   {
  //     id: createID(),
  //     title: `reminder hz3`,
  //     parentId: result[3].id,
  //     text: 'reminder text',
  //     isCompleted: false,
  //     dateCreated: '05.06.2021',
  //     dateFinished: '05.13.2021',
  //   },
  // ];

  return result;
};
