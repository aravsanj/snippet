import React from "react";
import SingleNote from "./SingleNote";
import useNotes from "@/app/hooks/useNotes";
import { CircleX } from "lucide-react";

type Props = {};

const Notes = (props: Props) => {
  const { notes, tag, resetTag } = useNotes();

  return (
    <>
      {tag && (
        <p className="mb-2 flex items-center gap-x-2">
          Notes tagged <b className="font-bold">{tag}</b>
          <CircleX
            onClick={() => resetTag()}
            className="h-4 w-4 cursor-pointer"
          />
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10">
        {notes &&
          notes.map((note: any) => <SingleNote key={note.id} note={note} />)}
      </div>
    </>
  );
};

export default Notes;
