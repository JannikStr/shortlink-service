import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useToast } from './ui/use-toast';

export const AddLink = ({ updateLinks }: { updateLinks: () => void }) => {
  const [data, setData] = useState({
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
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger className='float-end'>
        <span className='text-3xl'>
          +
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Shortlink</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>

          <div className={cn('grid grid-cols-4 items-center gap-4', { 'text-red-700': error })}>
            <Label htmlFor='name' className='text-right'>Tag</Label>
            <Input className='col-span-3' id='name' value={data.tag} onChange={(e) => setData({...data, tag: e.target.value })} />
            {error && (
              <span className='text-sm col-start-2 col-span-3 text-red-700'>{error}</span>
            )}
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>Description</Label>
            <Textarea className='col-span-3' id='description' value={data.description} onChange={(e) => setData({...data, description: e.target.value })} />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='url' className='text-right'>URL</Label>
            <Input className='col-span-3' id='url' value={data.url} onChange={(e) => setData({...data, url: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button className='text-right' onClick={createLink} variant="outline">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
