import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useEffect, useState } from "react";
import { LinkDocument } from "@/models/Link";
import { Button } from "./ui/button";
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { DialogFooter, DialogHeader, DialogTitle, Dialog, DialogContent, DialogDescription } from "./ui/dialog";
import { useToast } from "./ui/use-toast";

export const LinkTable = ({ userId }: {userId: string}) => {

  const [links, setLinks] = useState<LinkDocument[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await fetch('/api/links', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(!response.ok) {
        return;
      }
      const data = await response.json();
      setLinks(data);
    }
    fetchLinks();
  }, []);

  const [showDelete, setShowDelete] = useState(false);
  const [tagToDelete, setTagToDelete] = useState('');

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
    setShowDelete(false);
    setTagToDelete('');
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
      <TableBody>
        {links.map((shortlink) => (
          <TableRow key={shortlink.tag}>
            <TableCell className="text-left font-medium">{shortlink.tag}</TableCell>
            <TableCell className="text-left">{shortlink.description}</TableCell>
            <TableCell className="text-left w-[20%]">
              <Link href={shortlink.url} className="text-blue-300 hover:underline">
                {shortlink.url.length > 25 ? shortlink.url.substring(0, 25) + '...' : shortlink.url}
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <Button variant='link' className="text-white hover:text-yellow-400"><FaPencilAlt /></Button>
              <Button variant='link' className="text-white hover:text-red-400"><FaRegTrashAlt onClick={() => { setShowDelete(true); setTagToDelete(shortlink.tag); }} /></Button>
            </TableCell>
          </TableRow>
        ))
        }
      </TableBody>
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
    </Table>
  )
}