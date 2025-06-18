import { useState, useCallback, useMemo } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { DialogContext } from "../hooks/useGlobalDialog";
import { X } from "lucide-react";

export interface DialogOptions {
  content?: React.ReactNode | ((close: () => void) => React.ReactNode);
}

export interface DialogContextType {
  openDialog: (options: DialogOptions) => void;
  closeDialog?: () => void;
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

  const ctxValue: DialogContextType = useMemo(
    () => ({ openDialog, closeDialog }),
    [openDialog, closeDialog]
  );

  return (
    <DialogContext.Provider value={ctxValue}>
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="">
          {options?.content && (
            <div className="py-4">
              {typeof options.content === "function"
                ? options.content(closeDialog)
                : options.content}
            </div>
          )}
          <div
            onClick={closeDialog}
            className="absolute top-1 right-1 text-gray-400 cursor-pointer hover:text-gray-600 shadow-md rounded-sm border p-1 bg-gray-50"
          >
            <X />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  );
}
