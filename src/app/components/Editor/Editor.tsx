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
import { NotebookPen } from "lucide-react";

type Props = {};

const Editor = (props: Props) => {
  const [open, setOpen] = useState(false);

  const refs = {
    titleRef: useRef<HTMLInputElement>(null),
    noteRef: useRef<HTMLTextAreaElement>(null),
  };

  const { titleRef, noteRef } = refs;

  const handleClick = () => {
    if (!titleRef?.current?.value || !noteRef?.current?.value) {
      return;
    }

    const notes = JSON.parse(localStorage.getItem("notes") ?? "[]");

    notes.push({
      id: uuidv4(),
      title: titleRef?.current?.value,
      note: noteRef?.current?.value,
      createdAt: Date.now(),
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger>
        <div className="absolute bottom-4 right-4">
          <Button className="flex gap-x-2">
            <NotebookPen className="h-4 w-4" /> New
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Create new note</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-y-4">
              <Input ref={titleRef} placeholder="Enter your title" />
              <Textarea
                ref={noteRef}
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
