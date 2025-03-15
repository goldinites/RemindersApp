export interface IReminderItem {
  id: string;
  title: string;
  isCompleted: boolean;
  parentId: string | null;
  text?: string;
  nested?: IReminderItem[];
}

export interface ReminderItemProps {
  data: IReminderItem;
  level?: number;
  isNewReminder?: boolean;
  onEdit: (reminder: IReminderItem) => void;
}

export interface ReminderFieldEditData {
  current: string;
  updated: string;
}
