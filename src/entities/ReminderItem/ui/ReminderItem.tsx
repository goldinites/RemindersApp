import { ReminderItemProps } from '@/src/entities/ReminderItem/model/ReminderItem.models';
import { Reorder } from 'framer-motion';
import { useReminderItem } from '@/src/entities/ReminderItem/model/useReminderItem';
import { useReminderItemStyles } from '@/src/entities/ReminderItem/model/useReminderItemStyles';
import { useReminderItemAnimations } from '@/src/entities/ReminderItem/model/useReminderItemAnimations';
import { ReminderContent } from '@/src/entities/ReminderItem/ui/ReminderContent';

export const ReminderItem = ({
  data,
  completedReminderIds,
  level = 1,
  onEdit,
  onComplete,
  textField,
  isNewReminder,
  onReorder,
}: ReminderItemProps) => {
  const { nestedItems, handleUpdateNestedItems, handleEditReminder } =
    useReminderItem({
      reminder: data,
      onEdit,
      onReorder,
      onComplete,
    });

  const { isPresent, isDragging, handleSetDragging, animations } =
    useReminderItemAnimations(isNewReminder);

  const { position } = useReminderItemStyles(level, isPresent);

  return (
    <Reorder.Item
      key={data.id}
      as={'li'}
      layout
      {...animations}
      className={`origin-top ${position}`}
      value={data}
      dragListener={!isNewReminder}
      onDragStart={() => handleSetDragging(true)}
      onDragEnd={() => handleSetDragging(false)}
    >
      <ReminderContent
        data={data}
        completedReminderIds={completedReminderIds}
        onEdit={handleEditReminder}
        onComplete={onComplete}
        isNewReminder={isNewReminder}
        level={level}
        textField={textField}
        isDragging={isDragging}
        onReorder={() => false}
      />
      {!!nestedItems?.length && (
        <Reorder.Group
          as={'ul'}
          values={nestedItems}
          onReorder={handleUpdateNestedItems}
        >
          {nestedItems.map((reminder) => (
            <ReminderItem
              key={reminder.id}
              data={reminder}
              completedReminderIds={completedReminderIds}
              level={level + 1}
              onEdit={handleEditReminder}
              onComplete={onComplete}
              onReorder={handleUpdateNestedItems}
            />
          ))}
        </Reorder.Group>
      )}
    </Reorder.Item>
  );
};
