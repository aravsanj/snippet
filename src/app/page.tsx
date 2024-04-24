"use client";
import Editor from "./components/Editor/Editor";
import Notes from "./components/Note/Notes";
import NotesContextProvider from "./providers/NotesContextProvider";
import SearchInput from "./components/Search/SearchInput";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-500 to-purple-900 px-40 p-20">
      <NotesContextProvider>
        <SearchInput />
        <Notes />
        <Editor />
      </NotesContextProvider>
    </main>
  );
}
