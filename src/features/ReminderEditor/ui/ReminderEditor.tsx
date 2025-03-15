import { ReminderEditorProps } from '@/src/features/ReminderEditor/model/ReminderEditor.models';
import Button from '@/src/shared/ui/Button';
import TextField from '@/src/shared/ui/TextField';
import TextArea from '@/src/shared/ui/TextArea';
import { useReminderEditor } from '@/src/features/ReminderEditor/model/useReminderEditor';
import CheckIcon from '@/src/shared/assets/icons/check.svg';
import TrashIcon from '@/src/shared/assets/icons/trash.svg';
import Image from 'next/image';

export const ReminderEditor = ({
  reminder,
  onSave,
  onDelete,
}: ReminderEditorProps) => {
  const {
    updatedTitle,
    updatedText,
    handleUpdateTitle,
    handleUpdateText,
    handleSave,
    handleDelete,
  } = useReminderEditor(
    reminder.id,
    reminder.title,
    reminder.text ?? '',
    onSave,
    onDelete,
  );
  return (
    <div className={'flex h-full flex-col justify-between p-4'}>
      <div className={'flex flex-col gap-y-4'}>
        <div className={'w-full'}>
          <TextField
            label={'Название'}
            value={updatedTitle}
            size={'md'}
            onChange={handleUpdateTitle}
          />
        </div>
        <div className={'h-[250px] w-full'}>
          <TextArea
            label={'Описание'}
            value={updatedText}
            size={'lg'}
            onChange={handleUpdateText}
          />
        </div>
      </div>
      <div className={'flex w-full justify-between gap-x-12'}>
        <Button
          variant={'warning'}
          size={'lg'}
          onClick={() => handleDelete(reminder.id)}
        >
          <Image src={TrashIcon} alt={'delete'} />
          Удалить
        </Button>
        <Button size={'lg'} onClick={handleSave}>
          <Image src={CheckIcon} alt={'accept'} />
          Сохранить
        </Button>
      </div>
    </div>
  );
};
