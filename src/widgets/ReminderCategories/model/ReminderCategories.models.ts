export type CategoryKey = 'all' | 'planned' | 'today' | 'completed';

export interface ReminderCategory {
  title: string;
  key: CategoryKey;
  count?: number;
}

export interface ReminderCategoriesProps {
  categories: ReminderCategory[];
  onSetCategory: (category: ReminderCategory) => void;
}
