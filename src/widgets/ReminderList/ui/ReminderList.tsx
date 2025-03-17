'use client';

import ReminderItem from '@/src/entities/ReminderItem';
import { ReminderListProps } from '@/src/widgets/ReminderList/model/ReminderList.models';
import { motion } from 'framer-motion';
import ReminderEditor from '@/src/features/ReminderEditor';
import NewReminder from '@/src/features/NewReminder';
import { useReminderList } from '@/src/widgets/ReminderList/model/useReminderList';
import Image from 'next/image';
import BackIcon from '@/src/shared/assets/icons/back.svg';
import Heading from '@/src/shared/ui/Heading';
import { Reorder } from 'framer-motion';

const mode = {
  list: { translateX: '0' },
  edit: { translateX: '-50%' },
};

export const ReminderList = ({
  list,
  editReminder,
  onEdit,
}: ReminderListProps) => {
  const {
    reminders,
    completedReminderIds,
    setReminders,
    handleAddReminder,
    handleReminderComplete,
    handleUpdateReminder,
    handleDeleteReminder,
    handleEditReminder,
  } = useReminderList(list, onEdit);

  return (
    <div className='flex h-full flex-col gap-y-3'>
      <div className='h-full w-full overflow-hidden'>
        <motion.div
          className={'flex h-full w-[200%]'}
          animate={editReminder ? 'edit' : 'list'}
          transition={{ duration: 0.25, ease: 'linear' }}
          variants={mode}
        >
          <div className={'h-full flex-1 overflow-hidden'}>
            <Reorder.Group
              as={'ul'}
              values={reminders}
              layoutScroll
              onReorder={setReminders}
              className={'scrollbar h-full overflow-y-scroll'}
            >
              <NewReminder onAdd={(reminder) => handleAddReminder(reminder)} />
              {reminders.map((reminder) => (
                <ReminderItem
                  key={reminder.id}
                  data={reminder}
                  completedReminderIds={completedReminderIds}
                  onEdit={(reminder) => handleEditReminder(reminder)}
                  onComplete={(id) => handleReminderComplete(id)}
                />
              ))}
            </Reorder.Group>
          </div>
          <div className={'flex-1'}>
            {editReminder && (
              <ReminderEditor
                reminder={editReminder}
                onSave={(updates) => handleUpdateReminder(updates)}
                onDelete={(id) => handleDeleteReminder(id)}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
