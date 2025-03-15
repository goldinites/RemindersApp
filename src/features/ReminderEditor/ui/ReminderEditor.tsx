import { ReminderEditorProps } from '@/src/features/ReminderEditor/model/ReminderEditor.models';
import Button from '@/src/shared/ui/Button';
import TextField from '@/src/shared/ui/TextField';
import TextArea from '@/src/shared/ui/TextArea';
import { useReminderEditor } from '@/src/features/ReminderEditor/model/useReminderEditor';
import TrashIcon from '@/src/shared/assets/icons/trash.svg';
import Image from 'next/image';

export const ReminderEditor = ({
  reminder,
  onSave,
  onDelete,
  onCancel,
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
        <div className={'self-end'}>
          <Button onClick={() => handleDelete(reminder.id)}>
            <Image src={TrashIcon} alt={'delete'} />
            Удалить
          </Button>
        </div>
      </div>
      <div className={'flex w-1/3 gap-x-2'}>
        <Button size={'lg'} onClick={handleSave}>
          Сохранить
        </Button>
        <Button size={'lg'} onClick={onCancel} variant={'outline'}>
          Отменить
        </Button>
      </div>
    </div>
  );
};
