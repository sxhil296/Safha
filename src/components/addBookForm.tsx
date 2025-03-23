"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoaderCircle } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { toast } from "sonner";

const initialFormState = {
  title: "",
  author: "",
  description: "",
  category: "",
  book: "",
};

export default function AddBookForm() {
  const [bookForm, setBookForm] = useState(initialFormState);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    book: "",
  });

  const handleBookFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleBookFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let newErrors = {
      title: "",
      author: "",
      category: "",
      description: "",
      book: "",
    };

    if (!bookForm.title.trim()) newErrors.title = "Book Title is required.";
    if (!bookForm.author.trim()) newErrors.author = "Author Name is required.";
    if (!bookForm.category.trim())
      newErrors.category = "Book Category is required.";
    if (!bookForm.description.trim())
      newErrors.description = "Book Description is required.";
    if (!bookForm.book.trim()) newErrors.book = "Book PDF  is required.";

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookForm),
      });
      if (response.ok) {
        setBookForm(initialFormState);
        toast("Book has been added.");
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }

    console.log(bookForm);
  };

  return (
    <form
      className="flex flex-col w-full max-w-[500px] items-start gap-5 mx-auto"
      onSubmit={handleBookFormSubmit}
    >
      <div className="flex flex-col gap-1 items-start w-full">
        <Label htmlFor="title" className="text-sm font-medium">
          Title
          <span className="text-red text-lg">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          value={bookForm.title}
          onChange={handleBookFormChange}
          placeholder="Title of the book"
          className="w-full rounded"
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label htmlFor="author" className="text-sm font-medium">
          Author
          <span className="text-red text-lg">*</span>
        </Label>
        <Input
          id="author"
          name="author"
          value={bookForm.author}
          onChange={handleBookFormChange}
          placeholder="Author of the book"
          className="w-full rounded"
        />
        {errors.author && (
          <p className="text-sm text-red-500">{errors.author}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label className="text-sm font-medium" htmlFor="category">
          Book Category <span className="text-red text-lg">*</span>
        </Label>
        <Select
          name="category"
          value={bookForm.category}
          onValueChange={(value) =>
            setBookForm((prev) => ({
              ...prev,
              category: value,
            }))
          }
        >
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
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label htmlFor="Description" className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id="Description"
          name="description"
          value={bookForm.description}
          onChange={handleBookFormChange}
          placeholder="Description of the book"
          className="w-full rounded"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 items-start w-full">
        <Label htmlFor="book" className="text-sm font-medium">
          Book PDF
          <span className="text-red text-lg">*</span>
        </Label>
        <UploadButton
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            console.log(res);
            setBookForm((prev) => ({
              ...prev,
              book: res[0].ufsUrl,
            }));
            setErrors((prev) => ({
              ...prev,
              book: "",
            }));
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          className="w-full rounded border border-input px-4 py-2"
        />
        {errors.book && <p className="text-sm text-red-500">{errors.book}</p>}
      </div>
      <Button
        className="cursor-pointer w-full disabled:bg-muted"
        disabled={loading}
        type="submit"
      >
        <span>Upload Book</span>
        {loading && (
          <span className="flex justify-center items-center absolute w-full h-full text-slate-400">
            <LoaderCircle className="animate-spin" />
          </span>
        )}
      </Button>
    </form>
  );
}
