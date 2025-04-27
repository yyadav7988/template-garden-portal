
import { Template } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TemplateCardProps {
  template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="template-card animate-fade-in">
      <div className="template-card-image">
        <img
          src={template.image}
          alt={template.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{template.name}</h3>
          <Badge variant={template.isPublished ? "default" : "outline"}>
            {template.isPublished ? "Published" : "Draft"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {template.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>Updated: {formatDate(template.updatedAt)}</span>
          <Badge variant="outline" className="capitalize">
            {template.category}
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to={`/templates/${template.id}/preview`}>
              <Eye className="mr-1 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button size="sm" asChild className="flex-1">
            <Link to={`/templates/${template.id}/edit`}>
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
