"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Customer } from "@/lib/schemas";
import { useRouter } from "next/navigation";

type Props = {
  customer: Customer;
};

export default function UserRow({ customer }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/customers/edit/${customer.id}`);
  };

  return (
    <TableRow onClick={handleClick}>
      <TableCell>{customer.id}</TableCell>
      <TableCell>{customer.name}</TableCell>
    </TableRow>
  );
}
