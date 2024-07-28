const calculateGrowthRates = require('./calculateGrowthRates')
const calculateProfitMargins = require('./calculateProfitMargin')

test('calculate growth rate [size = 3]', () =>{
    data = [100,200,300]
    expect(calculateGrowthRates(data)).toStrictEqual(["100.00","50.00"])
})

test('calculate growth rate [Empty Dataset]', () =>{
    data = []
    expect(calculateGrowthRates(data)).toStrictEqual([])
})

test('calculate growth rate [Decreasing Dataset]', () =>{
    data = [500,200,300,400,50]
    expect(calculateGrowthRates(data)).toStrictEqual(["-60.00","50.00","33.33","-87.50"])
})

test('calculate profit margin [size = 3]', () =>{
    RevenueData = [100,200,300]
    SpendingData = [20, 50 , 100]
    expect(calculateProfitMargins(RevenueData, SpendingData)).toStrictEqual(["80.00","75.00", "66.67"])
})

test('calculate profit margin [Empty Dataset]', () =>{
    RevenueData = []
    SpendingData = []
    expect(calculateProfitMargins(RevenueData, SpendingData)).toStrictEqual([])
})