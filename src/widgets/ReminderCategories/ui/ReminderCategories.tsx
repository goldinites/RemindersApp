import { ReminderCategoriesProps } from '@/src/widgets/ReminderCategories/model/ReminderCategories.models';

export const ReminderCategories = ({
  categories,
  onSetCategory,
}: ReminderCategoriesProps) => {
  return (
    <div className={'grid grid-cols-2 gap-5'}>
      {categories.map((category) => (
        <div
          key={category.key}
          className={'p-6'}
          onClick={() => onSetCategory(category)}
        >
          {category.title}
        </div>
      ))}
    </div>
  );
};
