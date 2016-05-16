#!usr/bin/env node

/**
 * File: index.js
 * Type: Javascript index file
 * Author: Chris Humboldt
 */

!function (e, t) {'object' == typeof exports && exports && 'string' != typeof exports.nodeName? t(exports): 'function' == typeof define && define.amd? define(['exports'], t): (e.Mustache = {}, t(e.Mustache));}(this, function (e) {function t (e) {return 'function' == typeof e;
	}function n (e) {return v(e)? 'array': typeof e;
	}function r (e) {return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
	}function o (e, t) {return null != e && 'object' == typeof e && t in e;
	}function i (e, t) {return g.call(e, t);
	}function s (e) {return !i(m, e);
	}function a (e) {return String(e).replace(/[&<>"'`=\/]/g, function (e) {return w[e];});
	}function c (t, n) {function o () {if (m && !w) for (;g.length;)delete d[g.pop()];else g = [];m = !1, w = !1;
		}function i (e) {if ('string' == typeof e && (e = e.split(b, 2)), !v(e) || 2 !== e.length)throw new Error('Invalid tags: ' + e);a = new RegExp(r(e[0]) + '\\s*'), c = new RegExp('\\s*' + r(e[1])), f = new RegExp('\\s*' + r('}' + e[1]));
		}if (!t)return [];var a,c,f,h = [],d = [],g = [],m = !1,w = !1;
		i(n || e.tags); for (var T,U,j,D,N,A,M = new p(t);!M.eos();) {if (T = M.pos, j = M.scanUntil(a)) for (var S = 0,V = j.length;V > S;++S)D = j.charAt(S), s(D)? g.push(d.length): w = !0, d.push(['text', D, T, T + 1]), T += 1, '\n' === D && o();if (!M.scan(a))break;if (m = !0, U = M.scan(E) || 'name', M.scan(y), '=' === U? (j = M.scanUntil(x), M.scan(x), M.scanUntil(c)): '{' === U? (j = M.scanUntil(f), M.scan(k), M.scanUntil(c), U = '&'): j = M.scanUntil(c), !M.scan(c))throw new Error('Unclosed tag at ' + M.pos);if (N = [U, j, T, M.pos], d.push(N), '#' === U || '^' === U)h.push(N);else if ('/' === U) {if (A = h.pop(), !A)throw new Error('Unopened section "' + j + '" at ' + T);if (A[1] !== j)throw new Error('Unclosed section "' + A[1] + '" at ' + T)}else 'name' === U || '{' === U || '&' === U? w = !0: '=' === U && i(j);}if (A = h.pop())throw new Error('Unclosed section "' + A[1] + '" at ' + M.pos);return l(u(d));
	}function u (e) { for (var t,n,r = [],o = 0,i = e.length;i > o;++o)t = e[o], t && ('text' === t[0] && n && 'text' === n[0]? (n[1] += t[1], n[3] = t[3]): (r.push(t), n = t));return r;
	}function l (e) { for (var t,n,r = [],o = r,i = [],s = 0,a = e.length;a > s;++s)switch (t = e[s], t[0]) {case '#':
				case '^':
					o.push(t), i.push(t), o = t[4] = [];
					break;case '/':
					n = i.pop(), n[5] = t[2], o = i.length > 0? i[i.length - 1][4]: r;
					break;default:
					o.push(t);}return r;
	}function p (e) {this.string = e, this.tail = e, this.pos = 0;
	}function f (e, t) {this.view = e, this.cache = {'.': this.view}, this.parent = t;
	}function h () {this.cache = {};
	}var d = Object.prototype.toString,v = Array.isArray || function (e) {return '[object Array]' === d.call(e);},g = RegExp.prototype.test,m = /\S/,w = {'&': '&amp;','<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#39;','/': '&#x2F;','`': '&#x60;','=': '&#x3D;'},y = /\s*/,b = /\s+/,x = /\s*=/,k = /\s*\}/,E = /#|\^|\/|>|\{|&|=|!/;
	p.prototype.eos = function () {return '' === this.tail;}, p.prototype.scan = function (e) {var t = this.tail.match(e);
		if (!t || 0 !== t.index)return '';var n = t[0];
		return this.tail = this.tail.substring(n.length), this.pos += n.length, n;}, p.prototype.scanUntil = function (e) {var t,n = this.tail.search(e);
		switch (n) {case -1:
				t = this.tail, this.tail = '';
				break;case 0:
				t = '';
				break;default:
				t = this.tail.substring(0, n), this.tail = this.tail.substring(n);}return this.pos += t.length, t;}, f.prototype.push = function (e) {return new f(e, this);}, f.prototype.lookup = function (e) {var n,r = this.cache;
		if (r.hasOwnProperty(e))n = r[e]; else { for (var i,s,a = this,c = !1;a;) {if (e.indexOf('.') > 0) for (n = a.view, i = e.split('.'), s = 0;null != n && s < i.length;)s === i.length - 1 && (c = o(n, i[s])), n = n[i[s++]];else n = a.view[e], c = o(a.view, e);if (c)break;a = a.parent;}r[e] = n;}return t(n) && (n = n.call(this.view)), n;}, h.prototype.clearCache = function () {this.cache = {};}, h.prototype.parse = function (e, t) {var n = this.cache,r = n[e];
		return null == r && (r = n[e] = c(e, t)), r;}, h.prototype.render = function (e, t, n) {var r = this.parse(e),o = t instanceof f? t: new f(t);
		return this.renderTokens(r, o, n, e);}, h.prototype.renderTokens = function (e, t, n, r) { for (var o,i,s,a = '',c = 0,u = e.length;u > c;++c)s = void 0, o = e[c], i = o[0], '#' === i? s = this.renderSection(o, t, n, r): '^' === i? s = this.renderInverted(o, t, n, r): '>' === i? s = this.renderPartial(o, t, n, r): '&' === i? s = this.unescapedValue(o, t): 'name' === i? s = this.escapedValue(o, t): 'text' === i && (s = this.rawValue(o)), void 0 !== s && (a += s);return a;}, h.prototype.renderSection = function (e, n, r, o) {function i (e) {return s.render(e, n, r);
		}var s = this,a = '',c = n.lookup(e[1]);
		if (c) {if (v(c)) for (var u = 0,l = c.length;l > u;++u)a += this.renderTokens(e[4], n.push(c[u]), r, o);else if ('object' == typeof c || 'string' == typeof c || 'number' == typeof c)a += this.renderTokens(e[4], n.push(c), r, o);else if (t(c)) {if ('string' != typeof o)throw new Error('Cannot use higher-order sections without the original template');c = c.call(n.view, o.slice(e[3], e[5]), i), null != c && (a += c);}else a += this.renderTokens(e[4], n, r, o);return a;}}, h.prototype.renderInverted = function (e, t, n, r) {var o = t.lookup(e[1]);
		return !o || v(o) && 0 === o.length? this.renderTokens(e[4], t, n, r): void 0;}, h.prototype.renderPartial = function (e, n, r) {if (r) {var o = t(r)? r(e[1]): r[e[1]];
			return null != o? this.renderTokens(this.parse(o), n, r, o): void 0;}}, h.prototype.unescapedValue = function (e, t) {var n = t.lookup(e[1]);
		return null != n? n: void 0;}, h.prototype.escapedValue = function (t, n) {var r = n.lookup(t[1]);
		return null != r? e.escape(r): void 0;}, h.prototype.rawValue = function (e) {return e[1];}, e.name = 'mustache.js', e.version = '2.2.1', e.tags = ['{{', '}}'];var T = new h;
	e.clearCache = function () {return T.clearCache();}, e.parse = function (e, t) {return T.parse(e, t);}, e.render = function (e, t, r) {if ('string' != typeof e)throw new TypeError('Invalid template! Template should be a "string" but "' + n(e) + '" was given as the first argument for mustache#render(template, view, partials)');return T.render(e, t, r);}, e.to_html = function (n, r, o, i) {var s = e.render(n, r, o);
		return t(i)? void i(s): s;}, e.escape = a, e.Scanner = p, e.Context = f, e.Writer = h;});var injectplate = function () {var e = {},t = function (t) {var t = t || !1;
			if (t !== !1 && t.component) {var r,o = t.data || '';
				if (r = a(void 0 !== t.to? t.to: '#' + t.component)) for (var i = 0,s = r.length;s > i;i++)t.overwrite === !0? r[i].innerHTML = Mustache.render(e[t.component].html, o): r[i].insertAdjacentHTML('beforeend', Mustache.render(e[t.component].html, o)), r[i].setAttribute('data-inject', 'true'), e[t.component].id && (r[i].id = e[t.component].id), e[t.component].className && n(r[i], e[t.component].className), e[t.component].onDone && ($callback = e[t.component].onDone(r[i])), void 0 !== t.onDone && ($callback = t.onDone(r[i]))}},n = function (e, t) {var n = e.className;
			null === n.match(new RegExp('\\b' + t + '\\b', 'g')) && (e.className = '' === n? t: n + ' ' + t);},r = function () {console.log(e);},o = function (t) {e[t.name] = {className: t.className || !1,id: t.id || !1,html: i(t.html),onDone: t.onDone || !1,overwrite: t.overwrite || !1};},i = function (e) {if ('object' == typeof e) { for (var t = '',n = 0,r = e.length;r > n;n++)t += e[n];return t;}if ('string' == typeof e) { for (var t = '',o = e.split(/(?:\r\n|\n|\r)/),n = 0,r = o.length;r > n;n++)t += o[n].trim();return t;}},s = function (t) {var t = t || !1;
			if (t !== !1 && t.component) {var n = t.data || '';
				void 0 !== t.onDone && t.onDone(Mustache.render(e[t.component].html, n));}},a = function (e) {return e.indexOf('.') > -1? document.querySelectorAll(e): e.indexOf('#') > -1? [document.getElementById(e.substring(1))]: document.getElementsByTagName(e);};
	return {bind: t,component: o,componentList: r,generate: s};};

module.exports = new injectplate();
