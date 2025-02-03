import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUKi9EMIGputcL32kdGs7W-bhaiGRYKYI",
  authDomain: "stockcomedy-666.firebaseapp.com",
  databaseURL:
    "https://stockcomedy-666-default-rtdb.firebaseio.com",
  projectId: "stockcomedy-666",
  storageBucket: "stockcomedy-666.appspot.com",
  messagingSenderId: "670829636816",
  appId: "1:670829636816:web:bca160907d8e10ec8d02d5",
  measurementId: "G-T8XFP8TFGV",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fungsi untuk mengambil parameter symbol dari URL
function getStockSymbolFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("symbol") || null;
}

// Fungsi untuk mengambil data saham dari Firebase
async function fetchStockDetail(stockSymbol) {
  if (!stockSymbol) {
    console.error("Symbol tidak ditemukan di URL");
    return null;
  }
  const stockRef = ref(db, `stocks/${stockSymbol}`);
  try {
    const snapshot = await get(stockRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error("Gagal mengambil data saham:", error);
    return null;
  }
}

// Fungsi pembantu untuk update cell dengan formatting (jika diperlukan)
function updateCell(cellId, value, formatter) {
  const cell = document.getElementById(cellId);
  if (cell) {
    cell.textContent =
      value !== undefined && value !== null
        ? formatter
          ? formatter(value)
          : value
        : "-";
  }
}

// Fungsi untuk menampilkan detail saham pada halaman
async function renderStockDetail() {
  const stockSymbol = getStockSymbolFromURL();
  const stockHeader = document.getElementById("stockHeader");
  console.log("Symbol:", stockSymbol);

  if (!stockSymbol) {
    if (stockHeader) {
      stockHeader.innerHTML = "<p>Stock symbol is missing.</p>";
    }
    return;
  }

  const stockData = await fetchStockDetail(stockSymbol);
  console.log("Stock Data:", stockData);

  if (!stockData) {
    if (stockHeader) {
      stockHeader.innerHTML = `<p>Stock data not found for symbol: ${stockSymbol}</p>`;
    }
    return;
  }

  // Menampilkan data dasar di bagian header
  if (stockHeader) {
    stockHeader.innerHTML = `
      <h2>${stockData.companyName || "Unknown Company"} (${stockSymbol})</h2>
      <p><strong>Price:</strong> $${parseFloat(stockData.price || 0).toFixed(
        2
      )}</p>
      <p><strong>Momentum:</strong> ${parseFloat(
        stockData.momentum || 0
      ).toFixed(2)}%</p>
      <p><strong>Market Cap:</strong> ${
        stockData.financials && stockData.financials.marketValuation
          ? "$" +
            parseFloat(
              stockData.financials.marketValuation.marketCap || 0
            ).toLocaleString()
          : "N/A"
      }</p>
      <p><strong>Sector:</strong> ${stockData.sector || "Unknown"}</p>
      <p><strong>P/E Ratio:</strong> ${stockData.peRatio || "N/A"}</p>
      <p><strong>Dividend Yield:</strong> ${
        stockData.dividendYieldBasic
          ? stockData.dividendYieldBasic + "%"
          : "N/A"
      }</p>
      <a href="stock-list.html" class="btn-primary">Back to Stock List</a>
    `;
  }

  // Update Profitability Ratios dan Growth Indicators (Profitability)
  if (stockData.financials && stockData.financials.profitability) {
    updateCell(
      "grossProfitMarginQuarter",
      stockData.financials.profitability.grossProfitMarginQuarter,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    updateCell(
      "operatingProfitMarginQuarter",
      stockData.financials.profitability.operatingProfitMarginQuarter,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    updateCell(
      "netProfitMarginQuarter",
      stockData.financials.profitability.netProfitMarginQuarter,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    updateCell(
      "revenueQuarterYoYGrowth",
      stockData.financials.profitability.revenueQuarterYoYGrowth,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    updateCell(
      "grossProfitQuarterYoYGrowth",
      stockData.financials.profitability.grossProfitQuarterYoYGrowth,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    updateCell(
      "netIncomeQuarterYoYGrowth",
      stockData.financials.profitability.netIncomeQuarterYoYGrowth,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    // Dividend Metrics
    updateCell(
      "dividend",
      stockData.financials.profitability.dividendQuarter
    );
    updateCell(
      "dividendTTM",
      stockData.financials.profitability.dividendTTM
    );
    updateCell(
      "payoutRatio",
      stockData.financials.profitability.payoutRatio,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    updateCell(
      "dividendYield",
      stockData.financials.profitability.dividendYield,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
  }

  // Update Market Capitalization dan Enterprise Value
  if (stockData.financials && stockData.financials.marketValuation) {
    updateCell(
      "marketCap",
      stockData.financials.marketValuation.marketCap,
      (val) => "$" + parseFloat(val).toLocaleString()
    );
    updateCell(
      "enterpriseValue",
      stockData.financials.marketValuation.enterpriseValue,
      (val) => "$" + parseFloat(val).toLocaleString()
    );
    updateCell(
      "currentSharesOutstanding",
      stockData.financials.marketValuation.currentSharesOutstanding,
      (val) => parseFloat(val).toLocaleString()
    );
  }

  // Update Balance Sheet
  if (stockData.financials && stockData.financials.balanceSheet) {
    updateCell(
      "totalAssetsQuarter",
      stockData.financials.balanceSheet.totalAssetsQuarter,
      (val) => "$" + parseFloat(val).toLocaleString()
    );
    updateCell(
      "totalLiabilitiesQuarter",
      stockData.financials.balanceSheet.totalLiabilitiesQuarter,
      (val) => "$" + parseFloat(val).toLocaleString()
    );
    updateCell(
      "workingCapitalQuarter",
      stockData.financials.balanceSheet.workingCapitalQuarter,
      (val) => "$" + parseFloat(val).toLocaleString()
    );
    updateCell(
      "totalEquity",
      stockData.financials.balanceSheet.totalEquity,
      (val) => "$" + parseFloat(val).toLocaleString()
    );
    updateCell(
      "longTermDebtQuarter",
      stockData.financials.balanceSheet.longTermDebtQuarter,
      (val) => "$" + parseFloat(val).toLocaleString()
    );
    updateCell(
      "shortTermDebtQuarter",
      stockData.financials.balanceSheet.shortTermDebtQuarter,
      (val) => "$" + parseFloat(val).toLocaleString()
    );
    updateCell(
      "totalDebtQuarter",
      stockData.financials.balanceSheet.totalDebtQuarter,
      (val) => "$" + parseFloat(val).toLocaleString()
    );
    updateCell(
      "netDebtQuarter",
      stockData.financials.balanceSheet.netDebtQuarter,
      (val) => "$" + parseFloat(val).toLocaleString()
    );
  }

  // Update Solvency / Liquidity
  if (stockData.financials && stockData.financials.liquidityAndSolvency) {
    updateCell(
      "currentRatioQuarter",
      stockData.financials.liquidityAndSolvency.currentRatioQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
    updateCell(
      "quickRatioQuarter",
      stockData.financials.liquidityAndSolvency.quickRatioQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
    updateCell(
      "debtToEquityQuarter",
      stockData.financials.liquidityAndSolvency.debtToEquityRatioQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
    updateCell(
      "ltDebtEquityQuarter",
      stockData.financials.liquidityAndSolvency.ltDebtToEquityQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
    updateCell(
      "totalLiabilitiesEquityQuarter",
      stockData.financials.liquidityAndSolvency.totalLiabilitiesToEquityQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
    updateCell(
      "totalDebtAssetsQuarter",
      stockData.financials.liquidityAndSolvency.totalDebtToAssetsQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
    updateCell(
      "financialLeverageQuarter",
      stockData.financials.liquidityAndSolvency.financialLeverageQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
  }

  // Update Management Effectiveness (Efficiency and Return)
  if (
    stockData.financials &&
    stockData.financials.efficiencyAndReturn
  ) {
    updateCell(
      "returnOnAssetsTTM",
      stockData.financials.efficiencyAndReturn.returnOnAssetsTTM,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    updateCell(
      "returnOnEquityTTM",
      stockData.financials.efficiencyAndReturn.returnOnEquityTTM,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    updateCell(
      "returnOnCapitalEmployedTTM",
      stockData.financials.efficiencyAndReturn.returnOnCapitalEmployedTTM,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    updateCell(
      "returnOnInvestedCapitalTTM",
      stockData.financials.efficiencyAndReturn.returnOnInvestedCapitalTTM,
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    updateCell(
      "daysSalesOutstandingQuarter",
      stockData.financials.efficiencyAndReturn.daysSalesOutstandingQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
    updateCell(
      "daysInventoryQuarter",
      stockData.financials.efficiencyAndReturn.daysInventoryQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
    updateCell(
      "daysPayablesOutstandingQuarter",
      stockData.financials.efficiencyAndReturn.daysPayablesOutstandingQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
    updateCell(
      "cashConversionCycleQuarter",
      stockData.financials.efficiencyAndReturn.cashConversionCycleQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
    updateCell(
      "receivablesTurnoverQuarter",
      stockData.financials.efficiencyAndReturn.receivablesTurnoverQuarter,
      (val) => parseFloat(val).toFixed(2)
    );
  }

  // Update Price Performance
  if (stockData.financials && stockData.financials.stockPerformance) {
    updateCell(
      "priceReturns1Week",
      stockData.financials.stockPerformance["1WeekPriceReturns"],
      (val) => parseFloat(val).toFixed(2) + "%"
    );
    // Contoh: jika ada data 52 Week High/Low (sesuaikan dengan key yang tersedia)
    updateCell(
      "week52High",
      stockData.financials.stockPerformance["1WeekHigh"],
      (val) => "$" + parseFloat(val).toLocaleString()
    );
    // Tambahkan update untuk priceReturns1Year, priceReturns3Year, dst. jika datanya tersedia
  }
}

// Jalankan render saat halaman selesai dimuat
window.onload = renderStockDetail;