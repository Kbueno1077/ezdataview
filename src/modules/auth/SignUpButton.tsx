import { SignUpButton } from "@clerk/nextjs";

export default function CustomSignUpButton() {
  return (
    <SignUpButton>
      <button className="flex cursor-pointer items-center gap-2 transition-all duration-300">
        <span className="font-medium">Sign up</span>
      </button>
    </SignUpButton>
  );
}
