import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex h-[calc(100vh_-_58px)] gap-5 items-center justify-center flex-col">
      <h1 className="text-4xl font-bold">404</h1>
      <h1 className="text-4xl font-bold">Page Not found</h1>
      <p>The Page You're Looking Doesn't Exist or Has Been Moved.</p>
      <Button asChild>
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  );
}

export default NotFound;
