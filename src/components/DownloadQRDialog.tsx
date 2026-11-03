import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QrCode, Smartphone } from "lucide-react";

interface DownloadQRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DownloadQRDialog({ open, onOpenChange }: DownloadQRDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">下载Vitality App</DialogTitle>
          <DialogDescription className="text-center">
            扫描二维码下载移动应用
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-8 space-y-6">
          {/* QR Code Placeholder */}
          <div className="w-48 h-48 bg-card border-2 border-dashed border-border rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-2">
              <QrCode className="w-16 h-16 text-primary mx-auto" />
              <p className="text-xs text-muted-foreground">扫码下载</p>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-foreground font-medium">使用手机扫描二维码</p>
            <p className="text-sm text-muted-foreground">
              支持 iOS 和 Android 设备
            </p>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm">iOS</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm">Android</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
