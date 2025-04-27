
import { Template, TemplateCategory } from "@/types";

export const templates: Template[] = [
  {
    id: "1",
    name: "Grün - Modern E-commerce",
    description: "A sleek and modern e-commerce template with a focus on sustainability and clean design.",
    category: "e-commerce",
    image: "/lovable-uploads/6e2ffd62-350b-44c0-9e3e-7004722d7886.png",
    createdAt: "2025-02-15T09:00:00.000Z",
    updatedAt: "2025-04-20T14:20:00.000Z",
    isPublished: true,
  },
  {
    id: "2",
    name: "Portfolio Collection",
    description: "Professional portfolio template for photographers and designers to showcase their work.",
    category: "portfolio",
    image: "/lovable-uploads/696e28e0-afba-4b27-b354-11332bc4b8ef.png",
    createdAt: "2025-01-10T11:30:00.000Z",
    updatedAt: "2025-04-15T16:45:00.000Z",
    isPublished: true,
  },
  {
    id: "3",
    name: "Business Service Pro",
    description: "Clean and professional template for service-based businesses.",
    category: "business",
    image: "/lovable-uploads/dbe24d65-b279-4c21-a4ca-4803046a7fb3.png",
    createdAt: "2025-03-05T10:15:00.000Z",
    updatedAt: "2025-04-10T09:30:00.000Z",
    isPublished: true,
  },
  {
    id: "4",
    name: "Lexington Restaurant",
    description: "Vibrant restaurant template with strong visual appeal for food businesses.",
    category: "business",
    image: "/lovable-uploads/90781a03-18dd-45c0-b717-2154868d31c7.png",
    createdAt: "2025-03-22T14:20:00.000Z",
    updatedAt: "2025-04-18T11:10:00.000Z",
    isPublished: true,
  },
  {
    id: "5",
    name: "Creative Artist",
    description: "Artistic template for creative professionals with unique layouts.",
    category: "portfolio",
    image: "/lovable-uploads/7660fe46-4315-438d-98d7-f5c18bf69160.png",
    createdAt: "2025-02-28T09:45:00.000Z",
    updatedAt: "2025-04-05T13:25:00.000Z",
    isPublished: true,
  },
  {
    id: "6",
    name: "Tech Blog",
    description: "Modern blog template designed for technology and innovation content.",
    category: "blog",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    createdAt: "2025-01-25T13:10:00.000Z",
    updatedAt: "2025-04-12T10:40:00.000Z",
    isPublished: true,
  },
  {
    id: "7",
    name: "Corporate Landing",
    description: "Professional landing page template for corporate businesses.",
    category: "landing",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    createdAt: "2025-03-10T08:30:00.000Z",
    updatedAt: "2025-04-08T15:20:00.000Z",
    isPublished: true,
  },
  {
    id: "8",
    name: "Personal Brand",
    description: "Template designed for personal branding and individual professionals.",
    category: "personal",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    createdAt: "2025-02-05T12:25:00.000Z",
    updatedAt: "2025-04-22T09:15:00.000Z",
    isPublished: true,
  },
];

export const getTemplateCategories = (): TemplateCategory[] => {
  return ["e-commerce", "portfolio", "blog", "business", "personal", "landing", "other"];
};

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((template) => template.id === id);
};

export const filterTemplates = (filters: {
  category?: string;
  searchQuery?: string;
  sortBy?: string;
}): Template[] => {
  let filtered = [...templates];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter((template) => template.category === filters.category);
  }

  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (template) =>
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query)
    );
  }

  // Sort templates
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
  }

  return filtered;
};
