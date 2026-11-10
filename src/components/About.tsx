export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight">
              关于溯元
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                深圳溯元求索智能科技有限公司（简称「溯元」，对外品牌 SORGEN）专注健康科技硬件与智能体验。
              </p>
              <p>
                产品 Aether 是我们的家用恢复舱。用克制的工程与设计，把短时恢复带进家庭空间。
              </p>
              <p>
                舱与 App 是载体，核心是小元（SORGEN X）：根据你当下状态调度声、光、热、氧、姿态。用得越久，理解会留下，下一次更贴合。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl bg-background p-6 flex flex-col justify-end border border-border/50">
                <div className="text-2xl font-semibold text-foreground mb-2">产品</div>
                <p className="text-sm text-muted-foreground">Aether 家用恢复舱</p>
              </div>
              <div className="aspect-square rounded-2xl bg-primary p-6 flex items-center justify-center">
                <span className="text-3xl font-semibold text-primary-foreground tracking-wide">SORGEN</span>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl bg-background p-6 flex flex-col justify-center border border-border/50">
                <div className="text-2xl font-semibold text-foreground mb-2">公司</div>
                <p className="text-sm text-muted-foreground">溯元求索 · SORGEN</p>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-muted p-6 flex flex-col justify-end">
                <div className="text-2xl font-semibold text-foreground mb-2">官网</div>
                <p className="text-sm text-muted-foreground">sorgenx.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
