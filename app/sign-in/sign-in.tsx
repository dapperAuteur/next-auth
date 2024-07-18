"use client"
// import { signIn } from "@/auth";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('formData :>> ', formData);
        await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          callbackUrl: `${window.location.origin}/dashboard`,
          redirect: false
        });
      }}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
  )
}