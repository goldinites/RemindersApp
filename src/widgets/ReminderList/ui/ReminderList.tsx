'use client';

import ReminderItem from '@/src/entities/ReminderItem';
import { ReminderListProps } from '@/src/widgets/ReminderList/model/ReminderList.models';
import NewReminder from '@/src/features/NewReminder';
import { useReminderList } from '@/src/widgets/ReminderList/model/useReminderList';
import { Reorder } from 'framer-motion';

export const ReminderList = ({
  reminders,
  isCompletedList,
  onReorder,
  onReorderNested,
  onAddReminder,
  onEditReminder,
  onCompleteReminder,
}: ReminderListProps) => {
  const {
    handleAddReminder,
    handleReminderComplete,
    handleEditReminder,
    handleReorderReminders,
    handleReorderNestedReminders,
  } = useReminderList(
    onReorder,
    onReorderNested,
    onAddReminder,
    onEditReminder,
    onCompleteReminder,
  );

  return (
    <Reorder.Group
      as={'ul'}
      values={reminders}
      layoutScroll
      onReorder={handleReorderReminders}
      className={'scrollbar flex flex-1 flex-col overflow-y-scroll'}
    >
      {!isCompletedList && <NewReminder onAdd={handleAddReminder} />}
      {reminders.map((reminder) => (
        <ReminderItem
          key={reminder.id}
          data={reminder}
          completedReminderIds={[]}
          onEdit={handleEditReminder}
          onComplete={handleReminderComplete}
          onReorder={handleReorderNestedReminders}
        />
      ))}
    </Reorder.Group>
  );
};
