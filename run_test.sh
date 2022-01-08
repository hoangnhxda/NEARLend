export NEAR_ENV=testnet
export OWNER_ID=hoangnh_xda.testnet
export ORACLE_ID=hoangnh_xda.testnet
export ACCOUNT_ID=hoangnh_xda.testnet
export CONTRACT_ID=burrowland.hoangnh_xda.testnet
export BOOSTER_TOKEN_ID=ref.fakes.testnet
export WETH_TOKEN_ID=weth.fakes.testnet
export DAI_TOKEN_ID=dai.fakes.testnet
export USDT_TOKEN_ID=usdt.fakes.testnet
export USDC_TOKEN_ID=usdc.testnet
export NEL_TOKEN_ID=nearlendtest.testnet
export WNEAR_TOKEN_ID=wrap.testnet
export ONE_YOCTO=0.000000000000000000000001
export GAS=200000000000000

near deploy $CONTRACT_ID --accountId $ACCOUNT_ID --wasmFile ./res/burrowland.wasm

near call $CONTRACT_ID new  '{"config" : {"oracle_account_id": "' $ACCOUNT_ID '", "owner_id": "' $ACCOUNT_ID '", "booster_token_id": "'$BOOSTER_TOKEN_ID'", "booster_decimals": 24}}' --accountId $ACCOUNT_ID

near call $CONTRACT_ID --accountId=$ACCOUNT_ID --gas=$GAS --amount=0.1 storage_deposit '{}'

near call $CONTRACT_ID addAccount '{"account_id": "hoangnh_xda.testnet"}' --accountId $ACCOUNT_ID 

near call $CONTRACT_ID get_account '{"account_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID 

// near call $CONTRACT_ID new '{"locked_token_account_id": "'$ACCOUNT_ID'", "token_id": "usdc.testnet", "meta":{ "spec": "ft-1.0.0", "name": "USDC", "symbol": "USDC", "icon": "", "reference": "", "reference_hash": "2ASN2AmVMxXj8XALRfdwQ9sSwyydrzmmqyox2UJdYRxv", "decimals": 8 }, "backup_trigger_account_id": "hoangnh_xda.testnet", "price_oracle_account_id": "hoangnh_xda.testnet", "asset_id": "usdc.testnet", "minimum_unlock_price": {"multiplier": "10", "decimals": 8}}' --account-id hoangnh_xda.testnet

near call $CONTRACT_ID get_assets_paged '{"from_index": 0, "limit": 10}' --accountId $ACCOUNT_ID 

near call $CONTRACT_ID get_assets_paged_detailed '{"from_index": 0, "limit": 10}' --accountId $ACCOUNT_ID 

near call $CONTRACT_ID get_asset '{"token_id": "'$BOOSTER_TOKEN_ID'"}' --accountId $ACCOUNT_ID 

near view $BOOSTER_TOKEN_ID ft_metadata

near view $USDC_TOKEN_ID ft_balance_of '{"account_id": "'$CONTRACT_ID'"}'

near view $NEL_TOKEN_ID ft_balance_of '{"account_id": "'$ACCOUNT_ID'"}'

near view $NEL_TOKEN_ID storage_balance_bounds

near call $USDC_TOKEN_ID storage_deposit '{"account_id": "'$CONTRACT_ID'"}' --accountId $ACCOUNT_ID --deposit 0.01

near call $USDC_TOKEN_ID ft_transfer '{"receiver_id": "'$CONTRACT_ID'", "amount": "1"}' --accountId $ACCOUNT_ID --amount 0.000000000000000000000001

near call $CONTRACT_ID --accountId=$OWNER_ID add_asset '{
  "token_id": "'$USDC_TOKEN_ID'",
  "asset_config": {
    "reserve_ratio": 2500,
    "target_utilization": 8000,
    "target_utilization_rate": "1000000000008319516250272147",
    "max_utilization_rate": "1000000000039724853136740579",
    "volatility_ratio": 2000,
    "extra_decimals": 0,
    "can_deposit": true,
    "can_withdraw": true,
    "can_use_as_collateral": true,
    "can_borrow": true
  }
}' --amount=$ONE_YOCTO --gas=$GAS

near call $USDC_TOKEN_ID ft_transfer_call '{"receiver_id": "<defi_contract_id>", "amount": "10", "msg": "take-my-money"}' --accountId <user_account_id> --amount 0.000000000000000000000001

near call $USDC_TOKEN_ID --accountId=$ACCOUNT_ID --gas=$GAS --amount=$ONE_YOCTO ft_transfer_call '{
  "receiver_id": "'$CONTRACT_ID'",
  "amount": "1",
  "msg": "{\"Execute\": {\"actions\": [{\"Borrow\": {\"token_id\": \"'$USDC_TOKEN_ID'\"}}]}}"
}'