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
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";

import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="w-full" type="submit" aria-disabled={pending}>
      Create
    </button>
  );
}

export default function AddCustomerForm() {
  const [state, formAction] = useActionState(createCustomer, {
    message: "",
  });

  const form = useForm<AddCustomerFormFields>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
    },
  });

  // async function submit(formData: FormData) {
  //   ref.current?.reset();
  // }

  return (
    <Form {...form}>
      <form
        action={formAction}
        onSubmit={handleFormSubmit<AddCustomerFormFields>(form)}
        className="space-y-4"
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
        <SubmitButton />
      </form>
    </Form>
  );
}
