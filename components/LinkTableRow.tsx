import { LinkDocument } from "@/models/Link";
import { TableCell, TableRow } from "./ui/table";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaCopy, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "./ui/use-toast";

interface LinkTableRowProps {
  shortlink: LinkDocument|undefined;
  setShowDelete: (visible: boolean) => void;
  setTagToDelete: (tag: string) => void;
  initShowEditDialog: (shortlink: LinkDocument) => void;
}

export default function LinkTableRow({ shortlink = undefined, setShowDelete = (_) => {}, setTagToDelete = (_) => {}, initShowEditDialog }: LinkTableRowProps) {
  const { toast } = useToast()
  if(shortlink) {
    const copyClipboard = () => {
      navigator.clipboard.writeText(`${process.env.BASE_URL}/${shortlink.tag}`);
      toast({
        description: `Copied "${process.env.BASE_URL}/${shortlink.tag}" to clipboard`,
      });
    }
    return (
      <TableRow>
        <TableCell className="text-left font-medium">{shortlink.tag}</TableCell>
        <TableCell className="text-left">{shortlink.description}</TableCell>
        <TableCell className="text-left w-[20%]">
          <Link href={shortlink.url} className="text-blue-300 hover:underline">
            {shortlink.url.length > 25 ? shortlink.url.substring(0, 25) + '...' : shortlink.url}
          </Link>
        </TableCell>
        <TableCell className="text-right">
          <Button variant='link' className="text-white hover:text-green-400" onClick={() => copyClipboard()}><FaCopy /></Button>
          <Button variant='link' className="text-white hover:text-yellow-400" onClick={() => initShowEditDialog(shortlink)}><FaPencilAlt /></Button>
          <Button variant='link' className="text-white hover:text-red-400"><FaRegTrashAlt onClick={() => { setShowDelete(true); setTagToDelete(shortlink.tag); }} /></Button>
        </TableCell>
      </TableRow>
    )
  }
  return (
    <TableRow>
      <TableCell className="text-left font-medium"><Skeleton className="h-2 w-full opacity-25" /></TableCell>
      <TableCell className="text-left"><Skeleton className="h-2 w-full opacity-25" /></TableCell>
      <TableCell className="text-left w-[20%]"><Skeleton className="h-2 w-full opacity-25" /></TableCell>
      <TableCell className="text-left"><Skeleton className="h-2 w-full opacity-25" /></TableCell>
    </TableRow>
  )
}
