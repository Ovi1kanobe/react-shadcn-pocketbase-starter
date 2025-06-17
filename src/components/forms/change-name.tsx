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
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

interface ChangeNameFormProps {
  onSubmit?: () => void;
  onError?: () => void;
  onSuccess?: () => void;
}

export function ChangeNameForm({ onSubmit, onError, onSuccess }: ChangeNameFormProps) {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!user) return;
    setName(user.name);
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSaveName(values: z.infer<typeof formSchema>) {
    onSubmit?.();
    updateUser(
      { name: values.name },
      () => {
        onError?.();
      },
      () => {
        onSuccess?.();
        setName(name);
      }
    );
  }

  if (!user) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSaveName)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={user.name} {...field} />
              </FormControl>
              <FormDescription>This is your first and last name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
