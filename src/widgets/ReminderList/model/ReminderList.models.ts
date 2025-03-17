import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';

export interface ReminderListProps {
  reminders: IReminderItem[];
  isCompletedList?: boolean;
  onReorder: (reminders: IReminderItem[]) => void;
  onReorderNested: (reminders: IReminderItem[]) => void;
  onAddReminder: (reminder: IReminderItem) => void;
  onEditReminder: (reminder: IReminderItem | null) => void;
  onCompleteReminder: (id: string) => void;
}
