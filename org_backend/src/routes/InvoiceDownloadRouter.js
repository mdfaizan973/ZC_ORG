const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const invoiceDownloadRouter = express.Router();

invoiceDownloadRouter.get("/:orderId", (req, res) => {
  try {
    const { orderId } = req.params;

    // Dummy order data (Replace with actual DB query)
    const order = {
      id: orderId,
      customerName: "John Doe",
      date: new Date().toLocaleDateString(),
      items: [
        { name: "Product 1", price: 100, quantity: 2 },
        { name: "Product 2", price: 50, quantity: 1 },
      ],
      total: 250,
    };

    const doc = new PDFDocument({ margin: 50 });

    const fileName = `invoice-${orderId}.pdf`;
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // **Company Header with Logo**
    const logoPath =
      "https://i.pinimg.com/474x/7b/2b/ad/7b2bad053677fd048c5d312c43220ff7.jpg"; // Replace with actual logo path
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 50, { width: 100 });
    }

    doc
      .fontSize(20)
      .fillColor("#333")
      .text("Company Name", 200, 50, { align: "right" })
      .fontSize(12)
      .text("123 Street, City, Country", { align: "right" })
      .text("Phone: (123) 456-7890", { align: "right" })
      .text("Email: support@company.com", { align: "right" })
      .moveDown(2);

    // **Invoice Title**
    doc
      .fontSize(25)
      .fillColor("#0073e6")
      .text("INVOICE", { align: "center", underline: true })
      .moveDown(1);

    // **Order Details**
    doc
      .fontSize(14)
      .fillColor("#444")
      .text(`Order ID: ${order.id}`)
      .text(`Customer: ${order.customerName}`)
      .text(`Date: ${order.date}`)
      .moveDown();

    // **Table Header**
    doc
      .rect(50, doc.y, 500, 25)
      .fill("#0073e6")
      .stroke()
      .fillColor("white")
      .fontSize(12)
      .text("Item", 55, doc.y + 5, { width: 200, continued: true })
      .text("Price", 255, doc.y + 5, { width: 100, continued: true })
      .text("Qty", 355, doc.y + 5, { width: 100, continued: true })
      .text("Total", 455, doc.y + 5, { width: 100 });

    doc.moveDown(1);
    doc.fillColor("black");

    // **Order Items**
    order.items.forEach((item) => {
      const totalPrice = item.price * item.quantity;
      doc
        .fontSize(12)
        .fillColor("#444")
        .text(item.name, 55, doc.y, { width: 200, continued: true })
        .text(`₹${item.price}`, 255, doc.y, { width: 100, continued: true })
        .text(`${item.quantity}`, 355, doc.y, { width: 100, continued: true })
        .text(`₹${totalPrice}`, 455, doc.y, { width: 100 });

      doc.moveDown(0.5);
    });

    doc.moveDown();
    doc
      .strokeColor("#000")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .stroke();
    doc.moveDown(1);

    // **Total Amount**
    doc.fontSize(16).fillColor("black").text(`Total Amount: ₹${order.total}`, {
      align: "right",
      underline: true,
    });

    // **Signature Section**
    doc.moveDown(2);
    doc
      .fontSize(14)
      .fillColor("#555")
      .text("Authorized Signature:", 50, doc.y)
      .moveDown(2);
    doc
      .strokeColor("#000")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(200, doc.y)
      .stroke();

    // **Thank You Note**
    doc.moveDown(2);
    doc
      .fontSize(14)
      .fillColor("#0073e6")
      .text("Thank you for your purchase!", { align: "center", italic: true });

    doc.end();
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = invoiceDownloadRouter;
