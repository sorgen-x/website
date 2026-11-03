import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="h-14 flex items-center px-6 border-b border-border/50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">返回</span>
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">隐私政策</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground">
            最后更新日期：{new Date().getFullYear()}年1月1日
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. 信息收集</h2>
            <p>
              我们（深圳溯元求索智能科技有限公司，简称“溯元”）收集您在使用 Vitality 服务时提供的个人信息，包括但不限于：姓名、联系方式、健康数据等。这些信息将用于为您提供更好的健康管理服务。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. 信息使用</h2>
            <p>
              我们使用收集的信息来：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>提供、维护和改进我们的服务</li>
              <li>处理您的订单和预约</li>
              <li>发送服务相关的通知</li>
              <li>提供个性化的健康建议</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. 信息保护</h2>
            <p>
              我们采用行业标准的安全措施来保护您的个人信息，包括加密传输、安全存储和访问控制等技术手段。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. 信息共享</h2>
            <p>
              除法律要求或您明确同意的情况外，我们不会将您的个人信息分享给第三方。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. 您的权利</h2>
            <p>
              您有权访问、更正或删除您的个人信息。如需行使这些权利，请联系我们的客服团队。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. 联系我们</h2>
            <p>
              如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
            </p>
            <p>公司：深圳溯元求索智能科技有限公司</p>
            <p>邮箱：privacy@suyuan.com</p>
          </section>
        </div>
      </main>
    </div>
  );
}
