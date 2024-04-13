import Link from "next/link";
import { Table, TableHead, TableHeader, TableRow } from "./ui/table";
import { useState } from "react";
import { LinkDocument } from "@/models/Link";
import { Button } from "./ui/button";
import { DialogFooter, DialogHeader, DialogTitle, Dialog, DialogContent, DialogDescription } from "./ui/dialog";
import { useToast } from "./ui/use-toast";
import LinkTableBody from "./LinkTableBody";
import { LinkDataProps } from "@/lib/interfaces";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface LinkTableProps {
  userId: string|undefined;
  links: LinkDocument[];
  updateLinks: () => void;
}

export const LinkTable = ({ userId, links, updateLinks }: LinkTableProps) => {

  const { toast } = useToast();

  const [showDelete, setShowDelete] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [tagToDelete, setTagToDelete] = useState('');
  const [editData, setEditData] = useState<LinkDataProps>({
    tag: '',
    description: '',
    url: '',
  })
  const [error, setError] = useState("");

  const deleteLink = async () => {
    const response = await fetch(`/api/links/${tagToDelete}`, {
      method: 'DELETE',
    });

    if(!response.ok) {
      toast({
        variant: 'destructive',
        title: 'Failed to delete short link',
        description: `Could not delete short link with tag "${tagToDelete}"`
      });
      return;
    }
    toast({
      title: 'Successfully deleted short link',
      description: `Short link with tag "${tagToDelete}" has been deleted`
    });
    updateLinks();
    setShowDelete(false);
    setTagToDelete('');
  }

  const initShowEditDialog = (shortlink: LinkDocument) => {
    setShowEditDialog(true);
    setEditData({
      tag: shortlink.tag,
      description: shortlink.description,
      url: shortlink.url,
    })
  }

  const submitEditData = async () => {
    if(editData.tag.trim() === '' || editData.description.trim() === '' || editData.url.trim() === '') {
      setError("Fields cannot be empty");
      return;
    }

    const response = await fetch(`/api/links/${editData.tag}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: editData.description,
        url: editData.url,
      }),
    })

    const json = await response.json();

    if(response.ok) {
      setShowEditDialog(false);

      setEditData({
        tag: '',
        description: '',
        url: ''
      });

      toast({
        variant: 'default',
        description: json.message,
      });
      return;
    }

    setError(json.message);

  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left w-[100px]">Tag</TableHead>
          <TableHead className="text-left">Description</TableHead>
          <TableHead className="text-left w-[20%]">URL</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <LinkTableBody userId={userId} linkData={links} setShowDelete={setShowDelete} setTagToDelete={setTagToDelete} initShowEditDialog={initShowEditDialog} />
      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tag</DialogTitle>
            <DialogDescription>
              Are you sure that you want to delete the short link with the tag &quot;{tagToDelete}&quot;?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => {setShowDelete(false); setTagToDelete('')}}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={deleteLink}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit a link</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className={'grid grid-cols-4 items-center gap-4'}>
              <Label htmlFor='name' className='text-right'>Tag</Label>
              <Input className='col-span-3' id='name' value={editData.tag} disabled={true} />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='description' className='text-right'>Description</Label>
              <Textarea className='col-span-3' id='description' value={editData.description} onChange={(e) => setEditData({...editData, description: e.target.value })} />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='url' className='text-right'>URL</Label>
              <Input className='col-span-3' id='url' value={editData.url} onChange={(e) => setEditData({...editData, url: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button className='text-right' onClick={submitEditData} variant="outline">
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Table>
  )
}

