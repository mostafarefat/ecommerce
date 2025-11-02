"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen py-5 bg-gray-50">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-teal-600 hover:bg-teal-700 text-white",
          },
        }}
      />
    </div>
  );
}
