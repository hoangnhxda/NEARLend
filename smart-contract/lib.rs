use near_sdk::collections::UnorderedMap;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{
    env, near_bindgen, AccountId, Balance, EpochHeight,Promise
};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::json_types::{U128};

/// A type to distinguish between a balance and "stake" shares for better readability.
pub type NumStakeShares = Balance;

/// Inner account data of a delegate.
#[derive(BorshDeserialize, BorshSerialize, Debug, PartialEq, Serialize, Deserialize)]
pub struct Account {

	pub borrowed: Balance,
	pub borrow_shares: NumStakeShares,
	pub supplied: Balance,
	pub supply_shares: NumStakeShares,
	pub borrowed_available_epoch_height: EpochHeight,
    pub supplied_available_epoch_height: EpochHeight

}

impl Default for Account {
    fn default() -> Self {
        Self {
            borrowed: 0,
            borrow_shares: 0,
			supplied:0,
			supply_shares:0,
			borrowed_available_epoch_height:0,
            supplied_available_epoch_height: 0
        }
    }
}


/// The number of epochs required for the locked balance to become unlocked.
/// NOTE: The actual number of epochs when the funds are unlocked is 3. But there is a corner case
/// when the unstaking promise can arrive at the next epoch, while the inner state is already
/// updated in the previous epoch. It will not unlock the funds for 4 epochs.
//const NUM_EPOCHS_TO_UNLOCK: EpochHeight = 4;
#[near_bindgen]

#[derive(BorshDeserialize, BorshSerialize)]

pub struct NEARLendContract {
    pub owner_id: AccountId,
    pub last_epoch_height: EpochHeight,
    pub total_pool_balance: Balance,
	pub accounts: UnorderedMap<AccountId, Account>,
    pub paused: bool,
}

impl Default for NEARLendContract {
    fn default() -> Self {
        env::panic(b"Staking contract should be initialized before usage")
    }

}

#[near_bindgen]
impl NEARLendContract{
	#[init]
	pub fn new() -> Self{
		assert!(!env::state_exists(), "Already initialized");
		assert!(
            env::is_valid_account_id(env::current_account_id().as_bytes()),
            "The owner account ID is invalid"
        );
		// let account_balance = env::account_balance();
		let mut this = Self {
            owner_id : env::current_account_id(),
            last_epoch_height : env::epoch_height(),
            total_pool_balance : 0,
			accounts : UnorderedMap::new(b"u".to_vec()),
            paused: false,
        };
		this
	}

    #[payable]
	pub fn supply(&mut self){
		let amount: Balance = env::attached_deposit();
        assert!(env::account_balance() >= amount, "You don't have enought balance");
		//let amount: Balance = 2;
        self.total_pool_balance += amount; // Add in total pool
		let account_id  = env::signer_account_id();
        let mut account =  self.accounts.get(&account_id).unwrap_or_default();
		account.supplied += amount; //add in account
        self.accounts.insert(&account_id, &account);
	}

    pub fn withdraw_supply(&mut self, am:U128){
        let account_id = env::signer_account_id();
        let mut account =  self.accounts.get(&account_id).unwrap_or_default();
        let amount: Balance = am.into();
        assert!(amount > 0, "Withdrawal amount should be positive");
        assert!(amount <= self.get_account_supplied_balance(), "Withdrawal amount should be less or equal to your supply");
        self.total_pool_balance -= amount;
        account.supplied -= amount; //add in account
        // self.accounts.insert(&account_id, &account);
        Promise::new(env::signer_account_id()).transfer(amount);
    }

    
	/****************/
    /* View methods */
    /****************/
	pub fn get_account_supplied_balance(&self) -> Balance {
        let account_id = env::signer_account_id();
        self.accounts.get(&account_id).unwrap_or_default().supplied
    }

    pub fn test1() -> i128 {
        return 100;
    }

     /// Returns the total pool balance.
    pub fn get_total_pool_balance(&self) -> U128 {
        self.total_pool_balance.into()
    }
    
    pub fn get_account(&self) -> Account {
        let account_id = env::signer_account_id();
        self.accounts.get(&account_id).unwrap_or_default()
    }

}




