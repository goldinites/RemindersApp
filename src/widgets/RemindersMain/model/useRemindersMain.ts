import { useCallback, useMemo, useState } from 'react';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import {
  CategoryKey,
  ReminderCategory,
} from '@/src/widgets/ReminderCategories/model/ReminderCategories.models';
import { flatToTree } from '@/src/shared/utils/flatToTree';
import { ReminderUpdates } from '@/src/features/ReminderEditor/model/ReminderEditor.models';
import { searchInTree } from '@/src/shared/utils/searchInTree';
import { getAllReminderChildren } from '@/src/widgets/ReminderList/model/RemindersListMethods';

export const useRemindersMain = (list: IReminderItem[]) => {
  const [reminders, setReminders] = useState<IReminderItem[]>(list);

  const [currentCategory, setCurrentCategory] =
    useState<ReminderCategory | null>(null);

  const [editReminder, setEditReminder] = useState<IReminderItem | null>(null);

  const categories: ReminderCategory[] = useMemo(() => {
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
        count: allUncompletedReminders.length,
      },
      {
        title: 'В планах',
        key: 'planned',
        count: plannedReminders.length,
      },
      {
        title: 'Сегодня',
        key: 'today',
        count: todayReminders.length,
      },
      {
        title: 'Завершённые',
        key: 'completed',
        count: completedReminders.length,
      },
    ];
  }, [reminders]);

  const groupedReminders = useMemo(() => {
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

    const result: Record<CategoryKey, IReminderItem[]> = {
      all: [],
      planned: [],
      today: [],
      completed: [],
    };

    for (const category of categories) {
      switch (category.key) {
        case 'all':
          result[category.key] = allUncompletedReminders;
          break;
        case 'planned':
          result[category.key] = plannedReminders;
          break;
        case 'today':
          result[category.key] = todayReminders;
          break;
        case 'completed':
          result[category.key] = completedReminders;
          break;
      }
    }

    return result;
  }, [categories, reminders]);

  const filteredReminders = useMemo(() => {
    if (!currentCategory) {
      return [];
    }

    return currentCategory.key === 'completed'
      ? groupedReminders[currentCategory.key]
      : flatToTree(groupedReminders[currentCategory?.key]);
  }, [groupedReminders, currentCategory]);

  const handleSetReminders = useCallback((reminders: IReminderItem[]) => {
    setReminders(reminders);
  }, []);

  const handleReorderNested = useCallback((reordered: IReminderItem[]) => {
    reordered = reordered.map((item, index) => {
      return { ...item, sortNumber: index };
    });

    setReminders((prevState) => {
      return prevState.map((reminder) => {
        const reorderedItem = reordered.find((item) => item.id === reminder.id);

        if (reorderedItem) {
          return reorderedItem;
        }

        return reminder;
      });
    });
  }, []);

  const handleSetCategory = useCallback((category: ReminderCategory | null) => {
    setCurrentCategory(category);
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

    if (currentCategory) {
      return currentCategory.title;
    }

    return 'Напоминания';
  }, [currentCategory, editReminder]);

  const handleAddReminder = useCallback((reminder: IReminderItem) => {
    setReminders((prevState) => {
      return [reminder, ...prevState];
    });
  }, []);

  const handleUpdateReminder = useCallback((updates: ReminderUpdates) => {
    setEditReminder(null);
    setReminders((prevState) => {
      return prevState.map((reminder) => {
        if (reminder.id === updates.id) {
          return { ...reminder, ...updates };
        }

        return reminder;
      });
    });
  }, []);

  const handleDeleteReminder = useCallback((id: string) => {
    setEditReminder(null);
    setReminders((prevState) => {
      return prevState.filter((reminder) => reminder.id !== id);
    });
  }, []);

  const handleCompleteReminder = useCallback(
    (id: string) => {
      const remindersTree = flatToTree(reminders);
      const origin: IReminderItem = searchInTree(remindersTree, 'id', id);

      if (!origin) {
        return;
      }

      let result: IReminderItem[] = [origin];

      if (origin?.nested) {
        result = [...result, ...getAllReminderChildren(origin)];
      }

      setReminders((prevState) => {
        return prevState.map((reminder) => {
          const needReminder = result.some((rem) => rem.id === reminder.id);

          if (needReminder) {
            return { ...reminder, isCompleted: !origin.isCompleted };
          }

          return reminder;
        });
      });
    },
    [reminders],
  );

  return {
    categories,
    currentCategory,
    filteredReminders,
    editReminder,
    titleText,
    handleClickBack,
    handleSetCategory,
    handleSetEditReminder,
    handleDeleteReminder,
    handleSetReminders,
    handleAddReminder,
    handleUpdateReminder,
    handleReorderNested,
    handleCompleteReminder,
  };
};
