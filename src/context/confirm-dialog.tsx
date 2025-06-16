import { useState, useCallback, useMemo } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ConfirmDialogContext } from "../hooks/useConfirmDialog";

export interface ConfirmDialogOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  confirmLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ConfirmDialogContextType {
  openDialog: (options: ConfirmDialogOptions) => void;
}

interface ConfirmDialogProviderProps {
  children: React.ReactNode;
}

export function ConfirmDialogProvider({ children }: ConfirmDialogProviderProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions>({});

  const closeDialog = useCallback(() => setOpen(false), []);

  const openDialog = useCallback((opts: ConfirmDialogOptions) => {
    setOptions(opts);
    setOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    options.onConfirm?.();
    closeDialog();
  }, [options, closeDialog]);

  const handleCancel = useCallback(() => {
    options.onCancel?.();
    closeDialog();
  }, [options, closeDialog]);

  const ctxValue: ConfirmDialogContextType = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <ConfirmDialogContext.Provider value={ctxValue}>
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {options.title && <AlertDialogTitle>{options.title}</AlertDialogTitle>}
            {options.description && (
              <AlertDialogDescription>{options.description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {options.cancelLabel ?? "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {options.confirmLabel ?? "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  );
}
