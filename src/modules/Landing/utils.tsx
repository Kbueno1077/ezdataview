import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";

import type { JSX } from "react";
export const getPlatformIconByName = (
  platformName: string
): JSX.Element | null => {
  switch (platformName) {
    case "facebook": {
      return <Facebook size={24} className="min-w-fit" />;
    }
    case "github": {
      return <Github size={24} className="min-w-fit" />;
    }
    case "instagram": {
      return <Instagram size={24} className="min-w-fit" />;
    }
    case "linkedin": {
      return <Linkedin size={24} className="min-w-fit" />;
    }
    case "threads": {
      // Lucide doesn't have a Threads icon, using Twitter as fallback
      return <Twitter size={24} className="min-w-fit" />;
    }
    case "twitter": {
      return <Twitter size={24} className="min-w-fit" />;
    }
    case "youtube": {
      return <Youtube size={24} className="min-w-fit" />;
    }
    case "x": {
      return <Twitter size={24} className="min-w-fit" />;
    }
    default:
      return null;
  }
};
