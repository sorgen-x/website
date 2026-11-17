import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

const NotFound = () => {
  usePageMeta({
    title: "页面不存在 | SORGEN",
    description: "您访问的页面不存在。",
    path: null,
    robots: "noindex",
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">页面不存在</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
