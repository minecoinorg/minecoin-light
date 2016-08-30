/**
 Script for dealing with transactions and another operations
 Owner: minecoin
*/

$(window).ready(function() {
	updateList();
});

function updateList() {
	$.post('?r=site/updatelist', function(responce) {
		if (responce.status == 'OK') {
			responce.transactions.forEach(function(el) {
				$('#transaction-monitor').prepend('<p>'+el.type+' | '+el.amount+'</p>');
			});
		}
		console.log(responce);
	});
	setTimeout(updateList, 1100);
}