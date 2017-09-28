/**
 * Particle effect
 */
particlesJS.load('particles', '/js/plugins/particles.json');


/**
 * Subscribe
 */
function jsonpSubscribe(resp) {
	var form = document.getElementById('email-subscribe');
	var emailField = form.querySelector('[name=email]');

	if (resp['success']) {
		form.querySelector('.status').innerText = 'Your email has been noted. Thanks!';
		emailField.value = '';
	} else {
		form.querySelector('.status').innerText = resp.error;
	}
}
document.getElementById('email-subscribe').addEventListener('submit', function(event) {
	event.preventDefault();
	var form = event.target;
	var emailField = form.querySelector('[name=email]');
	var query = '?cmd=subscribe_email';
	query += '&email=' + emailField.value;
	query += '&callback=jsonpSubscribe';
	jsonpRequest('https://www.enjin.com/coin.php' + query);
});


/**
 * Contact
 */
function jsonpContact(resp) {
	var form = document.getElementById('contact-us');
	var emailField = form.querySelector('[name=email]');
	var messageField = form.querySelector('[name=message]');

	if (resp['success']) {
		form.querySelector('.status').innerText = 'Thanks, we have received your message.';
		emailField.value = '';
		messageField.value = '';
	} else {
		form.querySelector('.status').innerText = resp.error;
	}
}
document.getElementById('contact-us').addEventListener('submit', function(event) {
	event.preventDefault();
	var form = event.target;
	var emailField = form.querySelector('[name=email]');
	var messageField = form.querySelector('[name=message]');
	var query = '?cmd=contact';
	query += '&email=' + emailField.value;
	query += '&message=' + messageField.value;
	query += '&callback=jsonpContact';
	jsonpRequest('https://www.enjin.com/coin.php' + query);
});


/**
 * Timer
 */
var hoursMode = false;
initTimer('2017/10/03 05:00:00 (Pacific Standard Time)', hoursMode, function(data) {
	// crowdsale starting
	if (data.total <= 0) {

	}

	var daysText = 'day';
	if (data.days > 1) daysText += 's';

	var hoursText = 'hour';
	if (data.hours > 1) hoursText += 's';

	var minsText = 'minute';
	if (data.minutes > 1) minsText += 's';

	var secsText = 'second';
	if (data.seconds > 1) secsText += 's';

	if (location.href.indexOf('/cn') !== -1) {
		daysText = '天';
		hoursText = '时';
		minsText = '分';
		secsText = '秒';
	}

	document.querySelector('#timer .days .number').innerHTML = data.days;
	document.querySelector('#timer .hours .number').innerHTML = data.hours;
	document.querySelector('#timer .minutes .number').innerHTML = data.minutes;
	document.querySelector('#timer .seconds .number').innerHTML = data.seconds;

	document.querySelector('#timer .days .text').innerHTML = daysText;
	document.querySelector('#timer .hours .text').innerHTML = hoursText;
	document.querySelector('#timer .minutes .text').innerHTML = minsText;
	document.querySelector('#timer .seconds .text').innerHTML = secsText;

	if (hoursMode) {
		document.querySelector('#timer .days').style.display = 'none';
		document.querySelector('#timer .seconds').style.display = 'inline';
	}
});


/**
 * Register dialogs with polyfil - required for browser support
 */
dialogPolyfill.registerDialog(document.querySelector('#video-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#maxim-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#witek-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#josh-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#chris-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#brad-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#lilia-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#volkov-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#roy-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#frederick-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#evan-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#robin-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#ryan-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#daniel-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#pat-bio-dialog'));
dialogPolyfill.registerDialog(document.querySelector('#tsseng-bio-dialog'));


/**
 * Open Bios
 */
for (var i = 0; i < document.getElementsByClassName('view-bio').length; i++) {
	document.getElementsByClassName('view-bio')[i].addEventListener('click', function(event) {
		var btn = event.target;
		var classNames = btn.className;
		if (classNames.indexOf('maxim') > -1) {
			document.querySelector('#maxim-bio-dialog').showModal();
		} else if (classNames.indexOf('witek') > -1) {
			document.querySelector('#witek-bio-dialog').showModal();
		} else if (classNames.indexOf('josh') > -1) {
			document.querySelector('#josh-bio-dialog').showModal();
		} else if (classNames.indexOf('chris') > -1) {
			document.querySelector('#chris-bio-dialog').showModal();
		} else if (classNames.indexOf('brad') > -1) {
			document.querySelector('#brad-bio-dialog').showModal();
		} else if (classNames.indexOf('lilia') > -1) {
			document.querySelector('#lilia-bio-dialog').showModal();
		} else if (classNames.indexOf('volkov') > -1) {
			document.querySelector('#volkov-bio-dialog').showModal();
		} else if (classNames.indexOf('roy') > -1) {
			document.querySelector('#roy-bio-dialog').showModal();
		} else if (classNames.indexOf('frederick') > -1) {
			document.querySelector('#frederick-bio-dialog').showModal();
		} else if (classNames.indexOf('evan') > -1) {
			document.querySelector('#evan-bio-dialog').showModal();
		} else if (classNames.indexOf('robin') > -1) {
			document.querySelector('#robin-bio-dialog').showModal();
		} else if (classNames.indexOf('ryan') > -1) {
			document.querySelector('#ryan-bio-dialog').showModal();
		} else if (classNames.indexOf('daniel') > -1) {
			document.querySelector('#daniel-bio-dialog').showModal();
		} else if (classNames.indexOf('pat') > -1) {
			document.querySelector('#pat-bio-dialog').showModal();
		} else if (classNames.indexOf('tsseng') > -1) {
			document.querySelector('#tsseng-bio-dialog').showModal();
		}
	});
}


/**
 * Youtube API
 */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var youtubePlayer;
function onYouTubeIframeAPIReady() {
	youtubePlayer = new YT.Player('youtubeVideo', {
		height: '350',
		width: '100%',
		videoId: 'guFpRhoh-rg',
		events: {}
	});
}


/**
 * Open video dialog
 */
document.querySelector('.video-play-wrapper').addEventListener('click', function() {
	document.querySelector('#video-dialog').showModal();
	youtubePlayer.playVideo();
});


/**
 * Stop video on dialog close
 */
document.getElementById('video-dialog').addEventListener('close', function() {
	youtubePlayer.stopVideo();
});