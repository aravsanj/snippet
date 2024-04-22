import React from "react";
import SingleNote from "./SingleNote";
import useNotes from "@/app/hooks/useNotes";

type Props = {};

const Notes = (props: Props) => {
  const { notes } = useNotes();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {notes &&
        notes.map((note: any) => <SingleNote key={note.id} note={note} />)}
    </div>
  );
};

export default Notes;
