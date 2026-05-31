# 🖨️ Velocity Service Printing Bookmarklet

**Velocity Service Printing Bookmarklet** is a browser-based tool designed to generate clean, print-optimized confirmation sheets directly from the **Velocity** CRM/service order page.

It extracts order details from the CRM DOM, styles them according to the Velocity service sheet design guidelines, and triggers the print dialog with linear barcodes for order and reservation numbers.

---

## ✨ Features

*   **Automated Data Extraction:** Parses order numbers, reservation numbers, bike models, customer information (separates phone and email from the info text block), order status, intake/expected delivery dates, and total prices.
*   **Dynamic Layout Selection:**
    *   **Double Ticket (Default):** For orders with **9 or fewer items**, it renders **two identical copies on a single A4 page** separated by a dashed cut-line (one copy for the workshop, one for the customer).
    *   **Single Ticket (Large Orders):** For orders with **more than 9 items** (or long descriptions), it automatically expands the height to fill a **single full-size A4 page**.
*   **On-the-Fly Barcodes:** Integrates with the free `bwip-js` API to generate Code 128 vertical barcodes for both the order number and reservation number.
*   **Print-Optimized Styles:** Leverages CSS `@media print` rules to hide CRM headers, sidebars, and inputs, rendering only the clean customer ticket.
*   **Client-Side Execution:** Lightweight, offline-ready, and works in any modern browser without installing browser extensions.

---

## 🚀 Installation

The recommended way to install the bookmarklet is using the compiled [GitHub Pages website](https://Bulochkq.github.io/bookmarklets/) or opening the [index.html](file:///c:/Users/buloc/OneDrive/Рабочий стол/bookmarklets/index.html) file locally in your browser:

1.  Show your browser's Bookmarks Bar:
    *   **Windows:** `Ctrl + Shift + B`
    *   **Mac:** `Cmd + Shift + B`
2.  **Drag and drop** the purple **`🖨️ Tlač Servisu Velocity`** button directly onto your Bookmarks Bar.

### Manual Installation
1.  Create a new bookmark in your browser.
2.  Name it `🖨️ Print Velocity`.
3.  Copy the entire content of [dist/bookmarklet.url.txt](file:///c:/Users/buloc/OneDrive/Рабочий стол/bookmarklets/dist/bookmarklet.url.txt) (the string starting with `javascript:`).
4.  Paste it into the **URL / Address** field of the bookmark and save.

---

## 🛠️ How to Use

1.  Open the service ticket or order details page in your CRM.
2.  Click the **`🖨️ Tlač Servisu Velocity`** bookmark in your Bookmarks Bar.
3.  Wait 1.5 seconds for the barcode images to fetch and load.
4.  The system Print Dialog will open automatically. Configure the settings:
    *   **Destination:** Choose your printer or Save as PDF.
    *   **Paper Size:** A4
    *   **Orientation:** Portrait
    *   **Margins:** None or Default (for optimal alignment).
    *   **Background graphics:** **Enabled** (critical to render table colors and borders).
5.  Click **Print**.

---

## 📂 Project Structure

```text
bookmarklets/
├── src/
│   ├── bookmarklet.js          # Well-formatted source code with comments
│   └── index.template.html     # Website installer template
├── dist/
│   ├── bookmarklet.min.js      # Minified and compressed Javascript code
│   └── bookmarklet.url.txt     # URL-encoded bookmarklet link string (javascript:...)
├── index.html                  # Compiled interactive web installer
├── build.js                    # Node.js builder/compiler script
├── .gitignore                  # Git ignore file for OS and IDE files
└── README.md                   # Project documentation
```

---

## 💻 Development & Building

If you need to adjust styling, logo paths, or parsing logic:

1.  Modify the source files in `src/`:
    *   [src/bookmarklet.js](file:///c:/Users/buloc/OneDrive/Рабочий стол/bookmarklets/src/bookmarklet.js) (script logic)
    *   [src/index.template.html](file:///c:/Users/buloc/OneDrive/Рабочий стол/bookmarklets/src/index.template.html) (web UI)
2.  Rebuild the project:
    ```bash
    node build.js
    ```
3.  The compiler will:
    *   Strip comments and format whitespaces.
    *   Create a minified javascript asset.
    *   URL-encode the JS code.
    *   Inject the code into `index.html`.
