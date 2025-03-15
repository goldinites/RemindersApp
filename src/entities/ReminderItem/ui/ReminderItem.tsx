import { ReminderItemProps } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import Checkbox from '@/src/shared/ui/Checkbox';
import { useReminderItem } from '@/src/entities/ReminderItem/model/useReminderItem';
import TextField from '@/src/shared/ui/TextField';

export const ReminderItem = ({
  data,
  level = 1,
  onEdit,
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
      >
        <div
          className={`flex w-full items-start gap-x-2 border-b-2 ${defineColorOfBorder} pb-3`}
          onClick={(evt) => {
            evt.stopPropagation();
            handleEditReminder(data);
          }}
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
              <div className={'flex h-10 w-1/2 items-center'}>
                <TextField size={'sm'} placeholder={data.title} />
              </div>
            ) : (
              <span className='flex h-10 items-center text-sm font-bold text-zinc-900'>
                {data.title}
              </span>
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
