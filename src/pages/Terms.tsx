import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Terms() {
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
        <h1 className="text-3xl font-bold text-foreground mb-8">用户协议</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-foreground">
            最后更新日期：{new Date().getFullYear()}年1月1日
          </p>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">1. 服务条款</h2>
            <p>
              欢迎使用 Vitality 服务。本服务由深圳溯元求索智能科技有限公司（简称“溯元”）提供。使用我们的服务即表示您同意遵守本用户协议。请仔细阅读以下条款。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">2. 服务内容</h2>
            <p>
              Vitality提供健康管理相关的产品和服务，包括但不限于：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>恢复舱设备及相关服务</li>
              <li>AI健康管理助手</li>
              <li>健康数据分析和建议</li>
              <li>预约服务</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. 用户责任</h2>
            <p>
              作为用户，您同意：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>提供真实、准确的个人信息</li>
              <li>妥善保管账户信息和密码</li>
              <li>遵守相关法律法规</li>
              <li>不得滥用我们的服务</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. 免责声明</h2>
            <p>
              Vitality提供的健康建议仅供参考，不能替代专业医疗诊断和治疗。如有健康问题，请及时就医。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. 知识产权</h2>
            <p>
              Vitality的所有内容、商标和技术均受知识产权法保护。未经授权，不得复制、修改或分发。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. 协议修改</h2>
            <p>
              我们保留修改本协议的权利。修改后的协议将在网站上公布，继续使用服务即表示您接受修改后的协议。
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. 联系我们</h2>
            <p>
              如果您对本用户协议有任何疑问，请通过以下方式联系我们：
            </p>
            <p>公司：深圳溯元求索智能科技有限公司</p>
            <p>邮箱：support@suyuan.com</p>
          </section>
        </div>
      </main>
    </div>
  );
}
