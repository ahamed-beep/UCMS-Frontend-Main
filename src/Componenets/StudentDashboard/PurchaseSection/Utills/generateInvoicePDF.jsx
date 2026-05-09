export function downloadInvoice(purchase) {
  const customerName =
    [purchase.customer.firstName, purchase.customer.lastName]
      .filter(Boolean)
      .join(" ") || "Customer";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Invoice ${purchase.orderId}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', sans-serif; color: #111; padding: 48px; }
          .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
          .brand { font-size: 22px; font-weight: 700; color: #0F4C8A; }
          .badge { background: #DCFCE7; color: #008236; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 99px; }
          h1 { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
          .sub { color: #6A7282; font-size: 14px; margin-bottom: 32px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 32px; }
          .section-title { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #6A7282; margin-bottom: 12px; }
          .field { margin-bottom: 8px; }
          .field span { font-size: 13px; color: #4A5565; }
          .field strong { display: block; font-size: 14px; color: #111; margin-top: 2px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          thead tr { background: #F9FAFB; }
          th { text-align: left; padding: 10px 14px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: #6A7282; font-weight: 600; }
          td { padding: 14px; font-size: 14px; color: #4A5565; border-bottom: 1px solid #E5E7EB; }
          td:first-child { color: #111; font-weight: 500; }
          .total-row { display: flex; justify-content: flex-end; }
          .total-box { background: #0F4C8A; color: white; padding: 16px 24px; border-radius: 10px; min-width: 220px; }
          .total-box .label { font-size: 12px; opacity: 0.8; margin-bottom: 4px; }
          .total-box .amount { font-size: 24px; font-weight: 700; }
          .footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #99A1AF; text-align: center; }
          @media print { body { padding: 32px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">UCMS</div>
          <span class="badge">✓ PAID</span>
        </div>

        <h1>Invoice</h1>
        <p class="sub">${purchase.orderId} · ${purchase.date}</p>

        <div class="grid">
          <div>
            <p class="section-title">Billed To</p>
            <div class="field"><span>Name</span><strong>${customerName}</strong></div>
            <div class="field"><span>Email</span><strong>${purchase.customer.email}</strong></div>
            ${purchase.customer.phone ? `<div class="field"><span>Phone</span><strong>${purchase.customer.phone}</strong></div>` : ""}
          </div>
          <div>
            <p class="section-title">Payment Info</p>
            <div class="field"><span>Method</span><strong>${purchase.method}</strong></div>
            ${purchase.paypalOrderId ? `<div class="field"><span>PayPal Order ID</span><strong>${purchase.paypalOrderId}</strong></div>` : ""}
            ${purchase.paypalCaptureId ? `<div class="field"><span>Capture ID</span><strong>${purchase.paypalCaptureId}</strong></div>` : ""}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Course / Service</th>
              <th>Date</th>
              <th>Status</th>
              <th style="text-align:right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${purchase.serviceTitle}</td>
              <td>${purchase.date}</td>
              <td>Completed</td>
              <td style="text-align:right; font-weight:600; color:#111">
                ${purchase.currency} ${purchase.amount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="total-row">
          <div class="total-box">
            <div class="label">Total Paid</div>
            <div class="amount">${purchase.currency} ${purchase.amount.toFixed(2)}</div>
          </div>
        </div>

        <div class="footer">
          Thank you for your purchase · UCMS · support@ucms.com
        </div>
      </body>
    </html>
  `;

  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
    win.close();
  }, 300);
}