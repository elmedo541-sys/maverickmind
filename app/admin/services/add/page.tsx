import ServiceForm from "../ServiceForm";
import { createService } from "../actions";

export default function AddServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">Add Service</h1>
      <ServiceForm action={createService} mode="create" />
    </div>
  );
}
