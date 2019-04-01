#
# Uncomment to clean all conversations for demo purposes
#

# User.delete_all
Share.delete_all

ticker_list = [ 
        {   symbol: "AAPL",
            shares: 1,
            pricePurchase: 300.12,
            unitPurchase: "USD"
        },
        {   symbol: "AAT",
            shares: 2,
            pricePurchase: 1500.00,
            unitPurchase: "USD"
        },
        {   symbol: "NFLX",
            shares: 5,
            pricePurchase: 100.37,
            unitPurchase: "USD"
        },
        {   symbol: "AAPL",
            shares: 5,
            pricePurchase: 100.22,
            unitPurchase: "USD"
        },
        {   symbol: "AEP-B",
            shares: 5,
            pricePurchase: 99.99,
            unitPurchase: "USD"
        }
]

ticker_list.each { |share| 
    Share.create(
    user_id: 1,
    ticker: share[:symbol],
    buy_amount: share[:shares],
    buy_date: Time.now,
    buy_price: share[:pricePurchase],
    buy_currency: share[:unitPurchase]
    )
}