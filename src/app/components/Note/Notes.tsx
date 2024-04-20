import React from "react";
import SingleNote from "./SingleNote";

type Props = {};

const Notes = (props: Props) => {
  const notes = JSON.parse(localStorage.getItem("notes") ?? "[]");

  return (
    <>
      {notes.map((note: any) => (
        <SingleNote key={note.id} note={note} />
      ))}
    </>
  );
};

export default Notes;
