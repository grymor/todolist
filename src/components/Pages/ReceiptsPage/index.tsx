import { useReceipts } from "../../../context/ReceiptsContext";
import ReceiptForm from "../../common/receipt-form";
import ReceiptTable from "../../common/receipt-table";

export default function ReceiptsPage() {
  const { receipts } = useReceipts();

  return (
    <div className="table-panel">
      <header className="table-panel__header">
        <h2>Receipts</h2>
        <span className="table-panel__badge">{receipts.length} receipts</span>
      </header>

      <ReceiptForm />

      <div className="table-panel__scroll">
        <ReceiptTable />
      </div>
    </div>
  );
}
