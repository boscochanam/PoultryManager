import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button variant="outline">Sign Out</Button>
    </form>
  );
}
