use crate::*;

pub struct Prices {
    prices: HashMap<TokenId, Price>,
}

impl Prices {
    pub fn new() -> Self {
        Self {
            prices: HashMap::new(),
        }
    }

    pub fn get_unwrap(&self, token_id: &TokenId) -> &Price {
        self.prices.get(token_id).expect("Asset price is missing")
    }
}

impl From<PriceData> for Prices {
    fn from(data: PriceData) -> Self {
        Self {
            prices: data
                .prices
                .into_iter()
                .filter_map(|AssetOptionalPrice { asset_id, price }| {
                    price.map(|price| (asset_id, price))
                })
                .collect(),
        }
    }
}
