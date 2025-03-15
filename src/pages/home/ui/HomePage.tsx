import { IReminderItem } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { getReminders } from '@/src/widgets/ReminderList/api/getReminders';
import ReminderList from '@/src/widgets/ReminderList';
import { flatToTree } from '@/src/shared/utils/flatToTree';

export const HomePage = () => {
  const reminders: IReminderItem[] = flatToTree(getReminders());

  return (
    <div className={'h-full py-12'}>
      <div className='mx-auto h-full w-full max-w-2xl flex-1 overflow-hidden rounded-xl bg-white p-6 pr-3'>
        <ReminderList list={reminders} />
      </div>
    </div>
  );
};
