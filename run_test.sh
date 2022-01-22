export NEAR_ENV=testnet
export OWNER_ID=hoangnh_xda.testnet
export ORACLE_ID=hoangnh_xda.testnet
export ACCOUNT_ID=hoangnh_xda.testnet
export CONTRACT_ID=nearlend.hoangnh_xda.testnet
export BOOSTER_TOKEN_ID=ref.fakes.testnet
export WETH_TOKEN_ID=weth.fakes.testnet
export DAI_TOKEN_ID=dai.fakes.testnet
export USDT_TOKEN_ID=usdt.fakes.testnet
export USDC_TOKEN_ID=usdc.testnet
export AURORAX_TOKEN_ID=aurorax.testnet
export NEL_TOKEN_ID=nearlendtest.testnet
export WNEAR_TOKEN_ID=wrap.testnet
export ONE_YOCTO=0.000000000000000000000001
export GAS=200000000000000

near delete $CONTRACT_ID $ACCOUNT_ID

near create-account $CONTRACT_ID --masterAccount $ACCOUNT_ID --initialBalance 10

near deploy $CONTRACT_ID --accountId $ACCOUNT_ID --wasmFile ./res/burrowland.wasm

near call $CONTRACT_ID new '{"config" : {"oracle_account_id": "'$ACCOUNT_ID'", "owner_id": "'$ACCOUNT_ID'", "booster_token_id": "'$BOOSTER_TOKEN_ID'", "booster_decimals": 24}}' --accountId $ACCOUNT_ID

near call $CONTRACT_ID --accountId=$ACCOUNT_ID --gas=$GAS --amount=0.1 storage_deposit '{}'

// near call $CONTRACT_ID addAccount '{"account_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID

near call $CONTRACT_ID get_account '{"account_id": "'$ACCOUNT_ID'"}' --accountId $ACCOUNT_ID

near call $CONTRACT_ID get_accounts_paged '{"from_index": 0, "limit": 100}' --accountId $ACCOUNT_ID

near call $CONTRACT_ID get_assets_paged '{"from_index": 0, "limit": 10}' --accountId $ACCOUNT_ID 

near call $CONTRACT_ID get_assets_paged_detailed '{"from_index": 0, "limit": 10}' --accountId $ACCOUNT_ID 

near call $CONTRACT_ID get_asset '{"token_id": "'$BOOSTER_TOKEN_ID'"}' --accountId $ACCOUNT_ID 

near view $AURORAX_TOKEN_ID ft_metadata

near view $AURORAX_TOKEN_ID ft_balance_of '{"account_id": "'$CONTRACT_ID'"}'

near view $NEL_TOKEN_ID ft_balance_of '{"account_id": "'$ACCOUNT_ID'"}'

near view $NEL_TOKEN_ID storage_balance_bounds

near call $AURORAX_TOKEN_ID storage_deposit '{"account_id": "'$CONTRACT_ID'"}' --accountId $ACCOUNT_ID --deposit 0.00125

// ham gui token truc tiep: near call $AURORAX_TOKEN_ID ft_transfer '{"receiver_id": "'$CONTRACT_ID'", "amount": "12"}' --accountId $ACCOUNT_ID --amount $ONE_YOCTO

near call $CONTRACT_ID --accountId=$OWNER_ID add_asset '{
  "token_id": "'$AURORAX_TOKEN_ID'",
  "asset_config": {
    "reserve_ratio": 2500,
    "target_utilization": 8000,
    "target_utilization_rate": "1000000000008319516250272147",
    "max_utilization_rate": "1000000000039724853136740579",
    "volatility_ratio": 2000,
    "extra_decimals": 24,
    "can_deposit": true,
    "can_withdraw": true,
    "can_use_as_collateral": true,
    "can_borrow": true
  }
}' --amount=$ONE_YOCTO --gas=$GAS

near call $AURORAX_TOKEN_ID --accountId=$ACCOUNT_ID --gas=$GAS --amount=$ONE_YOCTO ft_transfer_call '{
  "receiver_id": "'$CONTRACT_ID'",
  "amount": "1",
  "msg": "{\"Execute\": {\"actions\": [{\"Withdraw\": {\"token_id\": \"'$AURORAX_TOKEN_ID'\", \"amount\": \"137\"}}]}}"
}'

near call $AURORAX_TOKEN_ID --accountId=$ACCOUNT_ID --gas=$GAS --amount=$ONE_YOCTO ft_transfer_call '{
  "receiver_id": "'$CONTRACT_ID'",
  "amount": "1",
  "msg": "{\"Execute\": {\"actions\": [{\"Borrow\": {\"token_id\": \"'$AURORAX_TOKEN_ID'\", \"amount\": \"1000000000000000000000000\"}}]}}"
}'

near call $AURORAX_TOKEN_ID --accountId=$ACCOUNT_ID --gas=$GAS --amount=$ONE_YOCTO ft_transfer_call '{
  "receiver_id": "'$CONTRACT_ID'",
  "amount": "1000000000000000000000000000000000",
  "msg": ""
}'
