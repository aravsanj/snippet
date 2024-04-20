"use client";
import Editor from "./components/Editor/Editor";
import Notes from "./components/Note/Notes";

export default function Home() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen bg-[#f5f5f5] p-20">
      <Notes />
      <Editor />
    </main>
  );
}
