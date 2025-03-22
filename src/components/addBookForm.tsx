"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FileUpload } from "./ui/file-upload";
import { LoaderCircle } from "lucide-react";

export default function AddBookForm() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <form className="flex flex-col max-w-[500px] items-start gap-5 mx-auto">
      <div className="flex flex-col gap-1 items-start w-full">
        <Label htmlFor="title" className="text-sm font-medium">
          Title
          <span className="text-red text-lg">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="Title of the book"
          className="w-full rounded"
        />
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label htmlFor="author" className="text-sm font-medium">
          Author
          <span className="text-red text-lg">*</span>
        </Label>
        <Input
          id="author"
          name="author"
          placeholder="Author of the book"
          className="w-full rounded"
        />
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label className="text-sm font-medium" htmlFor="bookCategory">
          Book Category <span className="text-red text-lg">*</span>
        </Label>
        <Select>
          <SelectTrigger
            className="w-full rounded"
            id="bookCategory"
            name="bookCategory"
          >
            <SelectValue placeholder="Select book category" />
          </SelectTrigger>
          <SelectContent className="rounded">
            <SelectGroup>
              <SelectItem value="relegion">Relegion</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="self-help">Self-Help</SelectItem>
              <SelectItem value="history">History</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label htmlFor="Description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="Description"
          name="Description"
          placeholder="Description of the book"
          className="w-full rounded"
        />
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label htmlFor="book" className="text-sm font-medium">
          Book PDF
          <span className="text-red text-lg">*</span>
        </Label>

        <div className="h-[300px] border rounded-md border-input overflow-hidden">
          <FileUpload onChange={handleFileUpload} />
        </div>
      </div>
      <Button
        className="cursor-pointer w-full disabled:bg-muted"
        //   disabled={}
      >
        <span>Upload Book</span>
        {/* {isPending && (
            <span className="flex justify-center items-center absolute w-full h-full text-slate-400">
              <LoaderCircle className="animate-spin" />
            </span>
          )} */}
      </Button>
    </form>
  );
}
