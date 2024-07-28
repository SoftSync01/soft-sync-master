const calculateGrowthRates = (data) => {
    const growthRates = [];
    for (let i = 1; i < data.length; i++) {
        const growthRate = ((data[i] - data[i - 1]) / data[i - 1]) * 100;
        growthRates.push(growthRate.toFixed(2)); // keeping two decimal places
    }
    return growthRates;
};

module.exports = calculateGrowthRates