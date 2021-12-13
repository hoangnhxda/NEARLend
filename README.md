# NEARLend

function getBorrowRate(uint cash, uint borrows, uint reserves);

function getSupplyRate(uint cash, uint borrows, uint reserves, uint reserveFactorMantissa);

function transferTokens(address spender, address src, address dst, uint tokens);

function repayBorrowInternal(uint repayAmount);

function doTransferIn(address from, uint amount);

function doTransferOut(address payable to, uint amount);
