## 重构计划

目标：在 **不改变任何功能、交互、动画、视觉** 的前提下，拆分上帝组件、清理冗余、统一命名。

### 一、扫描结果（最臃肿模块）

| 文件 | 行数 | 主要问题 |
|---|---|---|
| `FamilyLink.tsx` | 944 | 包含手机模拟器、危机预警、远程干预等多场景 UI 集中在一个文件 |
| `ProductConfig.tsx` | 717 | 选配数据、步骤逻辑、预览、动画、对比、保存恢复全混在一起 |
| `CheckoutDialog.tsx` / `CartCheckoutDialog.tsx` | 512 / 416 | 多步骤表单 + 大量重复支付/地址逻辑 |
| `Auth.tsx` | 510 | 登录/注册/忘记密码/OTP 全在一个 page |
| `UserCenter.tsx` | 425 | tab 内每个面板的 UI 都内联 |
| `ProductDetailDialog.tsx` / `TechnologyDetailDialog.tsx` | 415 / 392 | 静态内容数据与 UI 耦合 |
| `HealthProfile.tsx` | 385 | 计分公式、推荐生成与组件 UI 混在一起 |

### 二、重构阶段（建议按顺序，每步完成后即可预览验证）

**Stage 1 — `ProductConfig.tsx`（最高优先级，业务核心）**
- 抽离静态数据 → `src/components/product-config/data.ts`（models / exteriors / interiors / addons）
- 抽离类型 → `src/components/product-config/types.ts`
- 抽离子组件：
  - `ConfigPreview.tsx`（左侧 sticky 预览 + 外观/内饰 tab）
  - `ConfigStep.tsx`（单个选配步骤通用卡片 + 淡入动画）
  - `ConfigSummary.tsx`（右下价格/加入购物车）
- 抽离 hook：
  - `useConfigPersistence.ts`（登录后保存/恢复 saved_configurations 的全部 supabase 逻辑）
  - `useStepConfirm.ts`（confirmingId / timer / scrollToStep 防抖逻辑）
- 主文件只保留组合与 props 串联

**Stage 2 — `FamilyLink.tsx`**
- 拆为 `family-link/PhoneMock.tsx`、`SilentCrisisWarning.tsx`、`RemoteIntervention.tsx`、`data.ts`
- 抽 framer-motion variants 到 `motionVariants.ts`

**Stage 3 — `Auth.tsx`**
- 拆为 `auth/SignInForm.tsx`、`SignUpForm.tsx`、`OtpForm.tsx`、`ForgotPasswordForm.tsx`
- 共用 schema/util 抽到 `auth/utils.ts`

**Stage 4 — `UserCenter.tsx`**
- 每个 Tab 抽独立组件：`ProfilePanel`、`AppointmentsPanel`、`OrdersPanel`、`SavedConfigsPanel`、`HealthPanel`

**Stage 5 — `CheckoutDialog.tsx` + `CartCheckoutDialog.tsx`**
- 抽公共 `checkout/AddressForm.tsx`、`PaymentMethodPicker.tsx`、`OrderSummary.tsx`
- 共用 `useCheckoutSubmit.ts`

**Stage 6 — `HealthProfile.tsx`**
- 计分/推荐生成逻辑 → `health/scoring.ts`（纯函数，便于将来测试）
- 组件只保留加载/保存编排

**Stage 7 — 全局清理**
- 移除未使用的 import / 变量（用 `tsc --noEmit` + eslint 辅助）
- 统一命名：所有 handler 用 `handleXxx`，所有 boolean state 用 `isXxx/hasXxx`
- 删除已注释掉的死代码

### 三、技术细节与安全保证

- **零样式漂移**：所有 className、motion props、tailwind token、动画 delay/duration 原样迁移，不调整任何视觉值
- **零行为变化**：保持现有 supabase 调用顺序、toast 文案、错误处理路径
- **类型先行**：每次拆分先建 types，再拆组件，避免 props 漂移
- **逐步验证**：每完成一个 Stage 都能独立编译、独立预览
- **不动**：`src/components/ui/*`（shadcn）、`src/integrations/supabase/*`、迁移文件

### 四、不在范围内

- 不新增功能、不改文案、不改配色、不改动画曲线
- 不改数据库 schema、不改 RLS
- 不引入新依赖

---

请确认：
1. 是否同意按 Stage 1 → 7 顺序推进？
2. 是否希望我 **一次性全部完成**，还是 **每完成一个 Stage 暂停由你预览确认** 后再继续？（建议后者，最安全）
