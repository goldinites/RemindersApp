import { ChangeEvent, useCallback, useState } from 'react';
import { ReminderUpdates } from '@/src/features/ReminderEditor/model/ReminderEditor.models';

export const useReminderEditor = (
  id: string,
  title: string,
  text: string,
  onSave: (updates: ReminderUpdates) => void,
  onDelete: (id: string) => void,
) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedText, setUpdatedText] = useState(text ?? '');

  const handleUpdateTitle = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setUpdatedTitle(evt.target.value);
    },
    [],
  );

  const handleUpdateText = useCallback(
    (evt: ChangeEvent<HTMLTextAreaElement>) => {
      setUpdatedText(evt.target.value);
    },
    [],
  );

  const handleSave = useCallback(() => {
    onSave({
      id: id,
      title: updatedTitle,
      text: updatedText,
    });
  }, [onSave, id, updatedText, updatedTitle]);

  const handleDelete = useCallback(
    (id: string) => {
      onDelete(id);
    },
    [onDelete],
  );

  return {
    updatedTitle,
    updatedText,
    handleUpdateTitle,
    handleUpdateText,
    handleSave,
    handleDelete,
  };
};
