
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, BarChart3, Activity } from 'lucide-react'; // Added Activity icon
import { BUSINESS_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: `Admin dashboard for ${BUSINESS_NAME}.`,
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your site content and settings.</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Manage Services
            </CardTitle>
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-xs text-muted-foreground mb-4">
              Add, edit, or remove services offered.
            </CardDescription>
            <Button asChild size="sm">
              <Link href="/admin/services">Go to Services</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Users Online
            </CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              -- {/* Placeholder for active user count */}
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              Real-time data. (Integration required)
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              View Testimonials
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-xs text-muted-foreground mb-4">
              Review and manage client testimonials. (Coming Soon)
            </CardDescription>
            <Button size="sm" disabled>Manage Testimonials</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Site Analytics
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-xs text-muted-foreground mb-4">
              Overview of site traffic and performance. (Coming Soon)
            </CardDescription>
            <Button size="sm" disabled>View Analytics</Button>
          </CardContent>
        </Card>
      </section>
       <section className="pt-8">
          <Card>
            <CardHeader>
                <CardTitle>Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                    <strong>Authentication:</strong> This admin panel is currently not secured. In a production environment,
                    you MUST implement robust authentication and authorization to protect these routes.
                </p>
                <p>
                    <strong>Data Persistence:</strong> Changes made here are for UI demonstration only and will not be saved.
                    A proper backend and database are required to manage and persist data.
                </p>
                 <p>
                    <strong>Active User Count:</strong> The 'Active Users Online' card currently shows a placeholder. Real-time user tracking requires integration with an analytics service (e.g., Google Analytics) or a custom backend solution.
                </p>
            </CardContent>
          </Card>
       </section>
    </div>
  );
}
