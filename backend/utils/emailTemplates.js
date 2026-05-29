const logoUrl =
  "https://ik.imagekit.io/sljqsazoe/default-image.jpg?updatedAt=1777723266472";

const emailHeader = `
  <div style="text-align: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid #f0f0f0;">
    <div style="display: inline-block; background: #111; color: #fff; font-size: 20px; font-weight: 800; padding: 8px 18px; border-radius: 8px; letter-spacing: 1px;">PNV Enterprises</div>
    <p style="color: #666; font-size: 13px; margin-top: 6px;">Manufacturing & Supply of Industrial Chemicals, Polymers & Lab Solutions.</p>
  </div>
`;

const emailFooter = `
  <div style="margin-top: 30px; padding-top: 16px; border-top: 2px solid #f0f0f0; text-align: center; color: #999; font-size: 12px;">
    <p>&copy; ${new Date().getFullYear()} PNV Enterprises. All rights reserved.</p>
    <p style="margin-top: 4px;">Manufacturing & Supply of Industrial Chemicals, Polymers & Lab Solutions.</p>
  </div>
`;

const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 20px;">
  ${emailHeader}
  <h2 style="color: #333;">Your Login OTP</h2>
  <p>Use the following OTP to verify your email. It is valid for 10 minutes.</p>
  <div style="background: #f4f4f4; padding: 16px 24px; border-radius: 8px; text-align: center; margin: 20px 0;">
    <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #111;">${otp}</span>
  </div>
  <p style="color: #666; font-size: 13px;">If you didn't request this, please ignore this email.</p>
  ${emailFooter}
</body>
</html>
`;

const orderConfirmationTemplate = (order) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  ${emailHeader}
  <h2 style="color: #333;">Order Confirmation</h2>
  <p>Hello <strong>${order.userSnapshot.businessName || order.userSnapshot.email}</strong>,</p>
  <p>Thank you for placing your order with PNV Enterprises!</p>
  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Order ID</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.orderId}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Status</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.status}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Total</td><td style="padding: 8px; border-bottom: 1px solid #eee;">₹${order.totalAmount}</td></tr>
  </table>
  <h3>Items Ordered</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <tr style="background: #f4f4f4;">
      <th style="padding: 8px; text-align: left;">Product</th>
      <th style="padding: 8px; text-align: right;">Qty</th>
      <th style="padding: 8px; text-align: right;">Price</th>
    </tr>
    ${order.items
      .map(
        (item) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity} ${item.unit}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * item.quantity}</td>
    </tr>`,
      )
      .join("")}
    <tr style="font-weight: bold;">
      <td style="padding: 8px;" colspan="2">Total</td>
      <td style="padding: 8px; text-align: right;">₹${order.totalAmount}</td>
    </tr>
  </table>

  ${
    order.userSnapshot.shippingAddress
      ? `
  <h3 style="margin-top: 20px;">Shipping Address</h3>
  <p style="color: #444;">
    ${order.userSnapshot.shippingAddress.line1 || ""}${order.userSnapshot.shippingAddress.line2 ? ", " + order.userSnapshot.shippingAddress.line2 : ""}<br>
    ${order.userSnapshot.shippingAddress.city || ""}, ${order.userSnapshot.shippingAddress.state || ""} - ${order.userSnapshot.shippingAddress.pincode || ""}
  </p>`
      : ""
  }

  <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 24px 0;">
    <h3 style="color: #16a34a; margin-top: 0;">What Happens Next?</h3>
    <ol style="color: #444; padding-left: 20px; margin: 0;">
      <li style="margin-bottom: 8px;"><strong>Order Confirmation Call</strong> — We will contact you shortly on your registered phone number${order.userSnapshot.phone ? " (" + order.userSnapshot.phone + ")" : ""} to confirm your order.</li>
      <li style="margin-bottom: 8px;"><strong>Order Processing</strong> — Once confirmed, we will prepare your order for delivery.</li>
      <li style="margin-bottom: 8px;"><strong>Delivery</strong> — Your order will be delivered to your shipping address.</li>
      <li style="margin-bottom: 0;"><strong>Payment</strong> — Payment will be collected via bank transfer or at the time of delivery.</li>
    </ol>
  </div>

  <p style="color: #666; font-size: 13px;">If you have any questions, feel free to reply to this email.</p>
  <p>Regards,<br><strong>Team PNV Enterprises</strong></p>
  ${emailFooter}
</body>
</html>
`;

const adminOrderAlertTemplate = (order) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  ${emailHeader}
  <h2 style="color: #d32f2f;">New Order Received</h2>
  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Order ID</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.orderId}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Customer</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.userSnapshot.businessName || order.userSnapshot.email}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.userSnapshot.phone || "N/A"}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Total</td><td style="padding: 8px; border-bottom: 1px solid #eee;">₹${order.totalAmount}</td></tr>
    <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Items</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.items.length}</td></tr>
  </table>
  <p>Log in to the admin panel to manage this order.</p>
  ${emailFooter}
</body>
</html>
`;

module.exports = {
  otpEmailTemplate,
  orderConfirmationTemplate,
  adminOrderAlertTemplate,
};
