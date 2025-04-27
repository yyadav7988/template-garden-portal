
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { getTemplateById, getTemplateCategories } from "@/data/templates";
import { ArrowLeft, Save, Trash, Upload } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Template } from "@/types";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  category: z.string({ required_error: "Please select a category." }),
  isPublished: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const TemplateEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [template, setTemplate] = useState<Template | null>(null);
  const categories = getTemplateCategories();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      isPublished: false,
    },
  });

  useEffect(() => {
    if (id) {
      const templateData = getTemplateById(id);
      if (templateData) {
        setTemplate(templateData);
        setPreviewImage(templateData.image);
        form.reset({
          name: templateData.name,
          description: templateData.description,
          category: templateData.category,
          isPublished: templateData.isPublished,
        });
      } else {
        toast.error("Template not found");
        navigate("/templates");
      }
    }
  }, [id, navigate, form]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message and redirect
      toast.success("Template updated successfully!");
      navigate("/templates");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Template deleted successfully!");
      navigate("/templates");
    } catch (error) {
      toast.error("Failed to delete template");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!template) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading template...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Template</h1>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                template and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Template Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter template name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter a description for your template"
                                  className="min-h-32 resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="isPublished"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Publish Template</FormLabel>
                                <p className="text-sm text-muted-foreground">
                                  Make this template visible to users
                                </p>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardContent className="pt-6">
                      <FormItem>
                        <FormLabel>Template Preview</FormLabel>
                        <div className="mt-2">
                          <div className="border-2 border-dashed rounded-lg p-4 text-center bg-muted/30">
                            {previewImage ? (
                              <div className="relative aspect-video w-full overflow-hidden rounded-md">
                                <img
                                  src={previewImage}
                                  alt="Template preview"
                                  className="object-cover"
                                />
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  className="absolute bottom-2 right-2"
                                  onClick={() => setPreviewImage(null)}
                                >
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <div className="py-8">
                                <div className="flex flex-col items-center gap-2">
                                  <Upload className="h-8 w-8 text-muted-foreground" />
                                  <p className="text-sm font-medium">
                                    Drag & drop an image here
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    PNG, JPG or GIF, max 2MB
                                  </p>
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => document.getElementById("image-upload")?.click()}
                                  >
                                    Choose File
                                  </Button>
                                  <Input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </FormItem>

                      <div className="mt-6 space-y-2 text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Created</span>
                          <span className="font-medium">
                            {new Date(template.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Last updated</span>
                          <span className="font-medium">
                            {new Date(template.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Status</span>
                          <span className="font-medium">
                            {template.isPublished ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/templates")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="html">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">HTML Template Code</h3>
                <div className="relative">
                  <Textarea
                    className="h-96 font-mono text-sm"
                    placeholder={`<!DOCTYPE html>
<html>
<head>
    <title>Template</title>
    <link rel='stylesheet' href='styles.css'>
</head>
<body>
    <header>
        <h1>Template Header</h1>
        <nav>
            <ul>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>About</a></li>
                <li><a href='#'>Services</a></li>
                <li><a href='#'>Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class='hero'>
            <h2>Welcome to our Website</h2>
            <p>This is a template for your website.</p>
        </section>
    </main>
    <footer>
        <p>© 2025 Template Garden</p>
    </footer>
    <script src='script.js'></script>
</body>
</html>`}
                  />
                </div>
                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save HTML
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="css">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">CSS Template Code</h3>
                <div className="relative">
                  <Textarea
                    className="h-96 font-mono text-sm"
                    placeholder={`/* Main Styles */
body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
    line-height: 1.6;
}

header {
    background-color: #f8f8f8;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

nav ul {
    display: flex;
    list-style: none;
    padding: 0;
}

nav li {
    margin-right: 1rem;
}

nav a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
}

.hero {
    padding: 4rem 2rem;
    text-align: center;
    background-color: #e9f5ff;
}

footer {
    padding: 1rem;
    text-align: center;
    background-color: #f8f8f8;
    margin-top: 2rem;
}`}
                  />
                </div>
                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save CSS
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="js">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">JavaScript Template Code</h3>
                <div className="relative">
                  <Textarea
                    className="h-96 font-mono text-sm"
                    placeholder={`// Main JavaScript file for the template
document.addEventListener('DOMContentLoaded', function() {
    console.log('Template loaded!');
    
    // Example: Toggle mobile navigation
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Example: Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});`}
                  />
                </div>
                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save JavaScript
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplateEditPage;
