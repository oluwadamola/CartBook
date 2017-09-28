/**
 * Global vars
 */
var usd_exchange_rate = 300;
var dialog = document.querySelector('#contribute-dialog');
var dialog2 = document.querySelector('#calc-dialog');
var ethCalc = document.querySelector('#calc-dialog #calc-eth');
var dialogSubscribe = document.querySelector('#subscribe-dialog');



/**
 * On scroll
 * Used for menu darkening AND floating contribute button
 */
var lastScrollTop = 0;
window.addEventListener('scroll', function() {
	var st = window.pageYOffset;
	updateMenuBackground(lastScrollTop);

	// floating contribute button
	if (document.querySelector('.floating-contribute-btn')) {
		if (st > 350) {
			document.querySelector('.floating-contribute-btn').style.opacity = 1;
		} else {
			document.querySelector('.floating-contribute-btn').style.opacity = 0;
		}
	}

	// scrolling animation
	if (st > lastScrollTop) {
		var sections = document.getElementsByTagName('section');
		for (var i = 0; i < sections.length; i++) {
			var section = sections[i];
			if (visible(section, true)) {
				addClassName(section, 'come-in');
			}
		}
	}

	lastScrollTop = st;
});


/**
 *  On page load, make sure the menu has the correct background
 */
updateMenuBackground(lastScrollTop);


/**
 * Set sections to already visible if in view so they dont animate
 */
var sections = document.getElementsByTagName('section');
for (var i = 0; i < sections.length; i++) {
	var section = sections[i];
	if (visible(section, true) || section.offsetTop < window.pageYOffset) {
		addClassName(section, 'already-visible');
	}
}


/**
 * IMPORTANT: Required for cross browser support
 */
dialogPolyfill.registerDialog(dialog);
dialogPolyfill.registerDialog(dialog2);
dialogPolyfill.registerDialog(dialogSubscribe);


/**
 * Load presale total
 */
jsonpRequest('https://www.enjin.com/coin.php' + '?cmd=init&callback=jsonpInit');
function jsonpInit(resp) {
    if (resp.success) {
        usd_exchange_rate = parseFloat(resp.usd).toFixed(2);
        var dollars_raised = parseFloat(resp.balance) * usd_exchange_rate;
        var dollars = parseFloat(dollars_raised.toFixed(2)).toLocaleString("en", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        });

        var elRaisedAmount = document.getElementsByClassName('raised-amount');
        for (var i = 0; i < elRaisedAmount.length; i++) {
            //elRaisedAmount[i].innerText = dollars;
            elRaisedAmount[i].innerText = '$12,000,000';
        }

        var elRaisedEther = document.getElementsByClassName('ether-raised');
        for (var i = 0; i < elRaisedEther.length; i++) {
            //elRaisedEther[i].innerText = numeral(resp.balance).format('0,0.00');
            elRaisedEther[i].innerText = numeral(38800).format('0,0.00');
        }

        var elRaisedEnj = document.getElementsByClassName('enj-raised');
        for (var i = 0; i < elRaisedEnj.length; i++) {
            //elRaisedEnj[i].innerText = numeral(resp.presale_tokens_sold).format('0,0');
            elRaisedEnj[i].innerText = numeral(400000000).format('0,0');
        }

        var elRaisedPercent = document.getElementsByClassName('percent-raised');
        for (var i = 0; i < elRaisedPercent.length; i++) {
            //elRaisedPercent[i].innerText = Math.round(resp.presale_tokens_sold / 400000000 * 100);
            elRaisedPercent[i].innerText = 100;
        }

        try {
			ethCalc.dispatchEvent(new Event('change'));
		} catch (e) {

		}

        document.getElementById('usd_exchange').innerHTML = usd_exchange_rate.toLocaleString("en", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        });

        if (document.getElementById('total-members')) {
			document.getElementById('total-members').innerText = numeral(resp.total_members).format('0,0');
		}
    }
}


/**
 * Open Subscribe dialog
 */
