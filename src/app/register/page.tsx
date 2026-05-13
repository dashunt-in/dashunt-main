import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Join Dashunt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" type="email" placeholder="hunter@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">Create Account</Button>
          <p className="text-sm text-center text-gray-500">
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
