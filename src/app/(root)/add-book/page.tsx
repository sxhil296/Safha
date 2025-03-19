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
import { addBookAction } from "@/actions/book";

export default function AddBook() {
  return (
    <div className="w-full mt-20">
      <Container className="flex flex-col gap-5">
        <div>Add Book</div>
        <Form
          className="flex flex-col max-w-[400px] items-start gap-5"
          action={addBookAction}
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
          </div>
          <div className="flex flex-col gap-2 items-start w-full">
            <Label className="text-sm font-medium">Book Category <span className="text-red text-lg">*</span></Label>
            <Select>
              <SelectTrigger className="w-full rounded">
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
          </div>
          <Button className="cursor-pointer w-full">Upload Book</Button>
        </Form>
      </Container>
    </div>
  );
}
