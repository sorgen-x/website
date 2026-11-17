import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Terms() {
  usePageMeta({
    title: "用户协议 | SORGEN",
    description: "SORGEN 用户协议：本网站介绍 Aether 并接受预约体验咨询的使用条款。",
    path: "/terms",
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 flex items-center px-6 border-b border-border/50">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">返回首页</span>
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">用户协议</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground">最后更新日期：2026年11月17日</p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. 服务说明</h2>
            <p>
              欢迎访问 SORGEN 官方网站。本网站由深圳溯元求索智能科技有限公司（简称“溯元”）运营，用于介绍家用恢复舱 Aether 及 SORGEN 品牌，并接收预约体验咨询。使用本网站即表示您同意本用户协议。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. 网站内容</h2>
            <p>
              本网站提供产品介绍，并接受预约体验咨询。提交表单不构成订单或服务合约，我们会通过您留下的联系方式与您沟通后续安排。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. 用户责任</h2>
            <p>您同意：</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>提供真实、准确的联系方式</li>
              <li>不得滥用预约或联系表单，包括恶意重复提交或自动化刷取</li>
              <li>遵守相关法律法规</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. 免责声明</h2>
            <p>
              Aether 是生活方式与恢复体验产品，不能替代专业医疗诊断或治疗。如有明确疾病或身体不适，请及时就医并遵循专业医生意见。本网站不提供个性化健康建议，也不通过本站点收集健康数据。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. 知识产权</h2>
            <p>
              本网站的内容、商标、产品名称（包括但不限于 SORGEN、SORGEN X、Aether、溯元）及相关技术资料的知识产权归深圳溯元求索智能科技有限公司所有。未经授权，不得复制、修改或分发。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. 协议修改</h2>
            <p>
              我们可能通过在本页面发布新的、标明日期的版本来更新本协议。更新日期以页面载明的为准。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. 联系我们</h2>
            <p>如果您对本用户协议有任何疑问，请通过以下方式联系我们：</p>
            <p>公司：深圳溯元求索智能科技有限公司</p>
            <p>
              邮箱：
              <a href="mailto:business@sorgenx.com" className="text-link underline-offset-4 hover:underline">
                business@sorgenx.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
