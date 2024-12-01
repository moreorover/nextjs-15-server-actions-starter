"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleFormSubmit } from "@/lib/forms";
import { AddCustomerFormFields, customerSchema } from "@/lib/schemas";
import { createCustomer } from "@/lib/useCustomer";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";

import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";

type Props = {
  className: string;
};

const initialState = {
  message: "",
  error: "",
};

export default function AddCustomerForm({ className }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, isPending] = useActionState(
    createCustomer,
    initialState
  );

  const form = useForm<AddCustomerFormFields>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form
        action={formAction}
        onSubmit={handleFormSubmit<AddCustomerFormFields>(form)}
        className={cn("space-y-4", className)}
      >
        {/* <form
        action={async (formData: FormData) => {
          const valid = await form.trigger();
          if (!valid) return;
          if (valid) return formAction(formData);
        }}
        className="space-y-4"
      > */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create"
          )}
        </Button>
        {state.error && (
          <Alert variant="destructive" className="py-2 px-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
      </form>
    </Form>
  );
}
