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
import { Customer, customerSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createCustomerValues, updateCustomerValues } from "@/lib/useCustomer";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  customer: Customer;
  className?: string;
};

export default function CustomerForm({ customer, className }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      ...customer,
    },
  });

  async function onSubmit(values: Customer) {
    setSubmitting(true);
    const response = customer.id
      ? await updateCustomerValues(values)
      : await createCustomerValues(values);
    setSubmitting(false);

    if (response.type === "ERROR") {
      toast({
        variant: "destructive",
        description: response.message,
      });
    } else {
      toast({
        variant: "default",
        description: response.message,
      });
      router.back();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        {customer.id && (
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="sr-only">
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
                {/* <ZodErrors error={state?.zodErrors?.name} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {customer.id ? "Updating..." : "Creating..."}
            </>
          ) : (
            "Submit"
          )}
        </Button>
        {/* {state.error && (
          <Alert variant="destructive" className="py-2 px-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )} */}
      </form>
    </Form>
  );
}
