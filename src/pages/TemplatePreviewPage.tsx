
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTemplateById } from "@/data/templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Edit, ExternalLink } from "lucide-react";
import { Template } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

const TemplatePreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const templateData = getTemplateById(id);
      if (templateData) {
        setTemplate(templateData);
      } else {
        toast.error("Template not found");
        navigate("/templates");
      }
      setLoading(false);
    }
  }, [id, navigate]);

  const handleDownload = () => {
    toast.success("Template download started!");
    // In a real application, this would trigger a download of the template files
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading template preview...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Template not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{template.name}</h1>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Badge variant="outline" className="capitalize">
          {template.category}
        </Badge>
        <Badge variant={template.isPublished ? "default" : "outline"}>
          {template.isPublished ? "Published" : "Draft"}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Last updated: {new Date(template.updatedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border overflow-hidden">
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Template Details</h2>
            <p className="text-muted-foreground mb-6">{template.description}</p>

            <div className="space-y-4">
              <Button className="w-full" onClick={() => navigate(`/templates/${id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Template
              </Button>
              <Button variant="outline" className="w-full" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Files
              </Button>
              <Button variant="secondary" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Preview
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <h3 className="font-medium mb-4">Template Information</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">Created</dt>
                <dd>{new Date(template.createdAt).toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">Last updated</dt>
                <dd>{new Date(template.updatedAt).toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">Status</dt>
                <dd>{template.isPublished ? "Published" : "Draft"}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">Category</dt>
                <dd className="capitalize">{template.category}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="preview">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-2 border-b flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-background/80 rounded-full px-4 py-1 text-xs">
                    https://www.template-preview.com
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 h-[500px] overflow-auto">
                <div className="flex justify-center">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="code" className="mt-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-2 border-b flex justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8">
                    HTML
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    CSS
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    JS
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="h-4 w-4 mr-2" />
                  Download Code
                </Button>
              </div>
              <div className="bg-muted/30 p-4 font-mono text-sm overflow-auto h-[500px]">
                <pre className="text-xs">{`<!DOCTYPE html>
<html>
<head>
    <title>${template.name}</title>
    <link rel="stylesheet" href="styles.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <header>
        <div class="container">
            <h1>${template.name}</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <h2>Welcome to Our Website</h2>
                <p>We create amazing digital experiences</p>
                <a href="#" class="btn">Get Started</a>
            </div>
        </section>

        <section class="features">
            <div class="container">
                <h2>Our Features</h2>
                <div class="feature-grid">
                    <div class="feature">
                        <h3>Feature 1</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div class="feature">
                        <h3>Feature 2</h3>
                        <p>Sed do eiusmod tempor incididunt ut labore et dolore.</p>
                    </div>
                    <div class="feature">
                        <h3>Feature 3</h3>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- More sections would go here -->
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 Template Garden. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`}</pre>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="assets" className="mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Template Assets</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-2">
                    <img
                      src={template.image}
                      alt="Asset 1"
                      className="max-h-full max-w-full object-cover rounded-md"
                    />
                  </div>
                  <p className="text-xs truncate">header-image.jpg</p>
                </div>
                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=300&q=80"
                      alt="Asset 2"
                      className="max-h-full max-w-full object-cover rounded-md"
                    />
                  </div>
                  <p className="text-xs truncate">feature-image.jpg</p>
                </div>
                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80"
                      alt="Asset 3"
                      className="max-h-full max-w-full object-cover rounded-md"
                    />
                  </div>
                  <p className="text-xs truncate">gallery-1.jpg</p>
                </div>
                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80"
                      alt="Asset 4"
                      className="max-h-full max-w-full object-cover rounded-md"
                    />
                  </div>
                  <p className="text-xs truncate">gallery-2.jpg</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TemplatePreviewPage;
