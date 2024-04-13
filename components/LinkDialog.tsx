import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { LinkDataProps } from "@/lib/interfaces";
import { ReactNode } from "react";

interface LinkDialogProps {
  children: ReactNode;
  data: LinkDataProps;
  setData: (data: LinkDataProps) => void;
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  error: string;
  handleSubmit: () => void;
}

export default function LinkDialog({children, data, setData, showDialog, setShowDialog, error, handleSubmit }: LinkDialogProps) {
  return(
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger className='float-end'>
        {children}
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
          <Button className='text-right' onClick={handleSubmit} variant="outline">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
