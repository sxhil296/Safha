"use client"
import { Button } from "@/components/ui/button"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, FileText, LoaderCircle, Upload, User } from "lucide-react"
import { UploadButton } from "@/utils/uploadthing"
import { useState } from "react"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"

const initialFormState = {
  title: "",
  author: "",
  description: "",
  category: "",
  book: "",
  cover: "",
}

export default function AddBookForm() {
  const [bookForm, setBookForm] = useState(initialFormState)
  const [loading, setLoading] = useState<boolean>(false)
  // const [bookCover, setBookCover] = useState("")
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    book: "",
    cover: "",
  })

  const handleBookFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  const handleBookFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const newErrors = {
      title: "",
      author: "",
      category: "",
      description: "",
      book: "",
      cover: "",
    }

    if (!bookForm.title.trim()) newErrors.title = "Book Title is required."
    if (!bookForm.author.trim()) newErrors.author = "Author Name is required."
    if (!bookForm.category.trim()) newErrors.category = "Book Category is required."
    if (!bookForm.description.trim()) newErrors.description = "Book Description is required."
    if (!bookForm.book.trim()) newErrors.book = "Book PDF is required."
    if (!bookForm.cover.trim()) newErrors.cover = "Book Cover image is required."

    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error !== "")) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookForm),
      })
      if (response.ok) {
        setBookForm(initialFormState)
        toast.success("Book has been added successfully!")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong, please try again.")
    } finally {
      setLoading(false)
    }

    console.log(bookForm)
  }

  return (
    <div className="w-full max-w-4xl mx-auto shadow-md">
  
        <div className="text-2xl flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Add New Book
        </div>
        <div>Fill in the details below to add a new book to the library</div>

      <div className="pt-6">
        <form className="flex flex-col w-full items-start gap-4 md:gap-6" onSubmit={handleBookFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Title
                <span className="text-destructive text-lg">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={bookForm.title}
                onChange={handleBookFormChange}
                placeholder="Title of the book"
                className={`w-full ${errors.title ? "border-destructive" : ""}`}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Author
                <span className="text-destructive text-lg">*</span>
              </Label>
              <Input
                id="author"
                name="author"
                value={bookForm.author}
                onChange={handleBookFormChange}
                placeholder="Author of the book"
                className={`w-full ${errors.author ? "border-destructive" : ""}`}
              />
              {errors.author && <p className="text-sm text-destructive">{errors.author}</p>}
            </div>
          </div>

          <div className="w-full space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2" htmlFor="category">
              <BookOpen className="h-4 w-4" />
              Book Category <span className="text-destructive text-lg">*</span>
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
                className={`w-full ${errors.category ? "border-destructive" : ""}`}
                name="category"
                id="category"
              >
                <SelectValue placeholder="Select book category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="religion">Religion</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="fiction">Fiction</SelectItem>
                  <SelectItem value="self-help">Self-Help</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="Description" className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Description
              <span className="text-destructive text-lg">*</span>
            </Label>
            <Textarea
              id="Description"
              name="description"
              value={bookForm.description}
              onChange={handleBookFormChange}
              placeholder="Description of the book"
              className={`w-full min-h-[120px] ${errors.description ? "border-destructive" : ""}`}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>

          <Separator className="my-2" />

          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <div className="space-y-2">
              <Label htmlFor="book" className="text-sm font-medium flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Book PDF
                <span className="text-destructive text-lg">*</span>
              </Label>
              <div className={`border rounded-md p-1 ${errors.book ? "border-destructive" : "border-input"}`}>
                <UploadButton
                  endpoint="pdfUploader"
                  onClientUploadComplete={(res) => {
                    console.log(res)
                    setBookForm((prev) => ({
                      ...prev,
                      book: res[0].ufsUrl,
                    }))
                    setErrors((prev) => ({
                      ...prev,
                      book: "",
                    }))
                    toast.success("PDF uploaded successfully!")
                  }}
                  onUploadError={(error: Error) => {
                    console.log(`ERROR! ${error.message}`)
                    toast.error("Failed to upload PDF. Please try again.")
                  }}
                  className="w-full"
                />
              </div>
              {bookForm.book && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  PDF uploaded successfully
                </p>
              )}
              {errors.book && <p className="text-sm text-destructive">{errors.book}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover" className="text-sm font-medium flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Cover Image
                <span className="text-destructive text-lg">*</span>
              </Label>
              <div className={`border rounded-md p-1 ${errors.cover ? "border-destructive" : "border-input"}`}>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log(res)
                    setBookForm((prev) => ({
                      ...prev,
                      cover: res[0].ufsUrl,
                    }))
                    setErrors((prev) => ({
                      ...prev,
                      cover: "",
                    }))
                    toast.success("Cover image uploaded successfully!")
                  }}
                  onUploadError={(error: Error) => {
                    console.log(`ERROR! ${error.message}`)
                    toast.error("Failed to upload image. Please try again.")
                  }}
                  className="w-full"
                />
              </div>
              {bookForm.cover && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  Cover image uploaded successfully
                </p>
              )}
              {errors.cover && <p className="text-sm text-destructive">{errors.cover}</p>}
            </div>
          </div>

          <Button className="cursor-pointer w-full mt-4 relative h-12" disabled={loading} type="submit">
            {!loading && (
              <span className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Upload Book
              </span>
            )}
            {loading && (
              <span className="flex justify-center items-center gap-2">
                <LoaderCircle className="animate-spin h-5 w-5" />
                Uploading...
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

