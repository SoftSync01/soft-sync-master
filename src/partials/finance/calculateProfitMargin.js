    function calculateProfitMargins(revenueData, spendingData) {
        const profitMargins = revenueData.map((revenue, index) => {
            const spending = spendingData[index];
            const profitMargin = ((revenue - spending) / revenue) * 100;
            return profitMargin.toFixed(2); // keeping two decimal places
        });
        return profitMargins;
    }

    module.exports = calculateProfitMargins