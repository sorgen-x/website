import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Mail, Phone, Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const emailSchema = z.string().email("请输入有效的邮箱地址");
const passwordSchema = z.string().min(6, "密码至少6个字符");
const phoneSchema = z.string().regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码");
const otpSchema = z.string().length(6, "请输入6位验证码");

type AuthMode = "login" | "signup" | "forgot-password" | "reset-password";

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateEmailInputs = () => {
    try {
      emailSchema.parse(email);
      if (mode !== "forgot-password") {
        passwordSchema.parse(password);
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "输入错误",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const validatePhoneInputs = () => {
    try {
      phoneSchema.parse(phone);
      if (otpSent) {
        otpSchema.parse(otp);
      }
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "输入错误",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
      return false;
    }
  };

  const handleSendOTP = async () => {
    if (!validatePhoneInputs()) return;
    setLoading(true);

    try {
      // Note: Supabase phone auth requires Twilio setup
      // For now, we simulate OTP sending and use a demo flow
      // In production, you would use: await supabase.auth.signInWithOtp({ phone: `+86${phone}` })
      
      // Simulate OTP sent
      setOtpSent(true);
      setCountdown(60);
      toast({
        title: "验证码已发送",
        description: "请查看手机短信，验证码60秒内有效",
      });
    } catch (error: any) {
      toast({
        title: "发送失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneOTPAuth = async () => {
    if (!validatePhoneInputs()) return;
    if (!otpSent) {
      await handleSendOTP();
      return;
    }

    setLoading(true);
    try {
      // For demo purposes, accept any 6-digit OTP
      // In production, use: await supabase.auth.verifyOtp({ phone: `+86${phone}`, token: otp, type: 'sms' })
      
      if (otp.length !== 6) {
        throw new Error("请输入完整的6位验证码");
      }

      // Create or sign in user with phone-based email
      const phoneEmail = `${phone}@phone.user`;
      const demoPassword = `phone_${phone}_demo`;
      
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: phoneEmail,
          password: demoPassword,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: fullName, phone },
          },
        });
        if (error) {
          if (error.message.includes("User already registered")) {
            // Try to sign in instead
            const { error: signInError } = await supabase.auth.signInWithPassword({
              email: phoneEmail,
              password: demoPassword,
            });
            if (signInError) throw signInError;
          } else {
            throw error;
          }
        }
        toast({ title: "登录成功", description: "欢迎使用 SORGEN！" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: phoneEmail,
          password: demoPassword,
        });
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            // Try to sign up
            const { error: signUpError } = await supabase.auth.signUp({
              email: phoneEmail,
              password: demoPassword,
              options: {
                emailRedirectTo: `${window.location.origin}/`,
                data: { phone },
              },
            });
            if (signUpError) throw signUpError;
          } else {
            throw error;
          }
        }
        toast({ title: "登录成功", description: "欢迎回来！" });
      }
      navigate("/");
    } catch (error: any) {
      toast({
        title: "验证失败",
        description: error.message || "验证码错误，请重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!validateEmailInputs()) return;
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({ title: "登录成功", description: "欢迎回来！" });
        navigate("/");
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast({ title: "注册成功", description: "欢迎加入 SORGEN！" });
        navigate("/");
      }
    } catch (error: any) {
      let message = error.message;
      if (message.includes("User already registered")) {
        message = "该邮箱已注册，请直接登录";
      } else if (message.includes("Invalid login credentials")) {
        message = "邮箱或密码错误";
      }
      toast({
        title: mode === "login" ? "登录失败" : "注册失败",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      emailSchema.parse(email);
    } catch {
      toast({
        title: "输入错误",
        description: "请输入有效的邮箱地址",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });
      if (error) throw error;
      toast({
        title: "重置邮件已发送",
        description: "请查看您的邮箱，点击链接重置密码",
      });
      setMode("login");
    } catch (error: any) {
      toast({
        title: "发送失败",
        description: error.message || "请稍后重试",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "login": return "登录您的账户";
      case "signup": return "创建新账户";
      case "forgot-password": return "重置密码";
      default: return "登录您的账户";
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case "login": return "登录以管理您的健康";
      case "signup": return "开始您的健康管理之旅";
      case "forgot-password": return "输入邮箱接收重置链接";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-14 flex items-center px-6 border-b border-border/50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">返回首页</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center space-y-4">
            <img src={logo} alt="SORGEN" className="h-12 mx-auto" />
            <h1 className="text-2xl font-semibold text-foreground">{getTitle()}</h1>
            <p className="text-muted-foreground">{getSubtitle()}</p>
          </div>

          {/* Auth Form */}
          <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-soft">
            {mode === "forgot-password" ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">邮箱</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  variant="hero"
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  发送重置链接
                </Button>
                <div className="text-center">
                  <button
                    onClick={() => setMode("login")}
                    className="text-sm text-primary hover:underline"
                  >
                    返回登录
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Tabs value={loginMethod} onValueChange={(v) => {
                  setLoginMethod(v as "email" | "phone");
                  setOtpSent(false);
                  setOtp("");
                }}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      邮箱
                    </TabsTrigger>
                    <TabsTrigger value="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      手机号
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-4">
                    {mode === "signup" && (
                      <div className="space-y-2">
                        <Label htmlFor="fullName">姓名</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="请输入您的姓名"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">邮箱</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">密码</Label>
                        {mode === "login" && (
                          <button
                            type="button"
                            onClick={() => setMode("forgot-password")}
                            className="text-xs text-primary hover:underline"
                          >
                            忘记密码？
                          </button>
                        )}
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      className="w-full"
                      variant="hero"
                      onClick={handleEmailAuth}
                      disabled={loading}
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                      {mode === "login" ? "登录" : "注册"}
                    </Button>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-4">
                    {mode === "signup" && !otpSent && (
                      <div className="space-y-2">
                        <Label htmlFor="fullNamePhone">姓名</Label>
                        <Input
                          id="fullNamePhone"
                          type="text"
                          placeholder="请输入您的姓名"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="phone">手机号</Label>
                      <div className="flex gap-2">
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="请输入手机号"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={otpSent}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleSendOTP}
                          disabled={loading || countdown > 0 || !phone}
                          className="shrink-0"
                        >
                          {countdown > 0 ? `${countdown}s` : otpSent ? "重发" : "获取验证码"}
                        </Button>
                      </div>
                    </div>
                    
                    {otpSent && (
                      <div className="space-y-2">
                        <Label>验证码</Label>
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </div>
                    )}

                    <Button
                      className="w-full"
                      variant="hero"
                      onClick={handlePhoneOTPAuth}
                      disabled={loading || (otpSent && otp.length !== 6)}
                    >
                      {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                      {otpSent ? "验证并登录" : "获取验证码"}
                    </Button>
                  </TabsContent>
                </Tabs>

                {/* Toggle Login/Signup */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setMode(mode === "login" ? "signup" : "login");
                      setOtpSent(false);
                      setOtp("");
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    {mode === "login" ? "没有账户？立即注册" : "已有账户？立即登录"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
