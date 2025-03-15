import {
  IReminderItem,
  ReminderItemProps,
} from '@/src/entities/ReminderItem/model/ReminderItem.models';
import Checkbox from '@/src/shared/ui/Checkbox';
import { useReminderItem } from '@/src/entities/ReminderItem/model/useReminderItem';
import { useIsPresent } from 'framer-motion';
import { Reorder } from 'framer-motion';
import { useState } from 'react';

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

  const isPresent = useIsPresent();

  const [nestedItems, setNestedItems] = useState<IReminderItem[] | undefined>(
    data.nested,
  );

  const [isDragging, setIsDragging] = useState(false);

  return (
    <Reorder.Item
      as={'li'}
      layout
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 900, damping: 40 }}
      className={`origin-top ${isPresent ? 'static' : 'absolute'}`}
      key={data.id}
      value={data}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setTimeout(() => setIsDragging(false), 300);
      }}
    >
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
      {!!nestedItems?.length && (
        <Reorder.Group
          as={'ul'}
          values={nestedItems}
          onReorder={setNestedItems}
        >
          {nestedItems.map((reminder) => (
            <ReminderItem
              key={reminder.id}
              data={reminder}
              level={level + 1}
              onEdit={(reminder) => handleEditReminder(reminder)}
            />
          ))}
        </Reorder.Group>
      )}
    </Reorder.Item>
  );
};
