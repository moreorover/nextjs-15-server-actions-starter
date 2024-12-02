import CustomerForm from "@/app/customers/CustomerForm";
import { Modal } from "@/components/Modal";

export default async function NewCustomerModal() {
  const customer = { id: "", name: "" };

  return (
    <Modal title="New customer" description="Create customer as needed.">
      <div className="p-8 max-w-md space-y-2">
        <CustomerForm customer={customer} />
      </div>
    </Modal>
  );
}
