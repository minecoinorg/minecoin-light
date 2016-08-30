function sendCoin(midId, amountId) {
	var mid = $('#'+midId).val();
	var amount = $('#'+amountId).val();
	if (!mid || amount <= 0) alert("Wrong data");
	$.post('/sendcoin', {"mid":mid, "amount":amount}, function(responce) {
		if (responce.status == 'OK') {
			updateWalletAmount(responce.walletAmount);
		}
		alert(responce.description);
	});
}

// Obsolete
function reserveWallet() {
	$.post('?r=site/reservewallet', {}, function(responce) {
		if (responce.status == 'OK') {
			$('#newWalletId').html(responce.walletId);
			checkWallet();
		} else if (responce.status == 'ABORTED') {
			// $('#newWalletId').html('Waiting');
			$('#newWalletId').html(responce.walletId);
			alert('You must wait until last payment ends');
			checkWallet();
		} else {
			alert(responce.description);
		}
	});
}

// Obsolete
function checkWallet() {
	$.post('?r=site/checkwallet', {}, function(responce) {
		if (responce.status == 'OK') {
			$('#imgLoaderSpan').hide();
			updateWalletAmount(responce.walletAmount);
			alert("You got minecoins");
		} else {
			setTimeout(checkWallet, 3000);
		}
	});
}

function updateWalletAmount(amount) {
	if ($('.wallet-amount')[0].html != amount) $('.wallet-amount').html(amount);
}

function getWalletAmount() {
	$.post('?r=site/getamount', {}, function(responce) {
		if (responce.status == 'OK') {
			updateWalletAmount(responce.amount);
			setTimeout(getWalletAmount, 8000);
		}
	});
}

function getNewTransactions() {
	$.post('?r=site/getnewtransactions', {}, function(responce) {
		if (responce.status == 'OK') {
			if (responce.transactions.length > 0) {
				responce.transactions.forEach(function(el) {
					var tr = '<tr><td>'+(el.type == 'to' ? '<div class="withdraw">Withdraw</div>' : '<div class="deposit">Deposit</div>')+'</td><td>'+el.amount+' MNC</td><td>'+el.time+'</td></tr>';
					$('#transactions-section').prepend(tr);
				});
			}
		}
		setTimeout(getNewTransactions, 5000);
	});
}

function inspect() {
	$.post('/inspect', {}, function(responce) {
		console.log(responce);
		if (responce.status == 'OK') {
			updateWalletAmount(responce.walletAmount);
			if (responce.newTransactions.status == 'OK' && responce.newTransactions.transactions.length > 0) {
				responce.newTransactions.transactions.map(function(e) {
					if ($('#transaction-'+e.id).length == 0) putTransactionIntoList(e);
					else updateTranscactionInList(e);
				});
			}
		}
		setTimeout(inspect, 5000);
	});
}

// Put transaction into list
function putTransactionIntoList(e) {
	var transaction = '';
	if (e.type == 'mnc') {
		transaction += '<tr id="transaction-'+e.id+'"><td>';
		
		if (e.way == 'to') transaction +='<span style="color:#00aa00;"><b>Received</b><br />'+e.time+'</span>';
		else transaction += '<span style="color:#aa0000;"><b>Sent</b><br />'+e.time+'</span>';
		transaction += '</td><td>';
		
		transaction += '<table><tr><td>From:</td><td>'+e.from+'</td></tr><tr><td>To:</td><td>'+e.to+'</td></tr></table></td><td>';
		transaction += (e.status == 1) ? 'Succeed' : 'Fail';
		transaction += '</td><td>'+e.amount+' MNC</td></tr>';
	} else if (e.type == 'btc') {
		transaction += '<tr id="transaction-'+e.id+'"><td>';
		transaction += '<span style="color:#0000aa;"><b>Subscription</b><br />'+e.time+'</span></td><td><table><tr><td>'+e.amount+' BTC -> '+(e.amount * 2000)+' MNC</td></tr></table></td><td>';
		transaction += (e.confirmations < 3) ? '<span id="transaction-status-'+e.id+'"><b style="color:#aa0000;">Unconfirmed</b></span>' : '<span id="transaction-status-'+e.id+'"><b style="color:#00aa00;">Done</b></span>';
		transaction += '</td><td>'+(e.amount * 2000)+' MNC</td></tr>';
	}
	$('#transactions-section').prepend(transaction);
}

// Update BTC transaction
function updateTranscactionInList(e) {
	transaction = '';
	if (e.type == 'btc') {
		if ($('#transaction-status-'+e.id).length > 0) {
			if (e.confirmations < 3) {
				$('#transaction-status-'+e.id).html('<b style="color:#aa0000;">'+e.confirmations+' confirmations</b>');
			} else {
				$('#transaction-status-'+e.id).html('<b style="color:#00aa00;">Done</b>')
			}
		}
	}
}

$(window).ready(function() {
	// getWalletAmount();
	// getNewTransactions();
	inspect();
});