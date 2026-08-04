import { getOrders } from "@/lib/store";
import { formatMoney } from "@/lib/format";

const statusStyle: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  ready: "bg-moss/20 text-moss",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-red-100 text-red-700",
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-espresso">Orders</h1>
        <p className="text-sm text-muted">
          Sample CRM orders for demo. Connect payments when you go live.
        </p>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-parchment text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Items</th>
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-[var(--border)] last:border-0"
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-espresso">{o.id}</p>
                    <p className="text-xs text-muted">
                      {new Date(o.createdAt).toLocaleString("en-AU")}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-espresso">{o.customerName}</p>
                    <p className="text-xs text-muted">{o.email}</p>
                  </td>
                  <td className="px-4 py-4 text-muted">
                    {o.items.map((i) => (
                      <div key={i.productId + i.name}>
                        {i.quantity}× {i.name}
                      </div>
                    ))}
                    {o.notes && (
                      <p className="mt-1 text-xs italic">Note: {o.notes}</p>
                    )}
                  </td>
                  <td className="px-4 py-4 font-semibold text-espresso">
                    {formatMoney(o.total)}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        statusStyle[o.status] || ""
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
