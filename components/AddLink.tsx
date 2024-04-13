import { useState } from 'react';
import { useToast } from './ui/use-toast';
import LinkDialog from './LinkDialog';
import { LinkDataProps } from '@/lib/interfaces';

export const AddLink = ({ updateLinks }: { updateLinks: () => void }) => {
  const [data, setData] = useState<LinkDataProps>({
    tag: '',
    description: '',
    url: '',
  });

  const [error, setError] = useState('')
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  const createLink = async () => {
    const response = await fetch('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    });

    const responseData = await response.json();

    if(!response.ok) {
      setError(responseData.message);
      return;
    }

    setData({
      tag: '',
      description: '',
      url: ''
    });
    setError('');
    setShowDialog(false);
    updateLinks();
    toast({
      title: 'New link Created',
      description: `New short link created: ${process.env.NEXTAUTH_URL!}/${responseData.tag}`,
    })
  }

  return (
    <LinkDialog
      data={data}
      setData={setData}
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      error={error}
      handleSubmit={createLink}
    >
      <span className='text-3xl'>
        +
      </span>
    </LinkDialog>
  )
}
