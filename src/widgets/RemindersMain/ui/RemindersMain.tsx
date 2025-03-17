'use client';
import Image from 'next/image';
import BackIcon from '@/src/shared/assets/icons/back.svg';
import Heading from '@/src/shared/ui/Heading';
import { ReminderCategories } from '@/src/widgets/ReminderCategories/ui/ReminderCategories';
import ReminderList from '@/src/widgets/ReminderList';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { useRemindersMain } from '@/src/widgets/RemindersMain/model/useRemindersMain';
import { motion } from 'framer-motion';
import ReminderEditor from '@/src/features/ReminderEditor';

const mode = {
  categories: { translateX: '0' },
  list: { translateX: '-33%' },
  edit: { translateX: '-66%' },
};

export const RemindersMain = ({
  reminders,
}: {
  reminders: IReminderItem[];
}) => {
  const {
    titleText,
    categories,
    currentCategory,
    filteredReminders,
    editReminder,
    handleClickBack,
    handleSetCategory,
    handleDeleteReminder,
    handleSetReminders,
    handleReorderNested,
    handleAddReminder,
    handleUpdateReminder,
    handleSetEditReminder,
    handleCompleteReminder,
  } = useRemindersMain(reminders);

  return (
    <div className={'flex h-full flex-col gap-10'}>
      <div className={'flex items-start gap-x-3'}>
        {(currentCategory || editReminder) && (
          <div
            className={'mt-1.25 flex-[0_0_24px] cursor-pointer'}
            onClick={handleClickBack}
          >
            <Image src={BackIcon} alt={'back'} />
          </div>
        )}

        <Heading tag={'h1'} type={editReminder ? 'h3' : 'h1'}>
          {titleText}
        </Heading>
      </div>
      <motion.div
        className={'flex h-full w-[calc(300%+48px)] flex-1 gap-12'}
        animate={
          editReminder ? 'edit' : currentCategory ? 'list' : 'categories'
        }
        transition={{ duration: 0.25, ease: 'linear' }}
        variants={mode}
      >
        <div className={'flex-1'}>
          <ReminderCategories
            categories={categories}
            onSetCategory={handleSetCategory}
          />
        </div>
        <div className={'flex flex-1'}>
          <ReminderList
            reminders={filteredReminders ?? []}
            isCompletedList={currentCategory?.key === 'completed'}
            onReorder={handleSetReminders}
            onReorderNested={handleReorderNested}
            onAddReminder={handleAddReminder}
            onEditReminder={handleSetEditReminder}
            onCompleteReminder={handleCompleteReminder}
          />
        </div>
        <div className={'flex-1'}>
          {editReminder && (
            <ReminderEditor
              reminder={editReminder}
              onSave={handleUpdateReminder}
              onDelete={handleDeleteReminder}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};
