import ReminderItem from '@/src/entities/ReminderItem';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import TextField from '@/src/shared/ui/TextField';
import { useNewReminder } from '@/src/features/NewReminder/model/useNewReminder';

export const NewReminder = ({
  onAdd,
}: {
  onAdd: (reminder: IReminderItem) => void;
}) => {
  const {
    newReminder,
    newReminderTitle,
    handleAddReminder,
    handleUpdateReminderTitle,
  } = useNewReminder(onAdd);

  return (
    <ReminderItem
      data={newReminder}
      completedReminderIds={[]}
      isNewReminder={true}
      onEdit={() => false}
      onComplete={() => false}
      onReorder={() => false}
      textField={
        <TextField
          variant={'empty'}
          size={'sm'}
          placeholder={'Новое напоминание'}
          value={newReminderTitle}
          onChange={handleUpdateReminderTitle}
          onBlur={handleAddReminder}
        />
      }
    />
  );
};
