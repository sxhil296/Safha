'use client'
import Container from "@/components/layout/container";



import AddBookForm from "@/components/addBookForm";




export default function AddBookPage() {


 

  return (
    <div className="w-full mt-20">
      <Container className="flex flex-col gap-5">
        <div>Add Book</div>
       <AddBookForm />
      </Container>
    </div>
  );
}
