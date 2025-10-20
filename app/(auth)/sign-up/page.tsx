"use client";

import { signUpSchema } from "@/lib/validations";
import AuthForm from "@/components/auth-form";
import { signUp } from "@/lib/actions/auth";

const Page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    ></AuthForm>
  );
};

export default Page;
