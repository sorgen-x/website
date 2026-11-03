export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <h2 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight">
              关于溯元
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                深圳溯元求索智能科技有限公司（简称“溯元”，SORGEN）成立于 2019 年，是一家专注于 AI 健康科技的创新型企业。
                我们致力于将人工智能与传统恢复理念相结合，为用户提供智能化、个性化的健康管理解决方案。
              </p>
              <p>
                公司核心团队由来自清华、北大、中科院的顶尖科学家组成，
                在AI算法、太赫兹技术、生物医学工程等领域拥有深厚的技术积累。
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-4">
              <div>
                <div className="text-4xl font-semibold text-foreground">2019</div>
                <div className="text-sm text-muted-foreground mt-1">成立年份</div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-foreground">200+</div>
                <div className="text-sm text-muted-foreground mt-1">团队成员</div>
              </div>
              <div>
                <div className="text-4xl font-semibold text-foreground">3亿</div>
                <div className="text-sm text-muted-foreground mt-1">累计融资</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl bg-background p-6 flex flex-col justify-end">
                <div className="text-2xl font-semibold text-foreground mb-2">使命</div>
                <p className="text-sm text-muted-foreground">科技守护健康</p>
              </div>
              <div className="aspect-square rounded-2xl bg-primary p-6 flex items-center justify-center">
                <span className="text-3xl font-semibold text-primary-foreground">溯元</span>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl bg-background p-6 flex flex-col justify-center">
                <div className="text-2xl font-semibold text-foreground mb-2">愿景</div>
                <p className="text-sm text-muted-foreground">让健康触手可及</p>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-muted p-6 flex flex-col justify-end">
                <div className="text-2xl font-semibold text-foreground mb-2">价值观</div>
                <p className="text-sm text-muted-foreground">创新 · 专业 · 责任</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
