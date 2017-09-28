/**
 * Check balance
 */
function jsonpCheckAccount(resp) {
	var form = document.getElementById('check-account');
	var status = form.querySelector('.status');

	if (resp.success) {
		var box = document.getElementById('account-box');
		box.style.display = 'block';

		document.getElementById('value-eth-address').innerText = resp.ethereum_address;
		document.getElementById('value-eth-received').innerText = numeral(resp.ether).format('0,0.00');
		document.getElementById('value-bonus-level').innerText = resp.bonus + '%';
		document.getElementById('value-enjin-coins').innerText = numeral(resp.tokens).format('0,0.00');
        document.getElementById('value-transactions').innerHTML = resp.transactions.join('<br>');
	} else {
		status.innerText = resp.error.error;
	}
}
document.getElementById('check-account').addEventListener('submit', function(event) {
	event.preventDefault();
	var form = document.getElementById('check-account');
	var eth_address = form.querySelector('[name=address]').value;
	if (!isValidEthAddress(eth_address)) {
		var status = form.querySelector('.status');
		status.innerText = 'Please enter a valid Ethereum address.';
		return false;
	}

	jsonpRequest('https://www.enjin.com/coin.php?cmd=get_account_balance&address=' + eth_address + '&callback=jsonpCheckAccount');
});