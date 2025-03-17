import { ReminderCategoriesProps } from '@/src/widgets/ReminderCategories/model/ReminderCategories.models';
import { useReminderCategories } from '@/src/widgets/ReminderCategories/model/useReminderCategories';

export const ReminderCategories = ({
  categories,
  onSetCategory,
}: ReminderCategoriesProps) => {
  const { handleSetCategory } = useReminderCategories(onSetCategory);

  return (
    <div className={'grid grid-cols-2 gap-5'}>
      {categories.map((category) => (
        <div
          key={category.key}
          className={
            'flex h-[200px] cursor-pointer flex-col justify-between rounded-3xl bg-indigo-100 p-6 transition hover:bg-indigo-300'
          }
          onClick={() => handleSetCategory(category)}
        >
          <span className={'text-2xl font-medium text-indigo-900'}>
            {category.title}
          </span>
          <div className={'self-end text-5xl font-bold text-indigo-900'}>
            {category.count ?? 0}
          </div>
        </div>
      ))}
    </div>
  );
};
