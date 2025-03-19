'use client'
import Container from "@/components/layout/container";
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
import { addBookAction, FormState,  } from "@/actions/book";
import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";



export default function AddBook() {
  const initialState: FormState = {
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    addBookAction,
    initialState
  );

  return (
    <div className="w-full mt-20">
      <Container className="flex flex-col gap-5">
        <div>Add Book</div>
        <Form
          className="flex flex-col max-w-[400px] items-start gap-5"
          action={formAction}
        >
          <div className="flex flex-col gap-2 items-start w-full">
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
              <p className="text-red text-sm">{state?.errors.title}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
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
              <p className="text-red text-sm">{state?.errors.author}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
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
            {state?.errors.bookCategory && (
              <p className="text-red text-sm">{state?.errors.bookCategory}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
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
          <div className="flex flex-col gap-2 items-start w-full">
            <Label htmlFor="book" className="text-sm font-medium">
              Book PDF
              <span className="text-red text-lg">*</span>
            </Label>
            <Input
              id="book"
              name="book"
              type="file"
              accept="application/pdf"
              className="w-full rounded appearance-none"
            />
            {state?.errors.bookPDF && (
              <p className="text-red text-sm">{state?.errors.bookPDF}</p>
            )}
          </div>
          <Button
            className="cursor-pointer w-full disabled:bg-muted"
            disabled={isPending}
          >
            <span className={isPending ? "text-transparent" : ""}>
              Upload Book
            </span>
            {isPending && (
              <span className="flex justify-center items-center absolute w-full h-full text-slate-400">
                <LoaderCircle className="animate-spin" />
              </span>
            )}
          </Button>
        </Form>
      </Container>
    </div>
  );
}
