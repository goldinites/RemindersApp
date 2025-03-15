import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';

export interface ReminderListProps {
  heading?: React.ReactNode;
  list: IReminderItem[];
}
