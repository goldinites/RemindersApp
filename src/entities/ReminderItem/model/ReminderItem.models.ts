export interface IReminderItem {
  id: string;
  title: string;
  isCompleted: boolean;
  parentId: string | null;
  dateCreated: string;
  dateFinished?: string;
  dateCompleted?: string;
  text?: string;
  nested?: IReminderItem[];
}

export interface ReminderItemProps {
  data: IReminderItem;
  completedReminderIds: string[];
  onEdit: (reminder: IReminderItem) => void;
  onComplete: (id: string) => void;
  level?: number;
  isNewReminder?: boolean;
  textField?: React.ReactNode;
}
