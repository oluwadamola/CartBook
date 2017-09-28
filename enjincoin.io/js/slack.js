/**
 * Users online / registered
 */
var odOnline = new Odometer({
	el: document.getElementById('slack-online'),
	value: 0,
});


var odTotal = new Odometer({
	el: document.getElementById('slack-total'),
	value: 0,
});


/**
 * Update numbers
 */
updateSlackInfo();
setInterval(function() {
	updateSlackInfo();
}, 15000);


/**
 * Slack invite
 */
function jsonpSlackInvite(resp) {
	var form = document.getElementById('slack-form');
	var input = form.querySelector('[name=email]');
	var slackMsg = form.querySelector('.slack-msg');
	if (resp.success) {
		input.value = '';
		slackMsg.innerText = 'We\'ve sent the invite! Check your inbox.';
	} else {
		slackMsg.innerText = resp.error;
	}
}
document.querySelector('.slack-form').addEventListener('submit', function(event) {
	event.preventDefault();
	var form = event.target;
	var input = form.querySelector('[name=email]');
	var email = input.value;

	// remove msg
	var slackMsg = document.querySelector('.slack-msg');
	slackMsg.innerText = '';

	// url
	var url = 'https://www.enjin.com/coin.php?cmd=send_slack_invite&email=' + email + '&callback=jsonpSlackInvite';
	if (window.location.hash.length > 1)
		url += '&token=' + window.location.hash.substring(1);

	jsonpRequest(url);
});


/**
 * Update slack info
 */
function jsonpUpdateSlackInfo(resp) {
	if (resp.success) {
		odOnline.update(resp.online);
		odTotal.update(resp.total);
	}
}
function updateSlackInfo(callback) {
	jsonpRequest('https://www.enjin.com/coin.php?cmd=slack_get_info&callback=jsonpUpdateSlackInfo');
}