
import React from "react";
import { 
  FileImage, 
  Eye, 
  BarChart, 
  Clock,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { templates } from "@/data/templates";
import StatsCard from "@/components/dashboard/StatsCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const publishedTemplates = templates.filter(t => t.isPublished).length;
  const draftTemplates = templates.length - publishedTemplates;
  
  // Recent templates (5 most recent)
  const recentTemplates = [...templates]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);
    
  // Format date for display  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and monitor your website templates
          </p>
        </div>
        <Button asChild>
          <Link to="/templates/new">
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Templates"
          value={templates.length}
          icon={<FileImage className="h-5 w-5 text-primary" />}
          trend={{ value: 12, isPositive: true }}
          description="Total templates in your collection"
        />
        <StatsCard
          title="Published Templates"
          value={publishedTemplates}
          icon={<Eye className="h-5 w-5 text-primary" />}
          description="Templates visible to users"
        />
        <StatsCard
          title="Draft Templates"
          value={draftTemplates}
          icon={<Clock className="h-5 w-5 text-primary" />}
          description="Templates in development"
        />
        <StatsCard
          title="Template Views"
          value="2,458"
          icon={<BarChart className="h-5 w-5 text-primary" />}
          trend={{ value: 8.2, isPositive: true }}
          description="Total template views this month"
        />
      </div>

      {/* Recent Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Updated Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTemplates.map(template => (
              <div 
                key={template.id} 
                className="flex items-center justify-between p-3 bg-card hover:bg-accent/50 rounded-md transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden bg-muted">
                    <img 
                      src={template.image} 
                      alt={template.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Last updated: {formatDate(template.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/templates/${template.id}/preview`}>Preview</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/templates/${template.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" asChild>
              <Link to="/templates">View All Templates</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default Dashboard;
