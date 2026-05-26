import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { SITE } from '@/config/site';

interface DemoNoticeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DemoNoticeDialog({ open, onOpenChange }: DemoNoticeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-yz-border bg-yz-card text-white sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">{SITE.demoDialogTitle}</AlertDialogTitle>
          <AlertDialogDescription className="text-yz-gray">
            {SITE.demoNoticeMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-yz-orange text-white hover:bg-yz-orange/90"
            onClick={() => onOpenChange(false)}
          >
            Понятно
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
