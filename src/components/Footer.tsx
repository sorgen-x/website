import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "产品",
    links: [
      { label: "Aether", href: "#gallery" },
      { label: "材质与色彩", href: "#configure" },
    ],
  },
  {
    title: "服务",
    links: [
      { label: "预约体验", href: "#contact" },
      { label: "联系我们", href: "#contact" },
    ],
  },
  {
    title: "公司",
    links: [{ label: "关于溯元", href: "#about" }],
  },
  {
    title: "合规",
    links: [
      { label: "隐私政策", href: "/privacy", isRoute: true },
      { label: "用户协议", href: "/terms", isRoute: true },
      { label: "声明", href: "#disclaimer" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="col-span-2">
            <span className="text-xl font-semibold text-foreground tracking-wide">SORGEN</span>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
              溯元求索。家用恢复舱 Aether，由深圳溯元求索智能科技有限公司打造。
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-medium text-foreground mb-4 text-sm">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} 深圳溯元求索智能科技有限公司 SORGEN. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">粤ICP备2026062623号</p>
        </div>
      </div>
    </footer>
  );
}
