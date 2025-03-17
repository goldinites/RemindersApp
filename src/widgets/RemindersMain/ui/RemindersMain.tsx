'use client';
import Image from 'next/image';
import BackIcon from '@/src/shared/assets/icons/back.svg';
import Heading from '@/src/shared/ui/Heading';
import { ReminderCategories } from '@/src/widgets/ReminderCategories/ui/ReminderCategories';
import ReminderList from '@/src/widgets/ReminderList';
import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { useRemindersMain } from '@/src/widgets/RemindersMain/model/useRemindersMain';

const mode = {
  categories: { translateX: '0' },
  list: { translateX: '-50%' },
};

export const RemindersMain = ({
  reminders,
}: {
  reminders: IReminderItem[];
}) => {
  const {
    categories,
    currentCategory,
    handleClickBack,
    editReminder,
    list,
    titleText,
    handleSetEditReminder,
    handleSetCategory,
  } = useRemindersMain(reminders);

  return (
    <div className={'h-full'}>
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
      <div className={'h-full'}>
        {currentCategory ? (
          <ReminderList
            list={list ?? []}
            editReminder={editReminder}
            onEdit={(reminder) => handleSetEditReminder(reminder)}
          />
        ) : (
          <ReminderCategories
            categories={categories}
            onSetCategory={handleSetCategory}
          />
        )}
      </div>
    </div>
  );
};
