import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';

export interface ReminderUpdates {
  id: string;
  title: string;
  text: string;
}

export interface ReminderEditorProps {
  reminder: IReminderItem;
  onSave: (updates: ReminderUpdates) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}
