import { useContext } from "react";
import { NotesContext } from "../providers/NotesContextProvider";

function useNotes() {
  const context = useContext(NotesContext);
  return context;
}

export default useNotes;
