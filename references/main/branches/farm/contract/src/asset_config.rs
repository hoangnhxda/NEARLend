use crate::*;

const MAX_POS: u32 = 10000;
const MAX_RATIO: u32 = 10000;

/// Represents an asset config.
/// Example:
/// 25% reserve, 80% target utilization, 12% target APR, 250% max APR, 60% vol
/// JSON:
/// ```json
/// {
///   "reserve_ratio": 2500,
///   "target_utilization": 8000,
///   "target_utilization_rate": "1000000000003593629036885046",
///   "max_utilization_rate": "1000000000039724853136740579",
///   "volatility_ratio": 6000
/// }
/// ```
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct AssetConfig {
    /// The ratio of interest that is reserved by the protocol (multiplied by 10000).
    /// E.g. 2500 means 25% from borrowed interests goes to the reserve.
    pub reserve_ratio: u32,
    /// Target utilization ratio (multiplied by 10000).
    /// E.g. 8000 means the protocol targets 80% of assets are borrowed.
    pub target_utilization: u32,
    /// The compounding rate at target utilization ratio.
    /// Use `apr_to_rate.py` script to compute the value for a given APR.
    /// Given as a decimal string. E.g. "1000000000003593629036885046" for 12% APR.
    pub target_utilization_rate: LowU128,
    /// The compounding rate at 100% utilization.
    /// Use `apr_to_rate.py` script to compute the value for a given APR.
    /// Given as a decimal string. E.g. "1000000000039724853136740579" for 250% APR.
    pub max_utilization_rate: LowU128,
    /// Volatility ratio (multiplied by 10000).
    /// It defines which percentage collateral that covers borrowing as well as which percentage of
    /// borrowed asset can be taken.
    /// E.g. 6000 means 60%. If an account has 100 $ABC in collateral and $ABC is at 10$ per token,
    /// the collateral value is 1000$, but the borrowing power is 60% or $600.
    /// Now if you're trying to borrow $XYZ and it's volatility ratio is 80%, then you can only
    /// borrow less than 80% of $600 = $480 of XYZ before liquidation can begin.
    pub volatility_ratio: u32,
}

impl AssetConfig {
    pub fn assert_valid(&self) {
        assert!(self.reserve_ratio <= MAX_RATIO);
        assert!(self.target_utilization < MAX_POS);
        assert!(self.target_utilization_rate.0 <= self.max_utilization_rate.0);
    }

    pub fn get_rate(
        &self,
        borrowed_balance: Balance,
        total_supplied_balance: Balance,
    ) -> BigDecimal {
        if total_supplied_balance == 0 {
            BigDecimal::one()
        } else {
            // Fix overflow
            let pos = BigDecimal::from(borrowed_balance).div_u128(total_supplied_balance);
            let target_utilization = BigDecimal::from_ratio(self.target_utilization);
            if pos < target_utilization {
                BigDecimal::one()
                    + pos * (BigDecimal::from(self.target_utilization_rate) - BigDecimal::one())
                        / target_utilization
            } else {
                BigDecimal::from(self.target_utilization_rate)
                    + (pos - target_utilization)
                        * (BigDecimal::from(self.max_utilization_rate)
                            - BigDecimal::from(self.target_utilization_rate))
                        / BigDecimal::from(MAX_POS - self.target_utilization)
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const ONE_NEAR: u128 = 10u128.pow(24);

    fn test_config() -> AssetConfig {
        AssetConfig {
            reserve_ratio: 2500,
            target_utilization: 8000,
            target_utilization_rate: 1000000000003593629036885046u128.into(),
            max_utilization_rate: 1000000000039724853136740579u128.into(),
            volatility_ratio: 6000,
        }
    }

    fn almost_eq(a: u128, b: u128, prec: u32) {
        let p = 10u128.pow(27 - prec);
        let ap = (a + p / 2) / p;
        let bp = (b + p / 2) / p;
        assert_eq!(
            ap,
            bp,
            "{}",
            format!("Expected {} to eq {}, with precision {}", a, b, prec)
        );
    }

    #[test]
    fn test_get_rate() {
        let config = test_config();
        let rate = config.get_rate(3 * ONE_NEAR, 18 * ONE_NEAR);
        println!("{}", rate)
    }
}
