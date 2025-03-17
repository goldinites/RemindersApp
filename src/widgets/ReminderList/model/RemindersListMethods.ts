import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';

export const getReminderParents = (
  reminders: IReminderItem | IReminderItem[],
  fullList: IReminderItem[],
): IReminderItem[] => {
  let result: IReminderItem[] = [];

  const preparedReminders = Array.isArray(reminders) ? reminders : [reminders];

  // рекурсивно получаем всех родителей
  const getParent = (
    reminder: IReminderItem,
    array: IReminderItem[],
  ): IReminderItem[] => {
    let result: IReminderItem[] = [];
    // ищем родителя
    const parent = array.find((item) => item.id === reminder.parentId);

    if (parent) {
      result = [...result, parent];

      // если у родителя есть родитель, идем вглубь
      if (parent.parentId) {
        result = [...result, ...getParent(parent, array)];
      }
    }

    return result;
  };

  // идет по плоскому списку отфильтрованных, и собираем элементы
  for (const reminder of preparedReminders) {
    result = [...result, reminder];

    if (reminder.parentId) {
      // получаем родителей
      result = [...result, ...getParent(reminder, fullList)];
    }
  }

  return result;
};

export const getAllReminderChildren = (
  reminder: IReminderItem,
): IReminderItem[] => {
  // рекурсивно получаем всех потомков
  const getChildren = (reminder: IReminderItem): IReminderItem[] => {
    let result: IReminderItem[] = [];

    const nested = reminder.nested ?? [];

    for (const item of nested) {
      result = [...result, item];

      // если у потомка есть потомки, идем вглубь
      if (item.nested?.length) {
        result = [...result, ...getChildren(item)];
      }
    }

    return result;
  };

  return getChildren(reminder);
};
