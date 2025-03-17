import { useCallback, useMemo, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { ReminderCategory } from '@/src/widgets/ReminderCategories/model/ReminderCategories.models';

export const useRemindersMain = (reminders: IReminderItem[]) => {
  const [currentCategory, setCurrentCategory] =
    useState<ReminderCategory | null>(null);
  const [list, setList] = useState<IReminderItem[] | null>(
    currentCategory?.list ?? [],
  );
  const [editReminder, setEditReminder] = useState<IReminderItem | null>(null);

  const categories = useMemo(() => {
    const allUncompletedReminders = reminders.filter(
      (reminder) => !reminder.isCompleted,
    );
    const plannedReminders = reminders.filter(
      (reminder) => reminder.dateFinished && !reminder.isCompleted,
    );
    const todayReminders = plannedReminders;
    const completedReminders = reminders.filter(
      (reminder) => reminder.isCompleted,
    );

    return [
      {
        title: 'Все',
        key: 'all',
        list: allUncompletedReminders,
        count: allUncompletedReminders.length,
      },
      {
        title: 'В планах',
        key: 'planned',
        list: plannedReminders,
        count: plannedReminders.length,
      },
      {
        title: 'Сегодня',
        key: 'today',
        list: todayReminders,
        count: todayReminders.length,
      },
      {
        title: 'Завершённые',
        key: 'completed',
        list: completedReminders,
        count: completedReminders.length,
      },
    ];
  }, [reminders]);

  const handleSetCategory = useCallback((category: ReminderCategory | null) => {
    console.log(category);
    setCurrentCategory(category);
    setList(category?.list ?? null);
  }, []);

  const handleSetEditReminder = useCallback((value: IReminderItem | null) => {
    setEditReminder(value);
  }, []);

  const handleClickBack = useCallback(() => {
    if (editReminder) {
      handleSetEditReminder(null);
      return;
    }

    if (currentCategory) {
      handleSetCategory(null);
      return;
    }
  }, [currentCategory, editReminder, handleSetCategory, handleSetEditReminder]);

  const titleText = useMemo(() => {
    if (editReminder) {
      return `Редактирование ${editReminder.title}`;
    }

    return 'Напоминания';
  }, [editReminder]);

  return {
    categories,
    currentCategory,
    list,
    editReminder,
    titleText,
    handleClickBack,
    handleSetCategory,
    handleSetEditReminder,
  };
};
