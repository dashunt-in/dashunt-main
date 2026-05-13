import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Hunter Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Hunts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">2</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">1,250</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Global Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">#42</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-500">No recent activity found. Join a hunt to get started!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
