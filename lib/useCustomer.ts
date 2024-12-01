"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { customerSchema } from "./schemas";

export async function getCustomers() {
  return prisma.customer.findMany();
}

export async function createCustomer(
  prevState: { message: string; error: string },
  formData: FormData
) {
  const parse = customerSchema.safeParse({
    name: formData.get("name"),
  });

  if (!parse.success) {
    return {
      ...prevState,
      error: "Failed to create customer",
      message: "",
    };
  }

  const data = parse.data;

  try {
    const customer = await prisma.customer.create({ data });
    revalidatePath("/customers");
    return { message: `Added customer: ${customer.id}`, error: "" };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      message: "",
      error: `Failed to create customer: ${data.name}. Please make sure customer with this name is not in the data base.`,
    };
  }
}
