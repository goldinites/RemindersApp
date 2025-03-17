import Checkbox from '@/src/shared/ui/Checkbox';
import { useReminderItemStyles } from '@/src/entities/ReminderItem/model/useReminderItemStyles';
import { ReminderItemProps } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { useReminderItem } from '@/src/entities/ReminderItem/model/useReminderItem';
import { dateFormatter } from '@/src/shared/utils/dateFormatter';

export const ReminderContent = ({
  data,
  completedReminderIds,
  level = 1,
  onEdit,
  onComplete,
  textField,
  isNewReminder,
  isDragging,
  onReorder,
}: ReminderItemProps & { isDragging: boolean }) => {
  const { isReminderCompleted, handleCompleteReminder, handleEditReminder } =
    useReminderItem({
      reminder: data,
      onEdit,
      onComplete,
      onReorder,
      completedReminderIds,
    });

  const { paddingLeft, borderColor } = useReminderItemStyles(level);

  return (
    <div
      className='flex w-full justify-between gap-x-2 rounded-lg py-3 pr-3 hover:bg-indigo-50'
      style={{ paddingLeft }}
      onClick={(evt) => {
        if (isDragging) {
          return;
        }

        evt.stopPropagation();
        handleEditReminder(data);
      }}
    >
      <div
        className={`flex w-full items-start gap-x-2 border-b-2 ${borderColor} overflow-hidden pb-3`}
      >
        <div className={'mt-1.75'}>
          <Checkbox
            checked={data.isCompleted}
            disabled={isNewReminder}
            onChange={() => handleCompleteReminder(data.id)}
          />
        </div>
        <div className='flex w-full flex-col gap-y-2'>
          {isNewReminder ? (
            <div className={'flex h-10 w-full items-center'}>{textField}</div>
          ) : (
            <div className='flex h-10 w-full items-center text-sm font-bold text-zinc-900'>
              {data.title}
            </div>
          )}
          <div>{data.text}</div>
          {data.dateFinished && (
            <span className='text-sm text-gray-500'>
              {dateFormatter(data.dateFinished)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
