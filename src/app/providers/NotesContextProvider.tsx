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
  const [tag, setTag] = useState<string>("");

  const { get, set, push, pull, update, pick } = useLocalStorage();

  function getNotes() {
    const notes = get("notes");
    setNotes(notes);
  }

  function pushNote(note: unknown) {
    const _newNotes = push("notes", note);
    setNotes((prevNotes) => {
      return [note, ...prevNotes];
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

  function search(term: string) {
    if (!term) {
      getNotes();
    }

    const _term = term.toLowerCase();

    setNotes((prev: any) => {
      return prev.filter((note: any) => {
        return (
          note.content.toLowerCase().includes(_term) ||
          note.title.toLowerCase().includes(_term)
        );
      });
    });
  }

  function filterByTag(tag: string) {
    getNotes();

    setTag(tag);

    const _tag = tag.toLowerCase();

    setNotes((prev: any) => {
      return prev.filter((prev: any) => {
        return prev.tags.find((tag: any) => tag.value.toLowerCase() === _tag);
      });
    });
  }

  function resetTag() {
    setTag("");
    getNotes();
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
      value={{
        notes,
        tag,
        resetTag,
        pushNote,
        pullNote,
        updateNote,
        pickNote,
        search,
        filterByTag,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesContextProvider;
