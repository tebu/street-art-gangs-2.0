/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-office' : '&#xe000;',
			'icon-newspaper' : '&#xe001;',
			'icon-paint-format' : '&#xe002;',
			'icon-map' : '&#xe003;',
			'icon-truck' : '&#xe004;',
			'icon-arrow-left-big' : '&#xe005;',
			'icon-arrow-right-big' : '&#xe006;',
			'icon-basket' : '&#xe007;',
			'icon-gift' : '&#xe008;',
			'icon-dom-waters-speedo' : '&#xe009;',
			'icon-users' : '&#xe00a;',
			'icon-graduation' : '&#xe00b;',
			'icon-sun' : '&#xe00c;',
			'icon-remove' : '&#xe00d;',
			'icon-arrow-right-small' : '&#xe01c;',
			'icon-arrow-left-small' : '&#xe01d;',
			'icon-dot' : '&#xe00e;',
			'icon-moon' : '&#xe022;',
			'icon-pencil' : '&#xe00f;',
			'icon-message-bubble' : '&#xe010;',
			'icon-money' : '&#xe019;',
			'icon-mail' : '&#xe011;',
			'icon-question' : '&#xe012;',
			'icon-info' : '&#xe013;',
			'icon-map-marker' : '&#xe014;',
			'icon-write' : '&#xe015;',
			'icon-map-marker-2' : '&#xe016;',
			'icon-focus' : '&#xe017;',
			'icon-talk' : '&#xe018;',
			'icon-wand' : '&#xe027;',
			'icon-config' : '&#xe01a;',
			'icon-eye' : '&#xe01b;',
			'icon-trophy' : '&#xe01e;',
			'icon-food' : '&#xe025;',
			'icon-rocket' : '&#xe01f;',
			'icon-speech-bubble' : '&#xe020;',
			'icon-speech-bubble-2' : '&#xe021;',
			'icon-check' : '&#xe023;',
			'icon-remove-x' : '&#xe024;',
			'icon-dude' : '&#xe026;',
			'icon-dudes' : '&#xe028;',
			'icon-hourglass' : '&#xe029;',
			'icon-square' : '&#xe02a;',
			'icon-circle-dot' : '&#xe02b;',
			'icon-spray' : '&#xe02c;',
			'icon-star' : '&#xe02d;',
			'icon-home' : '&#xe02e;',
			'icon-locked' : '&#xe02f;',
			'icon-unlocked' : '&#xe030;',
			'icon-surprised' : '&#xe031;',
			'icon-happy' : '&#xe032;',
			'icon-map-marker-3' : '&#xe033;',
			'icon-chris-spittles-geo-location' : '&#xe034;',
			'icon-list' : '&#xe035;',
			'icon-add-to-list' : '&#xe036;',
			'icon-layout' : '&#xe037;',
			'icon-list-2' : '&#xe038;',
			'icon-history' : '&#xe039;',
			'icon-blocked' : '&#xe03a;',
			'icon-ccw' : '&#xe03b;',
			'icon-arrow-up' : '&#xe03c;',
			'icon-arrow-down' : '&#xe03d;',
			'icon-wand-2' : '&#xe03e;',
			'icon-cog' : '&#xe03f;',
			'icon-cart' : '&#xe040;',
			'icon-directions' : '&#xe041;',
			'icon-map-2' : '&#xe042;',
			'icon-trophy-2' : '&#xe043;',
			'icon-tag' : '&#xe044;',
			'icon-ticket' : '&#xe045;',
			'icon-barcode' : '&#xe046;',
			'icon-ticket-2' : '&#xe047;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};