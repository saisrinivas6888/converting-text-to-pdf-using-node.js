const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.set('view engine', 'ejs');
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));

// Create pdfs directory if it doesn't exist
const pdfDir = path.join(__dirname, 'pdfs');
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir);
}

// Generate PDF endpoint
app.post("/api/generate-pdf", async (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).send('No text provided');
  }

  try {
    const uuid = crypto.randomUUID();
    const filePath = path.join(__dirname, 'pdfs', `${uuid}.pdf`);
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);

    // Set up PDF generation
    doc.pipe(writeStream);
    
    // Add content to PDF
    doc.fontSize(12);
    doc.text(text, {
      align: 'left',
      lineGap: 5
    });
    
    doc.end();

    // Wait for the PDF to be fully written
    await new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    // Send the generated PDF
    const fileContent = await fs.promises.readFile(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${uuid}.pdf`);
    res.send(fileContent);

  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).send('Error generating PDF');
  }
});

// List all PDFs endpoint
app.get('/', (req, res) => {
  fs.readdir(path.join(__dirname, 'pdfs'), (err, files) => {
    if (err) {
      console.error('Error reading PDF directory:', err);
      return res.status(500).send('Error reading PDF directory');
    }
    // Filter only PDF files
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
    res.render('allpdfs', { files: pdfFiles });
  });
});

// View specific PDF endpoint
app.get('/pdfs/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'pdfs', filename);
  
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      console.error('Error accessing PDF file:', err);
      return res.status(404).send('PDF not found');
    }
    res.sendFile(filePath);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
