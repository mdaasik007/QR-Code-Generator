# QR Code Generator

A simple, responsive web application that allows users to generate and download QR codes from text or URLs. Built with **HTML**, **CSS**, and **JavaScript** using the [QRCode.js](https://github.com/davidshimjs/qrcodejs) library.

---

## Table of Contents

* [Features](#features)
* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [Dependencies](#dependencies)
* [Configuration](#configuration)
* [Examples](#examples)
* [Troubleshooting](#troubleshooting)
* [Contributors](#contributors)
* [License](#license)

---

## Features

* Generate QR codes instantly from text or URLs
* Download generated QR codes as PNG images
* Responsive and modern UI with a gradient background
* Keyboard shortcut: Press **Enter** to generate QR code
* Error handling when input is empty

---

## Demo

🚀 You can run the app locally or host it on GitHub Pages/Netlify.
*(Add your live demo link here if available)*

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/qr-code-generator.git
   cd qr-code-generator
   ```
2. Open `index.html` in your browser.
   *(No server setup required!)*

---

## Usage

1. Enter text or a URL in the input box.
2. Click **Generate QR Code** or press **Enter**.
3. A QR code will appear below.
4. Click **Download QR Code** to save it as a PNG.

---

## Dependencies

* [QRCode.js](https://cdnjs.com/libraries/qrcodejs) (CDN loaded)
* Google Fonts: [Poppins](https://fonts.google.com/specimen/Poppins)

---

## Configuration

You can customize the QR code by modifying these parameters in `Qr.js`:

```js
qrcode = new QRCode(qrcodeDiv, {
    text: text,
    width: 200,       // QR code width
    height: 200,      // QR code height
    colorDark: '#000000',  // QR code color
    colorWhite: '#ffffff', // Background color
    correctLevel: QRCode.CorrectLevel.H, // Error correction level
});
```

---

## Examples

* Input: `https://github.com` → Generates a scannable QR code for GitHub’s homepage.
* Input: `Hello World!` → Generates a QR code containing the text message.

---

## Troubleshooting

* **QR code not generating?**
  Ensure you entered text or a URL before clicking **Generate**.
* **Download button not showing?**
  The button appears after a QR code is generated.
* **No QR code downloads?**
  Check if your browser allows automatic downloads from JavaScript.

---

## Contributors

* **Your Name** – Developer

---

## License

This project is licensed under the **MIT License** – feel free to use, modify, and distribute.

Your JavaScript code for the QR code generator had several errors that affected its functionality and readability. The key issues were a **logical flaw**, **incorrect element selection**, and **inconsistent variable names**.

---

### 1. Logical Flow Error

The biggest problem was that both the QR code generation and the download function were triggered by the same button's click event. This created a **race condition**: the download function would attempt to find and save the QR code before the image had been fully created by the `qrcode.js` library. This would often result in a corrupted or empty file being downloaded.

**How I Fixed It:**
I separated the responsibilities of the "Generate" and "Download" buttons. The HTML was updated to have two distinct buttons with clear IDs (`generate-btn` and `download-btn`). In the JavaScript, a `click` event listener was attached to each button, so the generation and download processes now operate independently. I also added a `setTimeout` function to the generation logic to ensure the QR code has enough time to render before the download button is made visible.

---

### 2. Element Selection Error

Your code used `document.getElementsByClassName("qrcode")`, which returns an **HTMLCollection**—a list of elements—even if only one element exists. The `QRCode` library, however, requires a single HTML element to know where to render the QR code. Passing an HTMLCollection would cause the function to fail.

**How I Fixed It:**
I changed the selector to `document.querySelector(".qrcode")`. This method correctly returns a single HTML element, which is exactly what the `QRCode` constructor expects, making the code more robust and readable.

---

### 3. Inconsistent Variable Names

You were using a variable named `generateBtn` to reference the download button and then later tried to use an undefined variable named `downloadBtn` to handle its actions. This mix-up made the code confusing and prone to `ReferenceError`s.

**How I Fixed It:**
I assigned a separate variable to each button: `generateBtn` for the "Generate QR Code" button and `downloadBtn` for the "Download QR Code" button. This clear and consistent naming convention makes the code much easier to read, understand, and maintain. 
