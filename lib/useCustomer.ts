"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { customerSchema } from "./schemas";

export async function getCustomers() {
  return prisma.customer.findMany();
}

export async function createCustomer(
  prevState: { message: string },
  formData: FormData
) {
  const parse = customerSchema.safeParse({
    name: formData.get("name"),
  });

  if (!parse.success) {
    return {
      ...prevState,
      message: "Failed to create customer",
    };
  }

  const data = parse.data;

  try {
    const customer = await prisma.customer.create({ data });
    revalidatePath("/customers");
    return { message: `Added customer: ${customer.id}` };
  } catch (e) {
    return { message: `Failed to create customer: ${e}` };
  }
}
