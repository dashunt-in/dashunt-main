import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button>Create New Hunt</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">1,245</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Hunts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue (MTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$4,500</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Players</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">142</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Hunt Management</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-500">Hunt management data table will be rendered here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
