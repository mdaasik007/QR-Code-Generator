document.addEventListener("DOMContentLoaded", () => {
    // Correctly get all the necessary elements from the HTML
    const qrText = document.getElementById("qr-text");
    const generateBtn = document.getElementById("generate-btn");
    const downloadBtn = document.getElementById("download-btn");
    const qrcodeDiv = document.querySelector(".qrcode");
    let qrcode = null;

    // This event listener handles generating the QR code
    generateBtn.addEventListener("click", () => {
        const text = qrText.value.trim();

        if (!text) {
            alert("Please Enter some Text Or URL");
            return;
        }

        // Clear any previously generated QR code
        qrcodeDiv.innerHTML = "";
        
        // Create a new QR code instance
        qrcode = new QRCode(qrcodeDiv, {
            text: text,
            width: 200,
            height: 200,
            colorDark: '#000000',
            colorWhite: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
        });

        // Show the download button after a short delay to ensure the QR code is fully rendered
        // This is a common practice with third-party libraries that create elements asynchronously
        setTimeout(() => {
            downloadBtn.style.display = "block";
        }, 500); 
    });

    // This event listener handles the download functionality
    downloadBtn.addEventListener("click", () => {
        const canvas = qrcodeDiv.querySelector("canvas");
        if (!canvas) {
            alert("No QR code to download!");
            return;
        }

        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // This makes pressing Enter in the text box trigger the generate button
    qrText.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            generateBtn.click();
        }
    });
});