import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';

export interface ReminderListProps {
  list: IReminderItem[];
  editReminder?: IReminderItem | null;
  onEdit: (reminder: IReminderItem) => void;
}
