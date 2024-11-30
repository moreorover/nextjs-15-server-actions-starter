import { AirVent } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default async function Navbar() {
  return (
    <div className="border-b px-4">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <Link href="/" className="flex items-center gap-2">
          <AirVent className="h-6 w-6" />
          <span className="font-bold">nextsecure.</span>
        </Link>
        <div>
          <Link href="/signin" className={buttonVariants()}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
