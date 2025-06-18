import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address." }),
    confirmEmail: z.string().email({ message: "Invalid email address." }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email addresses do not match.",
    path: ["confirmEmail"],
  });

interface ChangeEmailFormProps {
  onSubmit?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
}

export function ChangeEmailForm({ onSubmit, onError, onSuccess }: ChangeEmailFormProps) {
  const { user, requestEmailChange } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
    },
  });

  function onSaveEmail(values: z.infer<typeof formSchema>) {
    if (values.email === user?.email) {
      form.setError("email", { message: "You must change your email address to update it." });
      return;
    }
    onSubmit?.();
    requestEmailChange(
      values.email,
      () => {
        onError?.();
      },
      () => {
        onSuccess?.();
      }
    );
  }

  if (!user) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSaveEmail)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder={user.email} {...field} />
              </FormControl>
              <FormDescription>We will send a confirmation email to this address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Confirm new email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default ChangeEmailForm;
