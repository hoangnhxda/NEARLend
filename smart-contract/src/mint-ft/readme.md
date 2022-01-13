
Build webassemply từ code (nhớ chỉnh target) 

>> ./build.sh

Cấu hình env sang testnet hoặc mainnet

>> export NEAR_ENV=testnet

Login near

>> near login

Đổi account bằng ID cho ngắn gọn (chú ý, sửa MY_ACCOUNT_NAME là tên ID của mình)

>> ID=MY_ACCOUNT_NAME

Kiểm tra lại bằng câu lệnh

>> echo $ID

Deploy smart contract  (nhớ chỉnh target)

>> near deploy --wasmFile res/fungible_token.wasm --accountId $ID

Gọi tới hàm mint token

>> near call $ID new '{"owner_id": "'$ID'", "total_supply": "1000000000000000000000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "Nearlend", "symbol": "NEL", "decimals": 24 }}' --accountId $ID

Hiện metadata

>> near view $ID ft_metadata

Chuyển token bằng CLI

>> near call $ID ft_transfer '{"receiver_id": "'bob.$ID'", "amount": "19"}' --accountId $ID --amount 0.000000000000000000000001