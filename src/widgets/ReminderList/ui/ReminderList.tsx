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

const mode = {
  list: { translateX: '0' },
  edit: { translateX: '-50%' },
};

export const ReminderList = ({ list }: ReminderListProps) => {
  const {
    reminders,
    editReminder,
    handleSetEditReminder,
    handleAddReminder,
    handleUpdateReminder,
    handleDeleteReminder,
    titleText,
  } = useReminderList(list);

  return (
    <div className='flex h-full flex-col gap-y-3'>
      <div className={'flex items-start gap-x-3'}>
        {editReminder && (
          <div
            className={'mt-1.25 flex-[0_0_24px] cursor-pointer'}
            onClick={() => handleSetEditReminder(null)}
          >
            <Image src={BackIcon} alt={'back'} />
          </div>
        )}
        <Heading tag={'h1'} type={editReminder ? 'h3' : 'h1'}>
          {titleText}
        </Heading>
      </div>

      <div className='h-full w-full overflow-hidden'>
        <motion.div
          className={'flex h-full w-[200%]'}
          animate={editReminder ? 'edit' : 'list'}
          transition={{ duration: 0.25, ease: 'linear' }}
          variants={mode}
        >
          <div className={'h-full flex-1 overflow-hidden'}>
            <ul className={'scrollbar h-full overflow-y-scroll pr-1'}>
              <NewReminder onAdd={(reminder) => handleAddReminder(reminder)} />
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
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
