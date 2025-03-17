import { useCallback } from 'react';
import { ReminderCategory } from '@/src/widgets/ReminderCategories/model/ReminderCategories.models';

export const useReminderCategories = (
  onSetCategory: (category: ReminderCategory) => void,
) => {
  const handleSetCategory = useCallback(
    (category: ReminderCategory) => {
      onSetCategory(category);
    },
    [onSetCategory],
  );

  return {
    handleSetCategory,
  };
};
