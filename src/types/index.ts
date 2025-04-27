
export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  image: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export type TemplateCategory = 'e-commerce' | 'portfolio' | 'blog' | 'business' | 'personal' | 'landing' | 'other';

export interface TemplateFilters {
  category?: TemplateCategory | 'all';
  searchQuery?: string;
  sortBy?: 'newest' | 'oldest' | 'name';
}
