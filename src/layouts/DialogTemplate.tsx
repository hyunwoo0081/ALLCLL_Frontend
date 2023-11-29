import React, {useEffect, useState} from 'react';
import '@styles/components/DialogTemplate.scss';

interface IDialogTemplate {
  isOpen: boolean;
  children: React.ReactNode;
}

function DialogTemplate({isOpen, children}: IDialogTemplate) {
  const [overflow, setOverflow] = useState<string>('auto');

  useEffect(() => {
    if (isOpen) {
      setOverflow(document.body.style.overflow ?? 'auto');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = overflow;
    }
  }, [isOpen]);

  return !isOpen ? null : (
    <div className='dialog_background'>
      <div className='dialog'
           onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>

  )
}

export default DialogTemplate;