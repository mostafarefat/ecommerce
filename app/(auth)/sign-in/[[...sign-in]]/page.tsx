import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-teal-600 hover:bg-teal-700 text-white font-medium",
          },
          layout: {
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "iconButton",
          },
        }}
      />
    </div>
  );
}
