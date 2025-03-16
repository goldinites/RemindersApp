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
  onEdit: (reminder: IReminderItem) => void;
  level?: number;
  isNewReminder?: boolean;
  textField?: React.ReactNode;
}
