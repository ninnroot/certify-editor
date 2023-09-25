import Link from "next/link";

import { cn } from "@/lib/utils";
import { adminRoutes } from "@/config/nav-routes";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6 max-md:hidden",
        className
      )}
      {...props}
    >
      {adminRoutes.map((i, index) => (
        <Link
        key={index}
          href={i.href}
          className={cn(
            // checking the current path and if the link item's href === current path, then, highlight the link item.
            !(i.href === "/" && pathname === "/"
              ? true
              : pathname.startsWith(i.href) && i.href !== "/")
              ? "text-md font-medium transition-colors text-muted-foreground hover:text-primary"
              : "text-md font-medium transition-colors hover:text-primary"
          )}
        >
          {i.title}
        </Link>
      ))}
    </nav>
  );
}
