import { SignInButton } from "@clerk/nextjs";

export default function CustomSignInButton() {
  return (
    <SignInButton>
      <button className="flex items-center gap-2 cursor-pointer transition-all duration-300">
        <span className="font-medium">Log in</span>
      </button>
    </SignInButton>
  );
}
