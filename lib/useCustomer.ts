"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { Customer, customerSchema } from "./schemas";

export async function getCustomers() {
  return await prisma.customer.findMany();
}

export async function getCustomer(id: string) {
  return await prisma.customer.findFirst({ where: { id } });
}

export async function updateCustomer(
  prevState: {
    message: string;
    error: string;
    zodErrors: { id?: string[] | undefined; name?: string[] | undefined };
  },
  formData: FormData
) {
  const parse = customerSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
  });

  if (!parse.success) {
    return {
      ...prevState,
      error: "Failed to update customer",
      message: "",
      zodErrors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;

  try {
    const customer = await prisma.customer.update({
      data: { name: data.name },
      where: { id: data.id },
    });
    return {
      message: `Updated customer: ${customer.id}`,
      error: "",
      zodErrors: { id: undefined, name: undefined },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      message: "",
      error: `Failed to update customer: ${data.name}. Please make sure customer with this name is not in the data base.`,
      zodErrors: { id: undefined, name: undefined },
    };
  }
}

type ActionResponse = {
  type: "SUCCESS" | "ERROR";
  message: string;
};

export async function updateCustomerValues(
  customer: Customer
): Promise<ActionResponse> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  try {
    const parse = customerSchema.safeParse(customer);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.customer.update({
      data: { name: customer.name },
      where: { id: customer.id },
    });
    revalidatePath("/customers");
    return {
      message: `Updated customer: ${c.name}`,
      type: "SUCCESS",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      type: "ERROR",
      message: "Something went wrong!",
    };
  }
}

export async function createCustomerValues(
  customer: Customer
): Promise<ActionResponse> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  try {
    const parse = customerSchema.safeParse(customer);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.customer.create({
      data: { name: customer.name },
    });
    revalidatePath("/customers");
    return {
      message: `Created customer: ${c.name}`,
      type: "SUCCESS",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      type: "ERROR",
      message: "Something went wrong!",
    };
  }
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