var subscribeBtns = document.getElementsByClassName('subscribe-btn');
for(var i = 0; i < subscribeBtns.length; i++) {
	subscribeBtns[i].addEventListener('click', function (e) {
		dialogSubscribe.showModal();
	});
}


/**
 * Email Subscribe -> Google Calendar - Subscribe dialog
 */
function emailSubscribeCallback(data) {
	var dialog = document.getElementById('subscribe-dialog');
	if (data.success) {
		// change title
		dialog.querySelector('.mdl-dialog__title').innerText = 'Add Event';

		// change content
		dialog.querySelector('.email-subscribe-container').style.display = 'none';
		dialog.querySelector('.google-calendar-container').style.display = 'block';
	} else {
		dialog.querySelector('.mdl-textfield__error').innerText = data.error;
	}
}
document.querySelector('#subscribe-dialog .email-subscribe-container').addEventListener('submit', function (event) {
	event.preventDefault();
	var form = event.target;
	form.querySelector('.mdl-textfield__error').innerText = '';

	// subscribe api
	var emailField = form.querySelector('[name=email]');
	var query = '?cmd=subscribe_email';
	query += '&email=' + emailField.value;
	query += '&callback=emailSubscribeCallback';
	jsonpRequest('https://www.enjin.com/coin.php' + query);
});


/**
 * Google Calendar -> Browser Notification - Subscribe dialog
 */
var googleCalendarNext = document.querySelectorAll('#subscribe-dialog .google-calendar-container .next-button');
for (var i = 0; i < googleCalendarNext.length; i++) {
	googleCalendarNext[i].addEventListener('click', function (e) {
		var dialog = document.getElementById('subscribe-dialog');

		// change content
		// skip browser notification page if on IE or not supported
		if (window.Notification && Notification.permission !== "denied") {
			dialog.querySelector('.mdl-dialog__title').innerText = 'Browser Notifications';
			dialog.querySelector('.google-calendar-container').style.display = 'none';
			dialog.querySelector('.browser-notification-container').style.display = 'block';
		} else {
			dialog.querySelector('.mdl-dialog__title').innerText = 'Awesome!';
			dialog.querySelector('.google-calendar-container').style.display = 'none';
			dialog.querySelector('.subscribe-success-container').style.display = 'block';
		}
	});
}


/**
 * Browser Notification -> Success - Subscribe dialog
 */
var browserNotificationNext = document.querySelectorAll('#subscribe-dialog .browser-notification-container .next-button');
for (var i = 0; i < browserNotificationNext.length; i++) {
	browserNotificationNext[i].addEventListener('click', function (event) {
		var dialog = document.getElementById('subscribe-dialog');

		// enable browser notifications
		if (event.target.className.indexOf('mdl-button') > -1) {
			if (window.Notification && Notification.permission !== "denied") {
				Notification.requestPermission(function(status) {  // status is "granted", if accepted by user

				});
			}
		}

		// change title
		dialog.querySelector('.mdl-dialog__title').innerText = 'Awesome!';

		// change content
		dialog.querySelector('.browser-notification-container').style.display = 'none';
		dialog.querySelector('.subscribe-success-container').style.display = 'block';
	});
}


/**
 * Open Contribute dialog
 */
var contributeBtns = document.getElementsByClassName('contribute-btn');
for(var i = 0; i < contributeBtns.length; i++) {
	contributeBtns[i].addEventListener('click', function (e) {
		dialog.showModal();

		// track contribute button clioks
		fbq('track', 'Contribute', {
			content_name: 'Contribute button',
		});
	});
}


/**
 * Validate Terms Page - Contribute dialog
 */
document.querySelector('#contribute-dialog .next-button').addEventListener('click', function (e) {
	var errorField = document.querySelector('#contribute-dialog .mdl-textfield__error');
	errorField.innerHTML = '';
	errorField.style.display = 'none';

	if (
		document.querySelector('#contribute-dialog input#confirm1').checked &&
		document.querySelector('#contribute-dialog input#confirm2').checked // &&
		//document.querySelector('#contribute-dialog input#confirm3').checked
	) {
		dialog.close();
		dialog2.showModal();
	} else {
		if (location.href.indexOf('/cn') !== -1) {
			errorField.innerText = '请阅读并确认以上的要求。';
		} else {
			errorField.innerText = 'Please read and confirm the above requirements before proceeding.';
		}

		errorField.style.display = 'block';
	}
});


