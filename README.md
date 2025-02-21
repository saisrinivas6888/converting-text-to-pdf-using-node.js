# Converting Text to PDF using Node.js

This project demonstrates how to convert text files into PDF documents using Node.js. It provides a simple and efficient solution for generating PDFs from plain text inputs, which can be useful for creating reports, invoices, or any other text-based documents in PDF format.

## Features

- **Text to PDF Conversion**: Converts plain text files into formatted PDF documents.
- **Simple and Lightweight**: Utilizes minimal dependencies to keep the application lightweight.
- **Customizable**: Easily adaptable to include additional features such as styling, headers, footers, and more.

## Prerequisites

Before running this application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.0 or above)
- [npm](https://www.npmjs.com/) (Node package manager)


## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/saisrinivas6888/converting-text-to-pdf-using-node.js.git
   cd converting-text-to-pdf-using-node.js
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

## Usage

1. **Prepare Your Text File**: Place the text file you want to convert into the project directory.

2. **Run the Conversion Script**:

   ```bash
   node server.js
   ```

   This will generate a PDF document from your text file and save it in the `pdfs` directory.

## Project Structure

- `server.js`: The main Node.js script that handles the conversion process.
- `pdfs/`: Directory where the generated PDF files are stored.
- `allpdfs.ejs`: Template file for rendering the list of generated PDFs.
- `popup.html`: HTML file for the browser extension's popup interface.
- `background.js`: Background script for the browser extension.
- `manifest.json`: Configuration file for the browser extension.

## Dependencies

- [pdfkit](https://www.npmjs.com/package/pdfkit): A PDF document generation library for Node.js.
- [express](https://www.npmjs.com/package/express): A minimal and flexible Node.js web application framework.
- [ejs](https://www.npmjs.com/package/ejs): Embedded JavaScript templating.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Note: This project is a basic implementation intended for educational purposes. For production use, consider adding error handling, input validation, and other enhancements as needed.*
