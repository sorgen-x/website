import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "产品",
    links: [
      { label: "Vitality Pod", href: "#solutions" },
      { label: "小元", href: "#technology" },
      { label: "Vitality App", href: "#solutions" },
    ],
  },
  {
    title: "服务",
    links: [
      { label: "预约体验", href: "#contact" },
      { label: "使用指南", href: "#" },
      { label: "常见问题", href: "#" },
      { label: "联系我们", href: "#contact" },
    ],
  },
  {
    title: "公司",
    links: [
      { label: "关于我们", href: "#" },
      { label: "新闻动态", href: "#" },
      { label: "加入我们", href: "#" },
    ],
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
          {/* Brand */}
          <div className="col-span-2">
            <span className="text-xl font-semibold text-foreground">Vitality</span>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
              您的私人家庭医生，24小时待命。把专业健康管理带进您的日常生活。
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              预测 · 预警 · 修复
            </p>
          </div>

          {/* Links */}
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

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} 深圳溯元求索智能科技有限公司 SORGEN. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            粤ICP备2026062623号
          </p>
        </div>
      </div>
    </footer>
  );
}