/**
 * On change of ETH value in dialog
 */
var ethDialogEvents = ['change', 'keyup'];
for(var i = 0; i < ethDialogEvents.length; i++) {
	ethCalc.addEventListener(ethDialogEvents[i], function() {
		var val = parseFloat(this.value).toFixed(2);
		changeEthValue(val);
	});
}


/**
 * Change calculations in dialog
 */
function changeEthValue(val) {
	if(!(val > 0)) val = 0;
	if(!(val <= 16666.66)) {
		ethCalc.value = '16666.66';
		val = 16666.66;
	}

	document.querySelector('#calc-dialog #calc-enj').value = numeral(getEnjFromEth(val)).format('0,0');
	document.querySelector('#calc-dialog #calc-percent').value = (getEthBonusAmount(val)*100 + '%');
	document.querySelector('#calc-dialog #calc-total').value = numeral(getEnjTotalFromEth(val)).format('0,0');

	/*
	var errorCalc = document.querySelector('#calc-dialog .error-calc');
	var usd_equiv = usd_exchange_rate * val;
	if (usd_equiv < 1000) {

	} else {
		errorCalc.innerHTML = '';
		errorCalc.style.display = 'none';
	}
	*/
}


/**
 * Close dialog
 */
var dialogClose = document.getElementsByClassName('close-x');
for (var i = 0; i < dialogClose.length; i++) {
	dialogClose[i].addEventListener('click', function (e) {
		var el = e.currentTarget;
		var dialog = findAncestor(el, 'mdl-dialog');
		dialog.close();
	});
}


/**
 * Reset content in subscribe dialog
 */
document.getElementById('subscribe-dialog').addEventListener('close', function() {
	var dialog = document.getElementById('subscribe-dialog');

	// reset title
	dialog.querySelector('.mdl-dialog__title').innerText = 'Email Subscribe';

	// reset content
	for (var k = 0; k < dialog.querySelectorAll('.subscribe-container').length; k++) {
		dialog.querySelectorAll('.subscribe-container')[k].style.display = 'none';
	}

	dialog.querySelector('.email-subscribe-container').style.display = 'block';
});


/**
 * Default ETH value
 */
ethCalc.value = '10.00';


/**
 * Copy ETH address to clipboard
 */
var clipboard = new Clipboard('#copy-button');
clipboard.on('success', function (e) {
	var copy = document.querySelector('#copy-success');
	copy.style.display = 'block';
	e.clearSelection();
});


/**
 * Get ENJ from ETH
 *
 * @param eth
 * @returns {number}
 */
function getEnjFromEth(eth) {
	return Math.round(eth * usd_exchange_rate / 0.03);
}


/**
 * Get ETH bonus amount
 *
 * @param eth
 * @returns {number}
 */
function getEthBonusAmount(eth) {
	if(eth*usd_exchange_rate < 1000) return 0;
	if(eth*usd_exchange_rate < 15000) return 0.05;
	if(eth*usd_exchange_rate < 50000) return 0.15;
	if(eth*usd_exchange_rate < 100000) return 0.25;
	if(eth*usd_exchange_rate < 1000000) return 0.35;
	if(eth*usd_exchange_rate < 2000000) return 0.4;
	if(eth*usd_exchange_rate >= 2000000) return 0.5;
}


/**
 * Get ENJ total from ETH
 *
 * @param eth
 * @returns {number}
 */
function getEnjTotalFromEth(eth) {
	var bonus = getEthBonusAmount(eth) + 1;
	return Math.round(eth * usd_exchange_rate / 0.03 * bonus);
}


