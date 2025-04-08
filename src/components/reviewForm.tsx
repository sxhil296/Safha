import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ReviewForm() {
  return (
    <div className="w-full flex items-center gap-4">
      <Input
        className="border-none outline-none px-4 py-2"
        placeholder="Write a review..."
      />
      <Button>Submit</Button>
    </div>
  );
}
