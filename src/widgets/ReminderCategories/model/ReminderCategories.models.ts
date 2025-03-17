import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';

export interface ReminderCategory {
  title: string;
  key: string;
  count?: number;
  list?: IReminderItem[];
}

export interface ReminderCategoriesProps {
  categories: ReminderCategory[];
  onSetCategory: (category: ReminderCategory) => void;
}