/**
 * Init Timer
 *
 * @param endtime
 * @param hoursMode
 * @param callback
 */
function initTimer(endtime, hoursMode, callback) {
	var t = getTimeRemaining(endtime, hoursMode);
	callback(t);

	var timeinterval = setInterval(function(){
		var t = getTimeRemaining(endtime, hoursMode);
		callback(t);

		if (t.total <= 0){
			clearInterval(timeinterval);
		}
	}, 1000);
}


/**
 * Get time remaining - timer function
 *
 * @param endtime
 * @param hoursMode
 * @returns {{total: number, days: number, hours: number, minutes: number, seconds: number}}
 */
function getTimeRemaining(endtime, hoursMode) {
	var d = new Date();
	var localTime = d.getTime();
	var localOffset = d.getTimezoneOffset() * 60000;
	var utc = localTime + localOffset;
	var pst = utc + (3600000*-7);
	var pst_date = new Date(pst);

	var t = Date.parse(endtime) - Date.parse(pst_date);
	var seconds = Math.floor((t/1000) % 60);
	var minutes = Math.floor((t/1000/60) % 60);
	var hours = Math.floor((t/(1000*60*60)) % 24);
	var days = Math.floor(t/(1000*60*60*24));

	if (hoursMode) {
		hours = Math.floor((t/(1000*60*60)));
	}

	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}


/**
 * Find closest element ancestor
 * @param el
 * @param cls
 * @returns {*}
 */
function findAncestor (el, cls) {
	while ((el = el.parentElement) && !el.classList.contains(cls));
	return el;
}


/**
 * Send AJAX request
 *
 * @param url
 * @param type
 * @param data
 * @param callback
 */
function sendRequest(url, type, data, callback) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				var resp = JSON.parse(request.responseText);
				callback(resp);
			} else {
				callback(false);
			}
		}
	};

	request.open(type, url, true);
	if (type == 'POST') {
		request.send(data);
	} else {
		request.send();
	}
}


/**
 * JSONP Request
 *
 * @param url
 */
function jsonpRequest(url) {
	var script = document.createElement('script');
	script.src = url;
	document.head.appendChild(script);
}


/**
 * Checks if the given string is a valid ETH address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
 */
function isValidEthAddress(address) {
	if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
		// check if it has the basic requirements of an address
		return false;
	} else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
		// If it's all small caps or all all caps, return true
		return true;
	} else {
		return true;
	}
}


/**
 * Check if element is visible
 *
 * @param el
 * @param partial
 * @returns {boolean}
 */
function visible(el, partial) {
	var w             = window,
		viewTop       = w.pageYOffset,
		viewBottom    = viewTop + w.innerHeight,
		_top          = el.offsetTop,
		_bottom       = _top + el.clientHeight,
		compareTop    = partial === true ? _bottom : _top,
		compareBottom = partial === true ? _top : _bottom;

	return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
}


/**
 * Add class to element
 *
 * @param el
 * @param name
 */
function addClassName(el, name) {
	var indexOfClassName = el.className.indexOf(name);
	if (indexOfClassName > -1) {
		return;
	}

	el.className += ' ' + name;
}


function updateMenuBackground(lastScrollTop) {
	var menu = document.querySelector('.top-nav');
	var begin_ht = 35, mid_ht = 75, end_ht = 115, gap_ht = 10;
	var st = window.pageYOffset;
	if (st > lastScrollTop) { // downscroll
		if (st >= begin_ht && st < begin_ht + gap_ht) {
			menu.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
		} else if (st >= mid_ht && st < mid_ht + gap_ht) {
			menu.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		} else if (st >= end_ht) {
			menu.style.backgroundColor = 'rgba(0, 0, 0, 1)';
		}
	} else { // upscroll
		if (st <= mid_ht + gap_ht && st > mid_ht) {
			menu.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		} else if (st <= begin_ht + gap_ht && st > begin_ht) {
			menu.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
		} else if (st <= begin_ht) {
			menu.style.backgroundColor = 'rgba(0, 0, 0, 0)';
		}
	}
}