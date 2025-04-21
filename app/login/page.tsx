import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { signIn } from '@/lib/auth';

export default function LoginPage() {
  const signInWithGithub = async () => {
    'use server';
    await signIn('github', {
      redirectTo: '/'
    });
  };

  const signInWithGoogle = async () => {
    'use server';
    await signIn('google', {
      redirectTo: '/'
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            This demo uses GitHub for authentication.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form className="w-full" action={signInWithGithub}>
            <Button type="submit" className="w-full">
              Sign in with GitHub
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            This demo uses GitHub for authentication.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form className="w-full" action={signInWithGoogle}>
            <Button type="submit" className="w-full">
              Sign in with Google
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
