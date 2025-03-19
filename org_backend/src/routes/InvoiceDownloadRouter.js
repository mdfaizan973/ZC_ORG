const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const OrganicProductModel = require("../models/organicProductsModel");

const invoiceDownloadRouter = express.Router();

invoiceDownloadRouter.get("/:orderId", async (req, res) => {
    const { orderId } = req.params;
    console.log(orderId)
    try {
        const data = await OrganicProductModel.findOne({ _id: orderId });

        const order = {
            id: orderId,
            customerName: "John Doe",
            date: new Date().toLocaleDateString(),
            name: "Product 2",
            price: 50,
            quantity: 2
        };

        const doc = new PDFDocument({ margin: 50 });
        const fileName = `invoice-${order.id}.pdf`;

        res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
        res.setHeader("Content-Type", "application/pdf");

        doc.pipe(res);
        // Order ID at the top-right
        doc.fontSize(12).text(`Order ID: ${order.id}`, doc.page.width - 350, 30, { align: "right" });

        // Add some space before the logo
        doc.moveDown(1);

        const logoPath = path.join(__dirname, "uploads", "1739810851986.png");

        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 50, 50, { width: 100 });
        }

        // **Company Header**
        doc
            .fontSize(20)
            .fillColor("#333")
            .text("Organic Store", 200, 50, { align: "right" })
            .fontSize(12)
            .text("123 Street, City, Country", { align: "right" })
            .text("Phone: (123) 456-7890", { align: "right" })
            .text("Email: faizan@gmail.com", { align: "right" })
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
            .text(`Customer: ${order.customerName}  Date: ${order.date}`, 50)
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

        doc.moveDown(); // Ensure enough spacing after the header

        const rowY = doc.y;


        doc
            .fillColor("#444")
            .font("Helvetica")
            .fontSize(12)
            .text(order.name, 55, rowY + 8, { width: 180, align: "left" })
            .text(`${order.price}rs`, 240, rowY + 8, { width: 80, align: "right" })
            .text(`${order.quantity}`, 350, rowY + 8, { width: 60, align: "center" })
            .text(`${order.price * order.quantity}rs`, 450, rowY + 8, { width: 80, align: "right" });


        doc.moveDown(1);

        // Final Total Row with Bold Styling
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
            .text(`Total Amount: ${order.price * order.quantity}rs`, 350, doc.y + 10, { width: 200, align: "right" })

        // **Thank You Note**
        doc.moveDown(2);
        doc
            .fontSize(14)
            .fillColor("#000000")
            .text("Thank you!", {align: "right" });

        doc.end();
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = invoiceDownloadRouter;
