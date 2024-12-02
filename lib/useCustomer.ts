"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import prisma from "./prisma";
import { ActionResponse, Customer, customerSchema } from "./schemas";

export async function getCustomers() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return await prisma.customer.findMany();
}

export async function getCustomer(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }
  
  return await prisma.customer.findFirst({ where: { id } });
}

export async function updateCustomerValues(
  customer: Customer
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

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
