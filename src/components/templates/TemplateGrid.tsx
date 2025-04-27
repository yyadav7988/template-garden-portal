
import { Template, TemplateFilters } from "@/types";
import TemplateCard from "./TemplateCard";

interface TemplateGridProps {
  templates: Template[];
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates }) => {
  if (templates.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-muted/30 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-medium">No templates found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your filters or create a new template
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
};

export default TemplateGrid;
