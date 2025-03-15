'use client';

import ReminderItem from '@/src/entities/ReminderItem';
import { ReminderListProps } from '@/src/widgets/ReminderList/model/ReminderList.models';
import { motion } from 'framer-motion';
import ReminderEditor from '@/src/features/ReminderEditor';
import NewReminder from '@/src/features/NewReminder';
import { useReminderList } from '@/src/widgets/ReminderList/model/useReminderList';

const mode = {
  list: { translateX: '0' },
  edit: { translateX: '-50%' },
};

export const ReminderList = ({ heading, list }: ReminderListProps) => {
  const {
    reminders,
    editReminder,
    handleSetEditReminder,
    handleUpdateReminder,
    handleDeleteReminder,
  } = useReminderList(list);

  return (
    <div className='flex h-full flex-col gap-y-3'>
      <div className={'flex items-center justify-between gap-x-3'}>
        {heading}
        {/*<span className={'cursor-pointer'} onClick={handleAddReminder}>*/}
        {/*  <Image src={EditIcon} alt={''} />*/}
        {/*</span>*/}
      </div>

      <div className='h-full w-full overflow-hidden'>
        <motion.div
          className={'flex h-full w-[200%]'}
          animate={editReminder ? 'edit' : 'list'}
          transition={{ duration: 0.25, ease: 'linear' }}
          variants={mode}
        >
          <div className={'h-full flex-1'}>
            <ul className={'scrollbar h-full overflow-y-scroll pr-1'}>
              <NewReminder />
              {reminders.map((reminder) => (
                <ReminderItem
                  key={reminder.id}
                  data={reminder}
                  onEdit={(reminder) => handleSetEditReminder(reminder)}
                />
              ))}
            </ul>
          </div>
          <div className={'flex-1'}>
            {editReminder && (
              <ReminderEditor
                reminder={editReminder}
                onSave={(updates) => handleUpdateReminder(updates)}
                onDelete={(id) => handleDeleteReminder(id)}
                onCancel={() => handleSetEditReminder(null)}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
