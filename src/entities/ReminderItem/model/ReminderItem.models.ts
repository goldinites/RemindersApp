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
  onEdit: (reminder: IReminderItem) => void;
  level?: number;
  isNewReminder?: boolean;
  reminderTitleField?: React.ReactNode;
  // onAdd?: () => void;
}

export interface ReminderFieldEditData {
  current: string;
  updated: string;
}
