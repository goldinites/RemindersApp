import { ReminderItemProps } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import Checkbox from '@/src/shared/ui/Checkbox';
import { useReminderItem } from '@/src/entities/ReminderItem/model/useReminderItem';

export const ReminderItem = ({
  data,
  level = 1,
  onEdit,
  reminderTitleField,
  isNewReminder,
}: ReminderItemProps) => {
  const {
    isReminderCompleted,
    handleCompleteReminder,
    paddingLeft,
    handleEditReminder,
    defineColorOfBorder,
  } = useReminderItem(data.isCompleted, level, onEdit);

  return (
    <li>
      <div
        className='flex w-full justify-between gap-x-2 rounded-lg py-3 pr-3 hover:bg-indigo-50'
        style={{ paddingLeft }}
        onClick={(evt) => {
          evt.stopPropagation();
          handleEditReminder(data);
        }}
      >
        <div
          className={`flex w-full items-start gap-x-2 border-b-2 ${defineColorOfBorder} overflow-hidden pb-3`}
        >
          <div className={'mt-1.75'}>
            <Checkbox
              checked={isReminderCompleted}
              disabled={isNewReminder}
              onChange={handleCompleteReminder}
            />
          </div>
          <div className='flex w-full flex-col gap-y-2'>
            {isNewReminder ? (
              <>{reminderTitleField}</>
            ) : (
              <div className={'w-full'}>
                <span className='flex h-10 items-center text-sm font-bold text-zinc-900'>
                  {data.title}
                </span>
              </div>
            )}
            <div>{data.text}</div>
          </div>
        </div>
      </div>
      {!!data.nested?.length && (
        <ul>
          {data.nested.map((reminder) => (
            <ReminderItem
              key={reminder.id}
              data={reminder}
              level={level + 1}
              onEdit={(reminder) => handleEditReminder(reminder)}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
