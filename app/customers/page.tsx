import AddCustomerForm from "@/components/add-customer-form";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CustomersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const customers = await prisma.customer.findMany();

  return (
    <div className="mt-10 text-center">
      <h1 className="text-2xl font-bold underline">Welcome to the dashboard</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
      <AddCustomerForm />
    </div>
  );
}
