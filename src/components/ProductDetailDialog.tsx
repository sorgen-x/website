import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Brain, Smartphone, Box, MessageCircle, TrendingUp, ListTodo, Eye, Heart, Shield, Sparkles, Users } from "lucide-react";

type ProductType = "ai-xiaoyuan" | "app" | "recovery-pod";

interface ProductDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: ProductType;
}

export function ProductDetailDialog({ open, onOpenChange, productType }: ProductDetailDialogProps) {
  const renderAIXiaoyuan = () => (
    <div className="space-y-8">
      <div className="text-center pb-6 border-b border-border/50">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-2">小元 助手</h3>
        <p className="text-lg text-primary">你的居家健康管理大脑</p>
      </div>

      <div className="space-y-2 text-center">
        <p className="text-muted-foreground">把专业的健康管理能力，</p>
        <p className="text-muted-foreground">转化为每天都能用得上的陪伴式助手。</p>
        <div className="bg-primary/5 rounded-xl p-4 mt-4">
          <p className="text-sm text-muted-foreground italic">不做医疗诊断，专注于健康管理与生活方式支持</p>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-foreground">小元是什么？</h4>
        <p className="text-muted-foreground leading-relaxed">
          小元，是SORGEN 居家健康管理系统中的<span className="text-foreground font-medium">核心智能助手</span>。
          它并不是一个"随便聊天的 AI"，而是围绕健康管理场景设计的<span className="text-foreground font-medium">长期陪伴型智能系统</span>。
        </p>
        <p className="text-foreground font-medium">小元的目标只有一个：让健康管理真正落地到每天的生活中。</p>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-foreground">它每天在做什么？</h4>
        
        <div className="space-y-4">
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-foreground">1. 理解你的状态</h5>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm ml-13">
              <li>• 汇总你在 App 中的日常记录</li>
              <li>• 结合行为、作息与环境信息</li>
              <li>• 形成可持续观察的健康管理视角</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3 italic">小元关注的是趋势与习惯，而不是一次性的好或坏。</p>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-foreground">2. 解读，而不是丢给你数据</h5>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 把复杂记录转化为清晰反馈</li>
              <li>• 告诉你：最近哪些地方需要注意</li>
              <li>• 避免信息过载与健康焦虑</li>
            </ul>
            <div className="bg-primary/5 rounded-lg p-3 mt-3">
              <p className="text-sm text-muted-foreground">健康管理不需要看懂一堆指标，只需要知道：今天该做什么</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ListTodo className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-foreground">3. 给你"今天做得到"的建议</h5>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 当天饮食重点提示</li>
              <li>• 适合你状态的运动与活动建议</li>
              <li>• 放松、休息与作息调整提醒</li>
            </ul>
            <p className="text-sm text-foreground font-medium mt-3">所有建议都围绕一个原则：低门槛、可执行、可坚持</p>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-foreground">4. 陪你长期坚持</h5>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 通过持续对话与提醒建立信任</li>
              <li>• 根据你的执行情况动态调整建议</li>
              <li>• 帮助你形成稳定的生活节律</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3 italic">小元不是一次性工具，而是一个长期陪伴的健康管理伙伴。</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-foreground">AI + 规则，而不是"胡乱生成"</h4>
        <p className="text-muted-foreground leading-relaxed">
          小元采用<span className="text-foreground font-medium">"智能模型 + 健康管理规则体系"</span>的方式工作：
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>• AI 负责理解语境与个体差异</li>
          <li>• 规则体系确保建议安全、可控、可解释</li>
          <li>• 所有输出均围绕健康管理边界</li>
        </ul>
        <p className="text-muted-foreground">这让 小元既具备灵活对话能力，又不会越过健康管理与医疗之间的边界。</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-foreground">适合谁使用？</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li>• 想开始健康管理，但不知道从哪一步做起的人</li>
          <li>• 尝试过很多 App，却难以坚持的人</li>
          <li>• 关注睡眠、压力与生活节律的人</li>
          <li>• 希望有人持续提醒与陪伴的人</li>
        </ul>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-2">声明</p>
        <p>小元提供的是健康管理与生活方式支持，不构成医疗诊断或治疗建议。如有明确疾病或身体不适，请及时就医并遵循专业医生意见。</p>
      </div>
    </div>
  );

  const renderApp = () => (
    <div className="space-y-8">
      <div className="text-center pb-6 border-b border-border/50">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-2">SORGEN App 在做什么？</h3>
        <p className="text-lg text-primary">帮助家庭理解长期变化的管理中枢</p>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          SORGEN App 并不是一个记录数据的工具，而是一个<span className="text-foreground font-medium">帮助家庭理解长期变化的管理中枢</span>。
        </p>
        <p className="text-muted-foreground leading-relaxed">
          它将恢复舱感知到的状态信息，与 小元的解读结果进行整合，以更容易理解的方式呈现给用户。
        </p>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-foreground">你可以在 App 里看到什么？</h4>
        
        <div className="space-y-4">
          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-foreground">1. 长期状态趋势</h5>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 以个人为基准的状态变化趋势</li>
              <li>• 不强调单次结果</li>
              <li>• 更关注一段时间内的变化走向</li>
            </ul>
            <div className="bg-primary/5 rounded-lg p-3 mt-3">
              <p className="text-sm text-muted-foreground">帮助用户回答一个核心问题："和以前相比，有没有发生变化？"</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-foreground">2. 温和、可理解的状态提示</h5>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 不展示复杂指标</li>
              <li>• 不制造健康焦虑</li>
              <li>• 以提醒与关注建议为主</li>
            </ul>
            <p className="text-sm text-foreground font-medium mt-3">让关心变得更从容，而不是更紧张。</p>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-foreground">3. 家庭成员共同查看</h5>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 支持家庭成员了解整体状态变化</li>
              <li>• 不进行实时监控</li>
              <li>• 尊重长辈的使用习惯与心理感受</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3 italic">这是一种更克制、更尊重的关注方式。</p>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-foreground">4. 与 小元协同</h5>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 帮助理解变化背后的生活方式因素</li>
              <li>• 提供日常管理与调整建议</li>
              <li>• 引导用户形成可持续的健康习惯</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-foreground">SORGEN App 不在做什么？</h4>
        <p className="text-muted-foreground">为了明确边界，我们同样清楚地说明：</p>
        <ul className="space-y-2 text-muted-foreground">
          <li>• 不提供医学检测数值</li>
          <li>• 不进行疾病判断</li>
          <li>• 不替代医生或医疗机构</li>
        </ul>
        <div className="bg-primary/5 rounded-xl p-4">
          <p className="text-muted-foreground">它的角色始终是：<span className="text-foreground font-medium">健康管理的长期记录者与解读者。</span></p>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-primary/20 text-center">
        <h4 className="text-lg font-semibold text-foreground mb-2">一个更安心的查看方式</h4>
        <p className="text-muted-foreground">SORGEN App 的设计目标只有一个：</p>
        <p className="text-foreground font-medium mt-2">让你在查看时，感到安心，而不是焦虑。</p>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-2">声明</p>
        <p>SORGEN App 为健康管理与生活方式支持工具，不构成医疗诊断或治疗建议。如有明确身体不适，请及时就医并遵循专业医生意见。</p>
      </div>
    </div>
  );

  const renderRecoveryPod = () => (
    <div className="space-y-8">
      <div className="text-center pb-6 border-b border-border/50">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Box className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-2">恢复舱</h3>
        <p className="text-lg text-primary">非接触式健康状态感知 · 居家管理执行空间</p>
      </div>

      <div className="space-y-2 text-center">
        <p className="text-muted-foreground">不是医疗设备，不做疾病诊断。</p>
        <p className="text-muted-foreground leading-relaxed">
          恢复舱，是SORGEN 居家健康管理系统中的<span className="text-foreground font-medium">核心执行终端</span>，
          通过非接触式状态感知与 AI 分析，帮助用户长期、持续地了解身体状态变化，并将健康管理真正落地到日常生活中。
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-foreground">为什么需要"感知 + 执行"的空间？</h4>
        <p className="text-muted-foreground leading-relaxed">
          对于大多数家庭来说，真正困难的并不是去医院检查，而是：
        </p>
        <div className="bg-primary/5 rounded-xl p-4">
          <p className="text-foreground font-medium">在日常生活中，持续、低负担地关注身体状态变化</p>
        </div>
        <p className="text-muted-foreground">尤其是长辈群体，不擅长使用 App、也不愿频繁记录数据。</p>
        <p className="text-muted-foreground">恢复舱的价值，就在于：</p>
        <ul className="space-y-2 text-muted-foreground">
          <li>• 无需复杂操作</li>
          <li>• 非接触、低打扰</li>
          <li>• 在固定场景中完成感知与执行</li>
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-xl font-semibold text-foreground">恢复舱在做什么？</h4>
        
        <div className="bg-card rounded-xl p-5 border border-border/50">
          <h5 className="font-semibold text-foreground mb-3">非接触式健康状态感知</h5>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            恢复舱通过面部特征、表情变化与生理节律相关信号，结合 AI 模型分析，对用户的<span className="text-foreground">健康相关状态</span>进行综合评估。
          </p>
          <p className="text-muted-foreground text-sm mb-2">系统关注的是：</p>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li>• 状态变化趋势</li>
            <li>• 与个人基线的偏离情况</li>
            <li>• 可能需要关注的风险提示</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-3 italic">而非具体医疗指标或疾病判断。</p>
        </div>

        <div className="bg-card rounded-xl p-5 border border-border/50">
          <h5 className="font-semibold text-foreground mb-3">状态趋势，而不是一次性结果</h5>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• 记录每一次使用的状态信息</li>
            <li>• 形成长期趋势观察</li>
            <li>• 帮助家人更早发现"和平时不一样"的变化</li>
          </ul>
          <div className="bg-primary/5 rounded-lg p-3 mt-3">
            <p className="text-sm text-muted-foreground">恢复舱关注的是变化本身，而不是给出医学结论。</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-foreground">它能关注哪些状态维度？</h4>
        <p className="text-muted-foreground text-sm">在健康管理边界内，恢复舱可对以下<span className="text-foreground">相关状态维度</span>进行综合分析与提示：</p>
        <div className="grid grid-cols-2 gap-3">
          {["心率相关状态", "呼吸与供氧相关状态", "代谢相关状态变化", "疲劳与压力相关状态", "皮肤状态与外观变化趋势"].map((item, index) => (
            <div key={index} className="bg-card rounded-lg p-3 border border-border/50">
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground italic">所有结果均以趋势、等级或提醒形式呈现，不提供具体医学数值。</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-foreground">与 小元、App 如何协同？</h4>
        <div className="grid gap-4">
          <div className="bg-card rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-primary" />
              <h5 className="font-medium text-foreground">小元</h5>
            </div>
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>• 解读恢复舱感知到的状态变化</li>
              <li>• 提供基于趋势的管理建议</li>
              <li>• 提醒需要重点关注的异常情况</li>
            </ul>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-5 h-5 text-primary" />
              <h5 className="font-medium text-foreground">SORGEN App</h5>
            </div>
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>• 汇总长期状态记录</li>
              <li>• 展示变化趋势与管理建议</li>
              <li>• 帮助家庭成员了解整体健康管理情况</li>
            </ul>
          </div>
        </div>
        <div className="bg-primary/5 rounded-xl p-4 text-center">
          <p className="text-foreground font-medium">形成：感知 → 解读 → 执行 → 观察 的完整闭环</p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-semibold text-foreground">恢复舱不是在做什么？</h4>
        <ul className="space-y-2 text-muted-foreground">
          <li>• 不进行疾病筛查或诊断</li>
          <li>• 不输出血糖、血脂等医学检测数值</li>
          <li>• 不替代医生或医疗机构</li>
        </ul>
        <div className="bg-primary/5 rounded-xl p-4">
          <p className="text-muted-foreground">它的角色非常明确：<span className="text-foreground font-medium">在非医疗场景下，为家庭提供持续的健康状态感知与管理支持</span></p>
        </div>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground mb-2">声明</p>
        <p>恢复舱为健康管理与生活方式支持产品，不构成医疗诊断或治疗建议。相关状态分析仅用于健康管理参考。如有明确疾病或身体不适，请及时就医并遵循专业医生意见。</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (productType) {
      case "ai-xiaoyuan":
        return renderAIXiaoyuan();
      case "app":
        return renderApp();
      case "recovery-pod":
        return renderRecoveryPod();
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-0 flex-row items-center justify-between">
          <DialogTitle className="sr-only">产品详情</DialogTitle>
          <DialogDescription className="sr-only">查看产品的详细功能介绍</DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>
        <ScrollArea className="flex-1 max-h-[calc(85vh-80px)]">
          <div className="p-6 pt-2">
            {renderContent()}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
