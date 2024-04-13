import { LinkDocument } from "@/models/Link";
import { TableBody } from "./ui/table";
import LinkTableRow from "./LinkTableRow";

interface LinkTableBodyProps {
 userId: string|undefined;
  linkData: LinkDocument[];
  setShowDelete: (val: boolean) => void;
  setTagToDelete: (tag: string) => void;
  initShowEditDialog: (shortlink: LinkDocument) => void;
}

export default function LinkTableBody({ userId, linkData, setShowDelete, setTagToDelete, initShowEditDialog }: LinkTableBodyProps) {
  if(userId) {
    return (
      <TableBody>
        {linkData.map((shortlink) => (
          <LinkTableRow key={shortlink.tag} shortlink={shortlink} setShowDelete={setShowDelete} setTagToDelete={setTagToDelete} initShowEditDialog={initShowEditDialog} />
        ))
        }
      </TableBody>
    )
  }
  return (
    <TableBody>
      <LinkTableRow shortlink={undefined} setShowDelete={setShowDelete} setTagToDelete={setTagToDelete} initShowEditDialog={initShowEditDialog} />
    </TableBody>
  )
}

