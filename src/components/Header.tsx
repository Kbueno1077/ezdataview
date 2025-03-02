import Container from "@/components/Container";
import CustomSignInButton from "@/modules/auth/SignInButton";
import CustomSignUpButton from "@/modules/auth/SignUpButton";
import UserButtonClerk from "@/modules/auth/UserButtonClerk";
import { menuItems } from "@/modules/landing/data/menuItems";
import { siteDetails } from "@/modules/landing/data/siteDetails";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Fingerprint } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
      <Container className="px-0!">
        <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Fingerprint className="text-foreground min-w-fit w-7 h-7" />
            <span className="manrope text-xl font-semibold text-foreground cursor-pointer">
              {siteDetails.siteName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-foreground-accent transition-colors"
                >
                  {item.text}
                </Link>
              </li>
            ))}

            <>
              <SignedOut>
                <CustomSignInButton />
                <CustomSignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButtonClerk />
              </SignedIn>
            </>
          </ul>

          {/* Mobile Menu Button */}

          <div className="md:hidden flex items-center gap-2">
            <SignedOut>
              <CustomSignInButton />
              <CustomSignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButtonClerk />
            </SignedIn>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
