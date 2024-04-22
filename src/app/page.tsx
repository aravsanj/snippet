"use client";
import Editor from "./components/Editor/Editor";
import Notes from "./components/Note/Notes";
import NotesContextProvider from "./providers/NotesContextProvider";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-500 to-purple-900 px-40 p-20">
      <NotesContextProvider>
        <Notes />
        <Editor />
      </NotesContextProvider>
    </main>
  );
}
