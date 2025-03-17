export interface IReminderItem {
  id: string;
  title: string;
  isCompleted: boolean;
  parentId: string | null;
  dateCreated: string;
  sortNumber: number;
  dateFinished?: string;
  dateCompleted?: string;
  text?: string;
  nested?: IReminderItem[];
}

export interface ReminderItemProps {
  data: IReminderItem;
  completedReminderIds: string[];
  onEdit: (reminder: IReminderItem) => void;
  onReorder: (reminders: IReminderItem[]) => void;
  onComplete: (id: string) => void;
  level?: number;
  isNewReminder?: boolean;
  textField?: React.ReactNode;
}
