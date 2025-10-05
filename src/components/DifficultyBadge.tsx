import { Badge } from "@/components/ui/badge";

interface DifficultyBadgeProps {
  difficulty: "Easy" | "Medium" | "Hard";
}

const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const variantMap = {
    Easy: "success" as const,
    Medium: "warning" as const,
    Hard: "destructive" as const,
  };

  return (
    <Badge variant={variantMap[difficulty]}>
      {difficulty}
    </Badge>
  );
};

export default DifficultyBadge;
