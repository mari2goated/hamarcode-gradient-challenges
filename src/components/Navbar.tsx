import { Code2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Code2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            HamarCode
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/problems" className="text-muted-foreground hover:text-foreground transition-colors">
            Problems
          </Link>
          <Link to="/contests" className="text-muted-foreground hover:text-foreground transition-colors">
            Contests
          </Link>
          <Link to="/discuss" className="text-muted-foreground hover:text-foreground transition-colors">
            Discuss
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
          <Button variant="gradient" size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
