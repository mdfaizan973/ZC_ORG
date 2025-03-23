const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const OrderModel = require("../models/OrderModel");

const invoiceDownloadRouter = express.Router();

invoiceDownloadRouter.get("/:orderId/:prodId", async (req, res) => {
  const { orderId, prodId } = req.params;
  const findOrder = await OrderModel.findOne({ _id: orderId });
  console.log(findOrder);
  const invoiceData = findOrder.list_of_items.find(
    (ele) => ele.prod_id == prodId
  );
  console.log(invoiceData); // -> saler_id i can find the sler details
  try {
    const order = {
      id: orderId,
      customerName: findOrder.user_name,
      invoiceDate: new Date().toLocaleDateString(), // Changed from 'date' to 'invoiceDate'
      name: invoiceData.prod_name,
      price: invoiceData.prod_price,
      quantity: invoiceData.prod_qty,
      userAddress: findOrder.user_address, // Changed 'user_address' to camelCase
      orderDate: new Date(findOrder.order_date).toLocaleDateString(), // Added 'orderDate'
      phoneNo: findOrder.user_phone_no, // Changed 'phone_no' to camelCase
    };

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const doc = new PDFDocument({ margin: 50 });
    const fileName = `invoice-${order.id}.pdf`;

    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Order ID at the top-right
    doc.fontSize(12).text(`Order ID: ${order.id}`, doc.page.width - 350, 30, {
      align: "right",
    });

    // Logo
    const logoPath = path.join(
      __dirname,
      "../../uploads",
      "organicstorelogo.jpg"
    );
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 50, { width: 100 });
    }
    doc
      .fontSize(20)
      .fillColor("#333")
      .text("Organic Store", 50, 30, { align: "left" });

    // **Company Header**
    doc

      .fontSize(12)
      .text(`Saler Name: ${invoiceData.saler_name}`, { align: "right" })
      // .text("Phone: (123) 456-7890", { align: "right" })
      // .text("Email: faizan@gmail.com", { align: "right" })
      .moveDown(2);

    // **Invoice Title**
    const text = "INVOICE";
    const pageWidth = doc.page.width;
    const textWidth = doc.widthOfString(text);

    doc
      .fontSize(20)
      .fillColor("#000000")
      .text(text, (pageWidth - textWidth) / 2, doc.y, { underline: true })
      .moveDown(1);
    // **Order Details**
    doc
      .fontSize(14)
      .fillColor("#444")
      .text(`Customer: ${order.customerName}`, 50)
      .text(`Invoice Date: ${new Date().toLocaleDateString()}`)
      .text(`Order Date: ${order.orderDate}`, 50)
      .text(`Phone: ${order.phoneNo}`)
      .text(`Address: ${order.userAddress}`)
      .moveDown();

    // Table Header
    const headerY = doc.y;
    doc
      .rect(50, headerY, 500, 30) // Header Background
      .fill("#28a745")
      .stroke();

    doc
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("Item", 55, headerY + 10, { width: 180, align: "left" })
      .text("Price", 240, headerY + 10, { width: 80, align: "right" })
      .text("Qty", 350, headerY + 10, { width: 60, align: "center" })
      .text("Total", 450, headerY + 10, { width: 80, align: "right" });

    doc.moveDown();

    // Table Content
    const rowY = doc.y;
    const totalPrice = order.price * order.quantity;

    doc
      .fillColor("#444")
      .font("Helvetica")
      .fontSize(12)
      .text(order.name, 55, rowY + 8, { width: 180, align: "left" })
      .text(`${order.price}rs`, 240, rowY + 8, { width: 80, align: "right" })
      .text(`${order.quantity}`, 350, rowY + 8, { width: 60, align: "center" })
      .text(`${totalPrice}rs`, 450, rowY + 8, { width: 80, align: "right" });

    doc.moveDown(1);

    // Final Total Row
    doc
      .strokeColor("#000")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();

    doc
      .font("Helvetica-Bold")
      .fillColor("black")
      .fontSize(14)
      .text(`Total Amount: ${totalPrice}rs`, 350, doc.y + 10, {
        width: 200,
        align: "right",
      });

    // **Thank You Note**
    doc.moveDown(2);
    doc
      .fontSize(14)
      .fillColor("#000000")
      .text("Thank you!", { align: "right" });

    doc.end();
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = invoiceDownloadRouter;
