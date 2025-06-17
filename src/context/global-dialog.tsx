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
import { DialogContext } from "../hooks/useGlobalDialog";

export interface DialogOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /**
   * Content can be a React node or a function returning a React node.
   * Using a function allows the dialog to re-render with updated state values.
   */
  content?: React.ReactNode | (() => React.ReactNode);
  confirmLabel: React.ReactNode;
  cancelLabel?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface DialogContextType {
  openDialog: (options: DialogOptions) => void;
}

interface DialogProviderProps {
  children: React.ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<DialogOptions | null>(null);

  const closeDialog = useCallback(() => setOpen(false), []);

  const openDialog = useCallback((opts: DialogOptions) => {
    setOptions(opts);
    setOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    options?.onConfirm?.();
    closeDialog();
  }, [options, closeDialog]);

  const handleCancel = useCallback(() => {
    options?.onCancel?.();
    closeDialog();
  }, [options, closeDialog]);

  const ctxValue: DialogContextType = useMemo(() => ({ openDialog }), [openDialog]);

  return (
    <DialogContext.Provider value={ctxValue}>
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {options?.title && <AlertDialogTitle>{options.title}</AlertDialogTitle>}
            {options?.description && (
              <AlertDialogDescription>{options.description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          {options?.content && (
            <div className="py-4">
              {typeof options.content === "function" ? options.content() : options.content}
            </div>
          )}
          <AlertDialogFooter>
            {options?.cancelLabel && (
              <AlertDialogCancel onClick={handleCancel}>{options.cancelLabel}</AlertDialogCancel>
            )}
            <AlertDialogAction onClick={handleConfirm}>{options?.confirmLabel}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  );
}
