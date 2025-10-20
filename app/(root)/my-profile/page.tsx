import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { sampleBooks } from "@/constants";
import BookList from "@/components/book-list";

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};
export default Page;
