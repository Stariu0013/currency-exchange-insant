export function formatDisplayNumber(num: number, currency?: string) {
    if (currency) {
        return new Intl.NumberFormat(void 0, { maximumFractionDigits: 6, style: "currency", currency }).format(num);
    }

    return new Intl.NumberFormat(void 0, { maximumFractionDigits: 6 }).format(num);
}

export function getCurrencySymbol(currency: string) {
    if (currency === "BTC") {
        return "₿";
    }
    if (currency === "UAH") {
        return "₴";
    }

    const parts = new Intl.NumberFormat(void 0, { style: "currency", currency }).formatToParts(1);

    return parts.find(el => el.type === "currency")?.value || "";
}

// formatDisplayNumber(10102.2) => '10 102,20 $' => 10102.2
// '20.100.200,123' => 20100200.123
export function parseNumberFromDisplayNumber(str: string, currency = "USD") {
    const parts = new Intl.NumberFormat(void 0, { style: "currency", currency }).formatToParts(10000.1);

    const groupSymbol = parts.find(el => el.type === "group")?.value || "";
    const decimalSymbol = parts.find(el => el.type === "decimal")?.value || ",";
    const currencySymbol = parts.find(el => el.type === "currency")?.value || "";

    let result = str.replaceAll(groupSymbol, "");

    if (decimalSymbol !== ".") {
        result = result.replace(decimalSymbol, ".");
    }

    if (currencySymbol) {
        result = result.replace(currencySymbol, "");
    }

    return Number(result.replace(/\s/g, "").trim());
}