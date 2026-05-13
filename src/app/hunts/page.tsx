import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function HuntsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Available Hunts</h1>
        <Button variant="outline">Filter</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((hunt) => (
          <Card key={hunt}>
            <CardHeader>
              <CardTitle>City Center Enigma #{hunt}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Explore the hidden secrets of downtown in this challenging GPS-based treasure hunt.
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>📍 5 Locations</span>
                <span>⭐ Medium Difficulty</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Join Hunt ($5.00)</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
