import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const NotesContext = createContext<any>([]);

function NotesContextProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<unknown[]>([]);

  const { get, set, push, pull, update, pick } = useLocalStorage();

  function getNotes() {
    const notes = get("notes");
    setNotes(notes);
  }

  function pushNote(note: unknown) {
    const _newNotes = push("notes", note);
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  }

  function pullNote(id: string) {
    const _newNotes = pull("notes", id);

    setNotes((prevNotes) => {
      return prevNotes.filter((note: any) => note.id !== id);
    });
  }

  function updateNote(id: string, value: unknown) {
    const _newNotes = update("notes", id, value);

    setNotes((prevNotes) => {
      return prevNotes.map((note: any) => {
        if (note.id === id) {
          return value;
        }

        return note;
      });
    });
  }

  function pickNote(id: string) {
    const _pickedNote = pick("notes", id);

    return _pickedNote;
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{ notes, pushNote, pullNote, updateNote, pickNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesContextProvider;
