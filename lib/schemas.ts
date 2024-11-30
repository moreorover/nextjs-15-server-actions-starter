import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
});

export type AddCustomerFormFields = z.infer<typeof customerSchema>;
