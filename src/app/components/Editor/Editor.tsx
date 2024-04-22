"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { NotebookPen, Pencil } from "lucide-react";
import useNotes from "@/app/hooks/useNotes";

type Props = {
  id?: string;
};

const Editor = ({ id }: Props) => {
  const [open, setOpen] = useState(false);
  const isNew = id === undefined;

  const { pushNote, pickNote, updateNote } = useNotes();

  const note = isNew ? null : pickNote(id);

  const refs = {
    titleRef: useRef<HTMLInputElement>(null),
    noteRef: useRef<HTMLTextAreaElement>(null),
  };

  const { titleRef, noteRef } = refs;

  const handleClick = () => {
    if (!titleRef?.current?.value || !noteRef?.current?.value) {
      return;
    }

    if (isNew) {
      pushNote({
        id: uuidv4(),
        title: titleRef?.current?.value,
        content: noteRef?.current?.value,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    } else {
      updateNote(id, {
        ...note,
        title: titleRef?.current?.value,
        content: noteRef?.current?.value,
        updatedAt: Date.now(),
      });
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger>
        {isNew ? (
          <div className="flex items-center gap-x-1 rounded-md bg-black text-white p-2  absolute bottom-4 right-4">
            <span className="flex items-center px-2 gap-x-2">
              <NotebookPen className="h-4 w-4" />
              <span className="text-sm">New</span>
            </span>
          </div>
        ) : (
          <div className=" bg-black text-white p-1 rounded-md  cursor-pointer opacity-80">
            <span className="flex items-center px-2 gap-x-1">
              <Pencil className="h-3 w-3" />{" "}
              <span className="text-sm">Edit</span>
            </span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">
            {isNew ? "Create new note" : "Edit note"}
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-y-4">
              <Input
                defaultValue={note?.title}
                ref={titleRef}
                placeholder="Enter your title"
              />
              <Textarea
                ref={noteRef}
                defaultValue={note?.content}
                rows={10}
                placeholder="Enter your content"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleClick} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Editor;
