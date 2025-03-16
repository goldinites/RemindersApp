import { useCallback, useState } from 'react';
import { AnimationProps, useIsPresent } from 'framer-motion';

export const useReminderItemAnimations = (isNewReminder?: boolean) => {
  const [isDragging, setIsDragging] = useState(false);
  const isPresent = useIsPresent();

  const animations: AnimationProps = {
    initial: isNewReminder ? false : { scaleY: 0, opacity: 0 },
    animate: isNewReminder ? false : { scaleY: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 900, damping: 50 },
  };

  const handleSetDragging = useCallback((value: boolean) => {
    if (value) {
      setIsDragging(true);
      return;
    }

    setTimeout(() => {
      setIsDragging(false);
    }, 500);
  }, []);

  return {
    isPresent,
    animations,
    isDragging,
    handleSetDragging,
  };
};
