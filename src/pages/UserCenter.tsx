import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { NewAppointmentDialog } from "@/components/NewAppointmentDialog";
import { HealthProfile } from "@/components/HealthProfile";
import { 
  ArrowLeft, 
  Package, 
  Calendar, 
  User, 
  Globe, 
  LogOut,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Loader2,
  Plus,
  Sparkles
} from "lucide-react";
import logo from "@/assets/logo.png";

interface Order {
  id: string;
  order_number: string;
  model_name: string;
  total_price: number;
  status: string;
  created_at: string;
}

interface Appointment {
  id: string;
  appointment_type: string;
  appointment_date: string;
  status: string;
  notes: string | null;
}

interface Profile {
  full_name: string | null;
  phone: string | null;
  preferred_language: string;
}

export default function UserCenter() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Load orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Load appointments
      const { data: appointmentsData } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", user.id)
        .order("appointment_date", { ascending: false });

      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, phone, preferred_language")
        .eq("user_id", user.id)
        .maybeSingle();

      setOrders(ordersData || []);
      setAppointments(appointmentsData || []);
      setProfile(profileData || { full_name: null, phone: null, preferred_language: "zh" });
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
        })
        .eq("user_id", user.id);

      if (error) throw error;
      toast({ title: t("保存成功", "Saved successfully") });
    } catch (error: any) {
      toast({
        title: t("保存失败", "Save failed"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "paid":
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "processing":
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, { zh: string; en: string }> = {
      pending: { zh: "待支付", en: "Pending" },
      paid: { zh: "已支付", en: "Paid" },
      processing: { zh: "处理中", en: "Processing" },
      shipped: { zh: "已发货", en: "Shipped" },
      delivered: { zh: "已送达", en: "Delivered" },
      cancelled: { zh: "已取消", en: "Cancelled" },
      confirmed: { zh: "已确认", en: "Confirmed" },
      completed: { zh: "已完成", en: "Completed" },
    };
    return t(statusMap[status]?.zh || status, statusMap[status]?.en || status);
  };

  const getAppointmentTypeText = (type: string) => {
    const typeMap: Record<string, { zh: string; en: string }> = {
      experience: { zh: "产品体验", en: "Product Experience" },
      consultation: { zh: "健康咨询", en: "Health Consultation" },
      health_check: { zh: "健康检查", en: "Health Check" },
    };
    return t(typeMap[type]?.zh || type, typeMap[type]?.en || type);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-14 flex items-center justify-between px-6 border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-xl z-50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{t("返回首页", "Back to Home")}</span>
        </button>
        <img src={logo} alt="Vitality" className="h-8" />
        <div className="w-20" />
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            {t("个人中心", "User Center")}
          </h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">{t("订单", "Orders")}</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{t("预约", "Appointments")}</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">{t("健康画像", "Health")}</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{t("资料", "Profile")}</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{t("设置", "Settings")}</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-xl font-semibold">{t("我的订单", "My Orders")}</h2>
            {orders.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t("暂无订单", "No orders yet")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-card rounded-2xl border border-border/50 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("订单号", "Order No.")}: {order.order_number}
                        </p>
                        <h3 className="text-lg font-medium">{order.model_name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className="text-sm">{getStatusText(order.status)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-primary">
                        ¥{order.total_price.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{t("我的预约", "My Appointments")}</h2>
              <Button onClick={() => setNewAppointmentOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {t("新建预约", "New Appointment")}
              </Button>
            </div>
            {appointments.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">{t("暂无预约", "No appointments yet")}</p>
                <Button variant="outline" onClick={() => setNewAppointmentOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  {t("立即预约", "Make an Appointment")}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-card rounded-2xl border border-border/50 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium">
                          {getAppointmentTypeText(appointment.appointment_type)}
                        </h3>
                        {appointment.notes && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(appointment.status)}
                        <span className="text-sm">{getStatusText(appointment.status)}</span>
                      </div>
                    </div>
                    <p className="text-primary font-medium">
                      {new Date(appointment.appointment_date).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Health Profile Tab */}
          <TabsContent value="health" className="space-y-4">
            <HealthProfile />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <h2 className="text-xl font-semibold">{t("个人资料", "Profile")}</h2>
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("姓名", "Name")}</Label>
                <Input
                  id="name"
                  value={profile?.full_name || ""}
                  onChange={(e) =>
                    setProfile((prev) => prev ? { ...prev, full_name: e.target.value } : null)
                  }
                  placeholder={t("请输入姓名", "Enter your name")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profilePhone">{t("手机号", "Phone")}</Label>
                <Input
                  id="profilePhone"
                  value={profile?.phone || ""}
                  onChange={(e) =>
                    setProfile((prev) => prev ? { ...prev, phone: e.target.value } : null)
                  }
                  placeholder={t("请输入手机号", "Enter your phone")}
                />
              </div>
              <div className="space-y-2">
                <Label>{t("邮箱", "Email")}</Label>
                <Input value={user?.email || ""} disabled className="bg-muted" />
              </div>
              <Button onClick={handleSaveProfile} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {t("保存", "Save")}
              </Button>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-xl font-semibold">{t("设置", "Settings")}</h2>
            <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-6">
              {/* Language Switch */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{t("语言", "Language")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("切换显示语言", "Switch display language")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={language === "zh" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("zh")}
                  >
                    中文
                  </Button>
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("en")}
                  >
                    English
                  </Button>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <Button
                  variant="destructive"
                  onClick={handleSignOut}
                  className="w-full sm:w-auto"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t("退出登录", "Sign Out")}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <NewAppointmentDialog
        open={newAppointmentOpen}
        onOpenChange={setNewAppointmentOpen}
        onSuccess={loadData}
      />
    </div>
  );
}
