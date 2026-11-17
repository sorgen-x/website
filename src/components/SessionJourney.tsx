const steps = [
  {
    n: "01",
    title: "进舱，关门",
    detail: "坐下，把外面留在门外。这一次只属于你。",
  },
  {
    n: "02",
    title: "小元安排这一次",
    detail: "根据你当下的状态，生成这一次的恢复安排。",
  },
  {
    n: "03",
    title: "五维同时被调度",
    detail: "声、光、热、氧、姿态一起落下，你只需待在里面。",
  },
  {
    n: "04",
    title: "结束，离开",
    detail: "短时恢复，独自就能完成。用得越久，下一次更贴合。",
  },
];

export function SessionJourney() {
  return (
    <section id="session" className="section-y bg-card scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight mb-3">
            从进舱到结束
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">一次短时恢复，独自就能完成。</p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {steps.map((step) => (
            <li key={step.n} className="space-y-3">
              <p className="text-sm tracking-[0.18em] text-muted-foreground">{step.n}</p>
              <h3 className="text-xl font-semibold text-foreground tracking-tight">{step.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 text-center">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center min-w-[160px] h-11 px-6 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            预约体验
          </a>
        </div>
      </div>
    </section>
  );
}
