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
import { useActionState, useState } from "react";

import { LoaderCircle } from "lucide-react";
import { addBookAction, FormState } from "@/actions/book";

export default function AddBookForm() {
  const initialState: FormState = {
    errors: {},
  };
  const [state, formAction, isPending] = useActionState(
    addBookAction,
    initialState
  );
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <Form
      className="flex flex-col w-full max-w-[500px] items-start gap-5 mx-auto"
      action={formAction}
    >
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
        {state?.errors.title && (
          <p className="text-sm text-red-500">{state?.errors.title}</p>
        )}
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
        {state?.errors.author && (
          <p className="text-sm text-red-500">{state?.errors.author}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label className="text-sm font-medium" htmlFor="category">
          Book Category <span className="text-red text-lg">*</span>
        </Label>
        <Select name="category">
          <SelectTrigger
            className="w-full rounded"
            name="category"
            id="category"
          >
            <SelectValue placeholder="Select book category" />
          </SelectTrigger>
          <SelectContent className="rounded">
            <SelectGroup>
              <SelectItem value="religion">Religion</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="fiction">Fiction</SelectItem>
              <SelectItem value="self-help">Self-Help</SelectItem>
              <SelectItem value="history">History</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {state?.errors.category && (
          <p className="text-sm text-red-500">{state?.errors.category}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label htmlFor="Description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="Description"
          name="description"
          placeholder="Description of the book"
          className="w-full rounded"
        />
        {state?.errors.description && (
          <p className="text-sm text-red-500">{state?.errors.description}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label htmlFor="book" className="text-sm font-medium">
          Book PDF
          <span className="text-red text-lg">*</span>
        </Label>
        <Input
          placeholder="Upload book pdf"
          className="appearance-none w-full rounded"
          type="file"
          accept=".pdf"
          name="book"
        />
        {state?.errors.bookPdf && (
          <p className="text-sm text-red-500">{state?.errors.bookPdf}</p>
        )}
      </div>
      <Button
        className="cursor-pointer w-full disabled:bg-muted"
        disabled={isPending}
      >
        <span>Upload Book</span>
        {isPending && (
          <span className="flex justify-center items-center absolute w-full h-full text-slate-400">
            <LoaderCircle className="animate-spin" />
          </span>
        )}
      </Button>
    </Form>
  );
}
