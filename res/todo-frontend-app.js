(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
	,matchedPos: function() {
		if(this.r.m == null) {
			throw haxe_Exception.thrown("No string matched");
		}
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchSub: function(s,pos,len) {
		if(len == null) {
			len = -1;
		}
		if(this.r.global) {
			this.r.lastIndex = pos;
			this.r.m = this.r.exec(len < 0 ? s : HxOverrides.substr(s,0,pos + len));
			var b = this.r.m != null;
			if(b) {
				this.r.s = s;
			}
			return b;
		} else {
			var b = this.match(len < 0 ? HxOverrides.substr(s,pos,null) : HxOverrides.substr(s,pos,len));
			if(b) {
				this.r.s = s;
				this.r.m.index += pos;
			}
			return b;
		}
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,map: function(s,f) {
		var offset = 0;
		var buf_b = "";
		while(true) {
			if(offset >= s.length) {
				break;
			} else if(!this.matchSub(s,offset)) {
				buf_b += Std.string(HxOverrides.substr(s,offset,null));
				break;
			}
			var p = this.matchedPos();
			buf_b += Std.string(HxOverrides.substr(s,offset,p.pos - offset));
			buf_b += Std.string(f(this));
			if(p.len == 0) {
				buf_b += Std.string(HxOverrides.substr(s,p.pos,1));
				offset = p.pos + 1;
			} else {
				offset = p.pos + p.len;
			}
			if(!this.r.global) {
				break;
			}
		}
		if(!this.r.global && offset > 0 && offset < s.length) {
			buf_b += Std.string(HxOverrides.substr(s,offset,null));
		}
		return buf_b;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.fold = function(it,f,first) {
	var x = $getIterator(it);
	while(x.hasNext()) {
		var x1 = x.next();
		first = f(x1,first);
	}
	return first;
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var v2 = $getIterator(it);
	while(v2.hasNext()) {
		var v21 = v2.next();
		if(v == v21) {
			return i;
		}
		++i;
	}
	return -1;
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var TodoFrontendApp = function() { };
TodoFrontendApp.__name__ = true;
TodoFrontendApp.main = function() {
	var todoElemsIdRenderer = new urals_IntIdRenderer("todo_el_");
	var todoElemWidget = widgets_TodoElemWidget_todoElemWidgetFactory("todo-el",$bind(todoElemsIdRenderer,todoElemsIdRenderer.renderId));
	var todoPageWidget = widgets_TodoPageWidget_todoPageWidgetFactory("todo-page");
	TodoFrontendApp.todoElemsStor = new urals_storage_BasicReactiveStorage(urals_storage_IdGenFunctions_genIntId,function(data) {
		urals_web_BrowserRenderer_browserRender(data,function(el) {
			return "." + todoPageWidget.adv.containerClass;
		},todoElemWidget.renderBundle,function(elHtml,el) {
			todoElemWidget.adv.setOnChangeFunction(elHtml,el,TodoFrontendApp.todoElemsStor);
		});
	});
	urals_web_BrowserRenderer_browserRender(TodoFrontendApp.pageModels,function(el) {
		return "body";
	},todoPageWidget.renderBundle,function(elHtml,el) {
		TodoFrontendApp.todoElemsStor.reInit([{ header : "Почистить зубы", isChecked : false},{ header : "Помыть кота", isChecked : true}]);
	});
	var allStyles = [todoElemWidget.css,todoPageWidget.css].join("\n\n");
	var htmlInjector = new urals_web_BrowserHtmlInjector(window.document.querySelector("html"));
	htmlInjector.append("head","<style>\n" + allStyles + "\n</style>");
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
haxe_IMap.__isInterface__ = true;
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	toString: function() {
		return this.get_message();
	}
	,get_message: function() {
		return this.message;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_Int32 = {};
haxe_Int32.ucompare = function(a,b) {
	if(a < 0) {
		if(b < 0) {
			return ~b - ~a | 0;
		} else {
			return 1;
		}
	}
	if(b < 0) {
		return -1;
	} else {
		return a - b | 0;
	}
};
var haxe_Int64 = {};
haxe_Int64.divMod = function(dividend,divisor) {
	if(divisor.high == 0) {
		switch(divisor.low) {
		case 0:
			throw haxe_Exception.thrown("divide by zero");
		case 1:
			var this1 = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
			var this2 = new haxe__$Int64__$_$_$Int64(0,0);
			return { quotient : this1, modulus : this2};
		}
	}
	var divSign = dividend.high < 0 != divisor.high < 0;
	var modulus;
	if(dividend.high < 0) {
		var high = ~dividend.high;
		var low = ~dividend.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe__$Int64__$_$_$Int64(high,low);
		modulus = this1;
	} else {
		var this1 = new haxe__$Int64__$_$_$Int64(dividend.high,dividend.low);
		modulus = this1;
	}
	if(divisor.high < 0) {
		var high = ~divisor.high;
		var low = ~divisor.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe__$Int64__$_$_$Int64(high,low);
		divisor = this1;
	}
	var this1 = new haxe__$Int64__$_$_$Int64(0,0);
	var quotient = this1;
	var this1 = new haxe__$Int64__$_$_$Int64(0,1);
	var mask = this1;
	while(!(divisor.high < 0)) {
		var v = haxe_Int32.ucompare(divisor.high,modulus.high);
		var cmp = v != 0 ? v : haxe_Int32.ucompare(divisor.low,modulus.low);
		var b = 1;
		b &= 63;
		if(b == 0) {
			var this1 = new haxe__$Int64__$_$_$Int64(divisor.high,divisor.low);
			divisor = this1;
		} else if(b < 32) {
			var this2 = new haxe__$Int64__$_$_$Int64(divisor.high << b | divisor.low >>> 32 - b,divisor.low << b);
			divisor = this2;
		} else {
			var this3 = new haxe__$Int64__$_$_$Int64(divisor.low << b - 32,0);
			divisor = this3;
		}
		var b1 = 1;
		b1 &= 63;
		if(b1 == 0) {
			var this4 = new haxe__$Int64__$_$_$Int64(mask.high,mask.low);
			mask = this4;
		} else if(b1 < 32) {
			var this5 = new haxe__$Int64__$_$_$Int64(mask.high << b1 | mask.low >>> 32 - b1,mask.low << b1);
			mask = this5;
		} else {
			var this6 = new haxe__$Int64__$_$_$Int64(mask.low << b1 - 32,0);
			mask = this6;
		}
		if(cmp >= 0) {
			break;
		}
	}
	while(true) {
		var b_high = 0;
		var b_low = 0;
		if(!(mask.high != b_high || mask.low != b_low)) {
			break;
		}
		var v = haxe_Int32.ucompare(modulus.high,divisor.high);
		if((v != 0 ? v : haxe_Int32.ucompare(modulus.low,divisor.low)) >= 0) {
			var this1 = new haxe__$Int64__$_$_$Int64(quotient.high | mask.high,quotient.low | mask.low);
			quotient = this1;
			var high = modulus.high - divisor.high | 0;
			var low = modulus.low - divisor.low | 0;
			if(haxe_Int32.ucompare(modulus.low,divisor.low) < 0) {
				var ret = high--;
				high = high | 0;
			}
			var this2 = new haxe__$Int64__$_$_$Int64(high,low);
			modulus = this2;
		}
		var b = 1;
		b &= 63;
		if(b == 0) {
			var this3 = new haxe__$Int64__$_$_$Int64(mask.high,mask.low);
			mask = this3;
		} else if(b < 32) {
			var this4 = new haxe__$Int64__$_$_$Int64(mask.high >>> b,mask.high << 32 - b | mask.low >>> b);
			mask = this4;
		} else {
			var this5 = new haxe__$Int64__$_$_$Int64(0,mask.high >>> b - 32);
			mask = this5;
		}
		var b1 = 1;
		b1 &= 63;
		if(b1 == 0) {
			var this6 = new haxe__$Int64__$_$_$Int64(divisor.high,divisor.low);
			divisor = this6;
		} else if(b1 < 32) {
			var this7 = new haxe__$Int64__$_$_$Int64(divisor.high >>> b1,divisor.high << 32 - b1 | divisor.low >>> b1);
			divisor = this7;
		} else {
			var this8 = new haxe__$Int64__$_$_$Int64(0,divisor.high >>> b1 - 32);
			divisor = this8;
		}
	}
	if(divSign) {
		var high = ~quotient.high;
		var low = ~quotient.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe__$Int64__$_$_$Int64(high,low);
		quotient = this1;
	}
	if(dividend.high < 0) {
		var high = ~modulus.high;
		var low = ~modulus.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe__$Int64__$_$_$Int64(high,low);
		modulus = this1;
	}
	return { quotient : quotient, modulus : modulus};
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = true;
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Int64Helper = function() { };
haxe_Int64Helper.__name__ = true;
haxe_Int64Helper.fromFloat = function(f) {
	if(isNaN(f) || !isFinite(f)) {
		throw haxe_Exception.thrown("Number is NaN or Infinite");
	}
	var noFractions = f - f % 1;
	if(noFractions > 9007199254740991) {
		throw haxe_Exception.thrown("Conversion overflow");
	}
	if(noFractions < -9007199254740991) {
		throw haxe_Exception.thrown("Conversion underflow");
	}
	var this1 = new haxe__$Int64__$_$_$Int64(0,0);
	var result = this1;
	var neg = noFractions < 0;
	var rest = neg ? -noFractions : noFractions;
	var i = 0;
	while(rest >= 1) {
		var curr = rest % 2;
		rest /= 2;
		if(curr >= 1) {
			var a_high = 0;
			var a_low = 1;
			var b = i;
			b &= 63;
			var b1;
			if(b == 0) {
				var this1 = new haxe__$Int64__$_$_$Int64(a_high,a_low);
				b1 = this1;
			} else if(b < 32) {
				var this2 = new haxe__$Int64__$_$_$Int64(a_high << b | a_low >>> 32 - b,a_low << b);
				b1 = this2;
			} else {
				var this3 = new haxe__$Int64__$_$_$Int64(a_low << b - 32,0);
				b1 = this3;
			}
			var high = result.high + b1.high | 0;
			var low = result.low + b1.low | 0;
			if(haxe_Int32.ucompare(low,result.low) < 0) {
				var ret = high++;
				high = high | 0;
			}
			var this4 = new haxe__$Int64__$_$_$Int64(high,low);
			result = this4;
		}
		++i;
	}
	if(neg) {
		var high = ~result.high;
		var low = ~result.low + 1 | 0;
		if(low == 0) {
			var ret = high++;
			high = high | 0;
		}
		var this1 = new haxe__$Int64__$_$_$Int64(high,low);
		result = this1;
	}
	return result;
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	__class__: haxe_ValueException
});
var haxe_crypto_Md5 = function() {
};
haxe_crypto_Md5.__name__ = true;
haxe_crypto_Md5.make = function(b) {
	var h = new haxe_crypto_Md5().doEncode(haxe_crypto_Md5.bytes2blks(b));
	var out = new haxe_io_Bytes(new ArrayBuffer(16));
	var p = 0;
	out.b[p++] = h[0] & 255;
	out.b[p++] = h[0] >> 8 & 255;
	out.b[p++] = h[0] >> 16 & 255;
	out.b[p++] = h[0] >>> 24;
	out.b[p++] = h[1] & 255;
	out.b[p++] = h[1] >> 8 & 255;
	out.b[p++] = h[1] >> 16 & 255;
	out.b[p++] = h[1] >>> 24;
	out.b[p++] = h[2] & 255;
	out.b[p++] = h[2] >> 8 & 255;
	out.b[p++] = h[2] >> 16 & 255;
	out.b[p++] = h[2] >>> 24;
	out.b[p++] = h[3] & 255;
	out.b[p++] = h[3] >> 8 & 255;
	out.b[p++] = h[3] >> 16 & 255;
	out.b[p++] = h[3] >>> 24;
	return out;
};
haxe_crypto_Md5.bytes2blks = function(b) {
	var nblk = (b.length + 8 >> 6) + 1;
	var blks = [];
	var blksSize = nblk * 16;
	var _g = 0;
	var _g1 = blksSize;
	while(_g < _g1) {
		var i = _g++;
		blks[i] = 0;
	}
	var i = 0;
	while(i < b.length) {
		blks[i >> 2] |= b.b[i] << (((b.length << 3) + i & 3) << 3);
		++i;
	}
	blks[i >> 2] |= 128 << (b.length * 8 + i) % 4 * 8;
	var l = b.length * 8;
	var k = nblk * 16 - 2;
	blks[k] = l & 255;
	blks[k] |= (l >>> 8 & 255) << 8;
	blks[k] |= (l >>> 16 & 255) << 16;
	blks[k] |= (l >>> 24 & 255) << 24;
	return blks;
};
haxe_crypto_Md5.prototype = {
	bitOR: function(a,b) {
		var lsb = a & 1 | b & 1;
		var msb31 = a >>> 1 | b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitXOR: function(a,b) {
		var lsb = a & 1 ^ b & 1;
		var msb31 = a >>> 1 ^ b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitAND: function(a,b) {
		var lsb = a & 1 & (b & 1);
		var msb31 = a >>> 1 & b >>> 1;
		return msb31 << 1 | lsb;
	}
	,addme: function(x,y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 65535;
	}
	,rol: function(num,cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	,cmn: function(q,a,b,x,s,t) {
		return this.addme(this.rol(this.addme(this.addme(a,q),this.addme(x,t)),s),b);
	}
	,ff: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
	}
	,gg: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
	}
	,hh: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
	}
	,ii: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
	}
	,doEncode: function(x) {
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var step;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			step = 0;
			a = this.ff(a,b,c,d,x[i],7,-680876936);
			d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
			c = this.ff(c,d,a,b,x[i + 2],17,606105819);
			b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
			a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
			d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
			c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
			b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
			a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
			d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
			c = this.ff(c,d,a,b,x[i + 10],17,-42063);
			b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
			a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
			d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
			c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
			b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
			a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
			d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
			c = this.gg(c,d,a,b,x[i + 11],14,643717713);
			b = this.gg(b,c,d,a,x[i],20,-373897302);
			a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
			d = this.gg(d,a,b,c,x[i + 10],9,38016083);
			c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
			b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
			a = this.gg(a,b,c,d,x[i + 9],5,568446438);
			d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
			c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
			b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
			a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
			d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
			c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
			b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
			a = this.hh(a,b,c,d,x[i + 5],4,-378558);
			d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
			c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
			b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
			a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
			d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
			c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
			b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
			a = this.hh(a,b,c,d,x[i + 13],4,681279174);
			d = this.hh(d,a,b,c,x[i],11,-358537222);
			c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
			b = this.hh(b,c,d,a,x[i + 6],23,76029189);
			a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
			d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
			c = this.hh(c,d,a,b,x[i + 15],16,530742520);
			b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
			a = this.ii(a,b,c,d,x[i],6,-198630844);
			d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
			c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
			b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
			a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
			d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
			c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
			b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
			a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
			d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
			c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
			b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
			a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
			d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
			c = this.ii(c,d,a,b,x[i + 2],15,718787259);
			b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
			a = this.addme(a,olda);
			b = this.addme(b,oldb);
			c = this.addme(c,oldc);
			d = this.addme(d,oldd);
			i += 16;
		}
		return [a,b,c,d];
	}
	,__class__: haxe_crypto_Md5
};
var haxe_crypto_Sha1 = function() {
};
haxe_crypto_Sha1.__name__ = true;
haxe_crypto_Sha1.make = function(b) {
	var h = new haxe_crypto_Sha1().doEncode(haxe_crypto_Sha1.bytes2blks(b));
	var out = new haxe_io_Bytes(new ArrayBuffer(20));
	var p = 0;
	out.b[p++] = h[0] >>> 24;
	out.b[p++] = h[0] >> 16 & 255;
	out.b[p++] = h[0] >> 8 & 255;
	out.b[p++] = h[0] & 255;
	out.b[p++] = h[1] >>> 24;
	out.b[p++] = h[1] >> 16 & 255;
	out.b[p++] = h[1] >> 8 & 255;
	out.b[p++] = h[1] & 255;
	out.b[p++] = h[2] >>> 24;
	out.b[p++] = h[2] >> 16 & 255;
	out.b[p++] = h[2] >> 8 & 255;
	out.b[p++] = h[2] & 255;
	out.b[p++] = h[3] >>> 24;
	out.b[p++] = h[3] >> 16 & 255;
	out.b[p++] = h[3] >> 8 & 255;
	out.b[p++] = h[3] & 255;
	out.b[p++] = h[4] >>> 24;
	out.b[p++] = h[4] >> 16 & 255;
	out.b[p++] = h[4] >> 8 & 255;
	out.b[p++] = h[4] & 255;
	return out;
};
haxe_crypto_Sha1.bytes2blks = function(b) {
	var nblk = (b.length + 8 >> 6) + 1;
	var blks = [];
	var _g = 0;
	var _g1 = nblk * 16;
	while(_g < _g1) {
		var i = _g++;
		blks[i] = 0;
	}
	var _g = 0;
	var _g1 = b.length;
	while(_g < _g1) {
		var i = _g++;
		var p = i >> 2;
		blks[p] |= b.b[i] << 24 - ((i & 3) << 3);
	}
	var i = b.length;
	var p = i >> 2;
	blks[p] |= 128 << 24 - ((i & 3) << 3);
	blks[nblk * 16 - 1] = b.length * 8;
	return blks;
};
haxe_crypto_Sha1.prototype = {
	doEncode: function(x) {
		var w = [];
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var e = -1009589776;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			var olde = e;
			var j = 0;
			while(j < 80) {
				if(j < 16) {
					w[j] = x[i + j];
				} else {
					var num = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
					w[j] = num << 1 | num >>> 31;
				}
				var t = (a << 5 | a >>> 27) + this.ft(j,b,c,d) + e + w[j] + this.kt(j);
				e = d;
				d = c;
				c = b << 30 | b >>> 2;
				b = a;
				a = t;
				++j;
			}
			a += olda;
			b += oldb;
			c += oldc;
			d += oldd;
			e += olde;
			i += 16;
		}
		return [a,b,c,d,e];
	}
	,ft: function(t,b,c,d) {
		if(t < 20) {
			return b & c | ~b & d;
		}
		if(t < 40) {
			return b ^ c ^ d;
		}
		if(t < 60) {
			return b & c | b & d | c & d;
		}
		return b ^ c ^ d;
	}
	,kt: function(t) {
		if(t < 20) {
			return 1518500249;
		}
		if(t < 40) {
			return 1859775393;
		}
		if(t < 60) {
			return -1894007588;
		}
		return -899497514;
	}
	,__class__: haxe_crypto_Sha1
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.ofString = function(s,encoding) {
	if(encoding == haxe_io_Encoding.RawNative) {
		var buf = new Uint8Array(s.length << 1);
		var _g = 0;
		var _g1 = s.length;
		while(_g < _g1) {
			var i = _g++;
			var c = s.charCodeAt(i);
			buf[i << 1] = c & 255;
			buf[i << 1 | 1] = c >> 8;
		}
		return new haxe_io_Bytes(buf.buffer);
	}
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = s.charCodeAt(i++);
		if(55296 <= c && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
		}
		if(c <= 127) {
			a.push(c);
		} else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.ofHex = function(s) {
	if((s.length & 1) != 0) {
		throw haxe_Exception.thrown("Not a hex string (odd number of digits)");
	}
	var a = [];
	var i = 0;
	var len = s.length >> 1;
	while(i < len) {
		var high = s.charCodeAt(i * 2);
		var low = s.charCodeAt(i * 2 + 1);
		high = (high & 15) + ((high & 64) >> 6) * 9;
		low = (low & 15) + ((low & 64) >> 6) * 9;
		a.push((high << 4 | low) & 255);
		++i;
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	toHex: function() {
		var s_b = "";
		var chars = [];
		var str = "0123456789abcdef";
		var _g = 0;
		var _g1 = str.length;
		while(_g < _g1) {
			var i = _g++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g = 0;
		var _g1 = this.length;
		while(_g < _g1) {
			var i = _g++;
			var c = this.b[i];
			s_b += String.fromCodePoint(chars[c >> 4]);
			s_b += String.fromCodePoint(chars[c & 15]);
		}
		return s_b;
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var htmlparser_CssSelector = function(type) {
	this.classes = [];
	this.type = type;
};
htmlparser_CssSelector.__name__ = true;
htmlparser_CssSelector.parse = function(selector) {
	var r = [];
	var selectors = new EReg("\\s*,\\s*","g").split(selector);
	var _g = 0;
	while(_g < selectors.length) {
		var s = selectors[_g];
		++_g;
		if(s != "") {
			r.push(htmlparser_CssSelector.parseInner(s));
		}
	}
	return r;
};
htmlparser_CssSelector.parseInner = function(selector) {
	var rr = [];
	selector = " " + selector;
	var r = null;
	var re = new EReg(htmlparser_CssSelector.reSelector,"gi");
	var pos = 0;
	while(re.matchSub(selector,pos)) {
		var type1;
		try {
			type1 = re.matched(1);
		} catch( _g ) {
			type1 = null;
		}
		if(type1 == null) {
			type1 = "";
		}
		var type2;
		try {
			type2 = re.matched(2);
		} catch( _g1 ) {
			type2 = null;
		}
		if(type2 == null) {
			type2 = "";
		}
		if(type1.length > 0 || type2.length > 0) {
			if(r != null) {
				rr.push(r);
			}
			r = new htmlparser_CssSelector(type2.length > 0 ? ">" : " ");
		}
		var name = re.matched(4);
		if(name != "*") {
			var s = re.matched(3);
			if(s == "#") {
				r.id = name;
			} else if(s == ".") {
				r.classes.push(name);
			} else {
				r.tagNameLC = name.toLowerCase();
			}
			var sIndex;
			try {
				sIndex = re.matched(5);
			} catch( _g2 ) {
				sIndex = null;
			}
			if(sIndex != null && sIndex != "") {
				r.index = Std.parseInt(sIndex.substring(1,sIndex.length - 1));
				var f = r.index;
				if(isNaN(f)) {
					r.index = null;
				}
			}
		}
		var p = re.matchedPos();
		pos = p.pos + p.len;
	}
	if(r != null) {
		rr.push(r);
	}
	return rr;
};
htmlparser_CssSelector.getMatched = function(re,n) {
	try {
		return re.matched(n);
	} catch( _g ) {
		return null;
	}
};
htmlparser_CssSelector.prototype = {
	__class__: htmlparser_CssSelector
};
var htmlparser_HtmlAttribute = function(name,value,quote) {
	this.name = name;
	this.value = value;
	this.quote = quote;
};
htmlparser_HtmlAttribute.__name__ = true;
htmlparser_HtmlAttribute.prototype = {
	toString: function() {
		if(this.value != null && this.quote != null) {
			return this.name + "=" + this.quote + htmlparser_HtmlTools.escape(this.value,"\r\n" + (this.quote == "'" ? "\"" : "'")) + this.quote;
		} else {
			return this.name;
		}
	}
	,__class__: htmlparser_HtmlAttribute
};
var htmlparser_HtmlNode = function() { };
htmlparser_HtmlNode.__name__ = true;
htmlparser_HtmlNode.prototype = {
	remove: function() {
		if(this.parent != null) {
			this.parent.removeChild(this);
		}
	}
	,getPrevSiblingNode: function() {
		if(this.parent == null) {
			return null;
		}
		var siblings = this.parent.nodes;
		var n = Lambda.indexOf(siblings,this);
		if(n <= 0) {
			return null;
		}
		if(n > 0) {
			return siblings[n - 1];
		}
		return null;
	}
	,getNextSiblingNode: function() {
		if(this.parent == null) {
			return null;
		}
		var siblings = this.parent.nodes;
		var n = Lambda.indexOf(siblings,this);
		if(n < 0) {
			return null;
		}
		if(n + 1 < siblings.length) {
			return siblings[n + 1];
		}
		return null;
	}
	,toString: function() {
		return "";
	}
	,toText: function() {
		return "";
	}
	,hxSerialize: function(s) {
	}
	,hxUnserialize: function(s) {
	}
	,__class__: htmlparser_HtmlNode
};
var htmlparser_HtmlNodeElement = function(name,attributes) {
	this.name = name;
	this.attributes = attributes;
	this.nodes = [];
	this.children = [];
};
htmlparser_HtmlNodeElement.__name__ = true;
htmlparser_HtmlNodeElement.__super__ = htmlparser_HtmlNode;
htmlparser_HtmlNodeElement.prototype = $extend(htmlparser_HtmlNode.prototype,{
	getPrevSiblingElement: function() {
		if(this.parent == null) {
			return null;
		}
		var n = this.parent.children.indexOf(this);
		if(n < 0) {
			return null;
		}
		if(n > 0) {
			return this.parent.children[n - 1];
		}
		return null;
	}
	,getNextSiblingElement: function() {
		if(this.parent == null) {
			return null;
		}
		var n = this.parent.children.indexOf(this);
		if(n < 0) {
			return null;
		}
		if(n + 1 < this.parent.children.length) {
			return this.parent.children[n + 1];
		}
		return null;
	}
	,addChild: function(node,beforeNode) {
		node.parent = this;
		if(beforeNode == null) {
			this.nodes.push(node);
			if(((node) instanceof htmlparser_HtmlNodeElement)) {
				this.children.push(node);
			}
		} else {
			var n = this.nodes.indexOf(beforeNode);
			if(n >= 0) {
				this.nodes.splice(n,0,node);
				if(((node) instanceof htmlparser_HtmlNodeElement)) {
					n = this.children.indexOf(beforeNode);
					if(n >= 0) {
						this.children.splice(n,0,node);
					}
				}
			}
		}
	}
	,addChildren: function(nodesToAdd,beforeNode) {
		var _g = 0;
		while(_g < nodesToAdd.length) {
			var node = nodesToAdd[_g];
			++_g;
			node.parent = this;
		}
		if(beforeNode == null) {
			var _g = 0;
			while(_g < nodesToAdd.length) {
				var node = nodesToAdd[_g];
				++_g;
				this.addChild(node);
			}
		} else {
			var n = this.nodes.indexOf(beforeNode);
			if(n >= 0) {
				this.nodes = this.nodes.slice(0,n).concat(nodesToAdd).concat(this.nodes.slice(n));
				var _g = [];
				var _g1 = 0;
				var _g2 = nodesToAdd;
				while(_g1 < _g2.length) {
					var v = _g2[_g1];
					++_g1;
					if(((v) instanceof htmlparser_HtmlNodeElement)) {
						_g.push(v);
					}
				}
				var _this = _g;
				var result = new Array(_this.length);
				var _g = 0;
				var _g1 = _this.length;
				while(_g < _g1) {
					var i = _g++;
					result[i] = _this[i];
				}
				var elems = result;
				if(elems.length > 0) {
					n = this.children.indexOf(beforeNode);
					if(n >= 0) {
						this.children = this.children.slice(0,n).concat(elems).concat(this.children.slice(n));
					}
				}
			}
		}
	}
	,toString: function() {
		var sAttrs_b = "";
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			sAttrs_b += " ";
			sAttrs_b += Std.string(a.toString());
		}
		var innerBuf_b = "";
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			innerBuf_b += Std.string(node.toString());
		}
		var inner = innerBuf_b;
		if(inner == "" && this.isSelfClosing()) {
			return "<" + this.name + sAttrs_b + " />";
		}
		if(this.name != null && this.name != "") {
			return "<" + this.name + sAttrs_b + ">" + inner + "</" + this.name + ">";
		} else {
			return inner;
		}
	}
	,getAttribute: function(name) {
		var nameLC = name.toLowerCase();
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.name.toLowerCase() == nameLC) {
				return a.value;
			}
		}
		return null;
	}
	,setAttribute: function(name,value) {
		var nameLC = name.toLowerCase();
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.name.toLowerCase() == nameLC) {
				a.value = value;
				return;
			}
		}
		this.attributes.push(new htmlparser_HtmlAttribute(name,value,"\""));
	}
	,removeAttribute: function(name) {
		var nameLC = name.toLowerCase();
		var _g = 0;
		var _g1 = this.attributes.length;
		while(_g < _g1) {
			var i = _g++;
			var a = this.attributes[i];
			if(a.name.toLowerCase() == nameLC) {
				this.attributes.splice(i,1);
				return;
			}
		}
	}
	,hasAttribute: function(name) {
		var nameLC = name.toLowerCase();
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(a.name.toLowerCase() == nameLC) {
				return true;
			}
		}
		return false;
	}
	,get_innerHTML: function() {
		var r_b = "";
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			r_b += Std.string(node.toString());
		}
		return r_b;
	}
	,set_innerHTML: function(value) {
		var newNodes = htmlparser_HtmlParser.run(value);
		this.nodes = [];
		this.children = [];
		var _g = 0;
		while(_g < newNodes.length) {
			var node = newNodes[_g];
			++_g;
			this.addChild(node);
		}
		return value;
	}
	,get_innerText: function() {
		return this.toText();
	}
	,set_innerText: function(text) {
		this.fastSetInnerHTML(htmlparser_HtmlTools.escape(text));
		return text;
	}
	,fastSetInnerHTML: function(html) {
		this.nodes = [];
		this.children = [];
		this.addChild(new htmlparser_HtmlNodeText(html));
	}
	,toText: function() {
		var r_b = "";
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			r_b += Std.string(node.toText());
		}
		return r_b;
	}
	,find: function(selector) {
		var parsedSelectors = htmlparser_CssSelector.parse(selector);
		var resNodes = [];
		var _g = 0;
		while(_g < parsedSelectors.length) {
			var s = parsedSelectors[_g];
			++_g;
			var _g1 = 0;
			var _g2 = this.children;
			while(_g1 < _g2.length) {
				var node = _g2[_g1];
				++_g1;
				var nodesToAdd = node.findInner(s);
				var _g3 = 0;
				while(_g3 < nodesToAdd.length) {
					var nodeToAdd = nodesToAdd[_g3];
					++_g3;
					if(resNodes.indexOf(nodeToAdd) < 0) {
						resNodes.push(nodeToAdd);
					}
				}
			}
		}
		return resNodes;
	}
	,findInner: function(selectors) {
		if(selectors.length == 0) {
			return [];
		}
		var nodes = [];
		if(selectors[0].type == " ") {
			var _g = 0;
			var _g1 = this.children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				nodes = nodes.concat(child.findInner(selectors));
			}
		}
		if(this.isSelectorTrue(selectors[0])) {
			if(selectors.length > 1) {
				var subSelectors = selectors.slice(1);
				var _g = 0;
				var _g1 = this.children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					nodes = nodes.concat(child.findInner(subSelectors));
				}
			} else if(selectors.length == 1) {
				if(this.parent != null) {
					nodes.push(this);
				}
			}
		}
		return nodes;
	}
	,isSelectorTrue: function(selector) {
		if(selector.tagNameLC != null && this.name.toLowerCase() != selector.tagNameLC) {
			return false;
		}
		if(selector.id != null && this.getAttribute("id") != selector.id) {
			return false;
		}
		var _g = 0;
		var _g1 = selector.classes;
		while(_g < _g1.length) {
			var clas = _g1[_g];
			++_g;
			var reg = new EReg("(?:^|\\s)" + clas + "(?:$|\\s)","");
			var classAttr = this.getAttribute("class");
			if(classAttr == null || !reg.match(classAttr)) {
				return false;
			}
		}
		if(selector.index != null && (this.parent == null || this.parent.children.indexOf(this) + 1 != selector.index)) {
			return false;
		}
		return true;
	}
	,replaceChild: function(node,newNode) {
		newNode.parent = this;
		var n = this.nodes.indexOf(node);
		this.nodes[n] = newNode;
		var n = this.children.indexOf(node);
		if(((newNode) instanceof htmlparser_HtmlNodeElement)) {
			this.children[n] = newNode;
		} else {
			this.children.splice(n,1);
		}
	}
	,replaceChildWithInner: function(node,nodeContainer) {
		var _g = 0;
		var _g1 = nodeContainer.nodes;
		while(_g < _g1.length) {
			var n = _g1[_g];
			++_g;
			n.parent = this;
		}
		var n = this.nodes.indexOf(node);
		var lastNodes = this.nodes.slice(n + 1,this.nodes.length);
		this.nodes = (n != 0 ? this.nodes.slice(0,n) : []).concat(nodeContainer.nodes).concat(lastNodes);
		var n = this.children.indexOf(node);
		var lastChildren = this.children.slice(n + 1,this.children.length);
		this.children = (n != 0 ? this.children.slice(0,n) : []).concat(nodeContainer.children).concat(lastChildren);
	}
	,removeChild: function(node) {
		var n = this.nodes.indexOf(node);
		if(n >= 0) {
			this.nodes.splice(n,1);
			if(((node) instanceof htmlparser_HtmlNodeElement)) {
				n = this.children.indexOf(node);
				if(n >= 0) {
					this.children.splice(n,1);
				}
			}
		}
	}
	,getAttributesAssoc: function() {
		var attrs = new haxe_ds_StringMap();
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var attr = _g1[_g];
			++_g;
			attrs.h[attr.name] = attr.value;
		}
		return attrs;
	}
	,getAttributesObject: function() {
		var attrs = { };
		var _g = 0;
		var _g1 = this.attributes;
		while(_g < _g1.length) {
			var attr = _g1[_g];
			++_g;
			attrs[attr.name] = attr.value;
		}
		return attrs;
	}
	,isSelfClosing: function() {
		if(!Object.prototype.hasOwnProperty.call(htmlparser_HtmlParser.SELF_CLOSING_TAGS_HTML,this.name)) {
			return this.name.indexOf(":") >= 0;
		} else {
			return true;
		}
	}
	,hxSerialize: function(s) {
		s.serialize(this.name);
		s.serialize(this.attributes);
		s.serialize(this.nodes);
	}
	,hxUnserialize: function(s) {
		this.name = s.unserialize();
		this.attributes = s.unserialize();
		this.nodes = [];
		this.children = [];
		var ns = s.unserialize();
		var _g = 0;
		while(_g < ns.length) {
			var n = ns[_g];
			++_g;
			this.addChild(n);
		}
	}
	,__class__: htmlparser_HtmlNodeElement
});
var htmlparser_HtmlDocument = function(str,tolerant) {
	if(tolerant == null) {
		tolerant = false;
	}
	if(str == null) {
		str = "";
	}
	htmlparser_HtmlNodeElement.call(this,"",[]);
	var nodes = htmlparser_HtmlParser.run(str,tolerant);
	var _g = 0;
	while(_g < nodes.length) {
		var node = nodes[_g];
		++_g;
		this.addChild(node);
	}
};
htmlparser_HtmlDocument.__name__ = true;
htmlparser_HtmlDocument.__super__ = htmlparser_HtmlNodeElement;
htmlparser_HtmlDocument.prototype = $extend(htmlparser_HtmlNodeElement.prototype,{
	__class__: htmlparser_HtmlDocument
});
var htmlparser_HtmlNodeText = function(text) {
	this.text = text;
};
htmlparser_HtmlNodeText.__name__ = true;
htmlparser_HtmlNodeText.__super__ = htmlparser_HtmlNode;
htmlparser_HtmlNodeText.prototype = $extend(htmlparser_HtmlNode.prototype,{
	toString: function() {
		return this.text;
	}
	,toText: function() {
		return htmlparser_HtmlTools.unescape(this.text);
	}
	,hxSerialize: function(s) {
		s.serialize(this.text);
	}
	,hxUnserialize: function(s) {
		this.text = s.unserialize();
	}
	,__class__: htmlparser_HtmlNodeText
});
var htmlparser_HtmlParser = function() {
};
htmlparser_HtmlParser.__name__ = true;
htmlparser_HtmlParser.run = function(str,tolerant) {
	if(tolerant == null) {
		tolerant = false;
	}
	return new htmlparser_HtmlParser().parse(str,tolerant);
};
htmlparser_HtmlParser.parseAttrs = function(str) {
	var attributes = [];
	var pos = 0;
	while(pos < str.length && htmlparser_HtmlParser.reParseAttrs.matchSub(str,pos)) {
		var name = htmlparser_HtmlParser.reParseAttrs.matched(1);
		var value = htmlparser_HtmlParser.reParseAttrs.matched(2);
		var quote = null;
		var unescaped = null;
		if(value != null) {
			quote = HxOverrides.substr(value,0,1);
			if(quote == "\"" || quote == "'") {
				value = HxOverrides.substr(value,1,value.length - 2);
			} else {
				quote = "";
			}
			unescaped = htmlparser_HtmlTools.unescape(value);
		}
		attributes.push(new htmlparser_HtmlAttribute(name,unescaped,quote));
		var p = htmlparser_HtmlParser.reParseAttrs.matchedPos();
		pos = p.pos + p.len;
	}
	return attributes;
};
htmlparser_HtmlParser.getMatched = function(re,n) {
	try {
		return re.matched(n);
	} catch( _g ) {
		return null;
	}
};
htmlparser_HtmlParser.prototype = {
	parse: function(str,tolerant) {
		if(tolerant == null) {
			tolerant = false;
		}
		this.tolerant = tolerant;
		this.matches = [];
		var pos = 0;
		while(pos < str.length && htmlparser_HtmlParser.reMain.matchSub(str,pos)) {
			var p = htmlparser_HtmlParser.reMain.matchedPos();
			var re = htmlparser_HtmlParser.reMain;
			var cdata;
			try {
				cdata = re.matched(1);
			} catch( _g ) {
				cdata = null;
			}
			if(cdata == null || cdata == "") {
				var r = htmlparser_HtmlParser.reMain.matched(0);
				var p1 = p.pos;
				var re1 = htmlparser_HtmlParser.reMain;
				var r1;
				try {
					r1 = re1.matched(2);
				} catch( _g1 ) {
					r1 = null;
				}
				var re2 = htmlparser_HtmlParser.reMain;
				var r2;
				try {
					r2 = re2.matched(3);
				} catch( _g2 ) {
					r2 = null;
				}
				var re3 = htmlparser_HtmlParser.reMain;
				var r3;
				try {
					r3 = re3.matched(4);
				} catch( _g3 ) {
					r3 = null;
				}
				var re4 = htmlparser_HtmlParser.reMain;
				var r4;
				try {
					r4 = re4.matched(5);
				} catch( _g4 ) {
					r4 = null;
				}
				var re5 = htmlparser_HtmlParser.reMain;
				var r5;
				try {
					r5 = re5.matched(6);
				} catch( _g5 ) {
					r5 = null;
				}
				var re6 = htmlparser_HtmlParser.reMain;
				var r6;
				try {
					r6 = re6.matched(7);
				} catch( _g6 ) {
					r6 = null;
				}
				var re7 = htmlparser_HtmlParser.reMain;
				var r7;
				try {
					r7 = re7.matched(8);
				} catch( _g7 ) {
					r7 = null;
				}
				var re8 = htmlparser_HtmlParser.reMain;
				var r8;
				try {
					r8 = re8.matched(9);
				} catch( _g8 ) {
					r8 = null;
				}
				var re9 = htmlparser_HtmlParser.reMain;
				var r9;
				try {
					r9 = re9.matched(10);
				} catch( _g9 ) {
					r9 = null;
				}
				var re10 = htmlparser_HtmlParser.reMain;
				var r10;
				try {
					r10 = re10.matched(11);
				} catch( _g10 ) {
					r10 = null;
				}
				var re11 = htmlparser_HtmlParser.reMain;
				var r11;
				try {
					r11 = re11.matched(12);
				} catch( _g11 ) {
					r11 = null;
				}
				var re12 = htmlparser_HtmlParser.reMain;
				var r12;
				try {
					r12 = re12.matched(13);
				} catch( _g12 ) {
					r12 = null;
				}
				var re13 = htmlparser_HtmlParser.reMain;
				var r13;
				try {
					r13 = re13.matched(14);
				} catch( _g13 ) {
					r13 = null;
				}
				var r14 = { all : r, allPos : p1, script : r1, scriptAttrs : r2, scriptText : r3, style : r4, styleAttrs : r5, styleText : r6, elem : r7, tagOpen : r8, attrs : r9, tagEnd : r10, close : r11, tagClose : r12, comment : r13, tagOpenLC : null, tagCloseLC : null};
				if(r14.tagOpen != null) {
					r14.tagOpenLC = r14.tagOpen.toLowerCase();
				}
				if(r14.tagClose != null) {
					r14.tagCloseLC = r14.tagClose.toLowerCase();
				}
				this.matches.push(r14);
			}
			pos = p.pos + p.len;
		}
		if(this.matches.length > 0) {
			this.str = str;
			this.i = 0;
			var nodes = this.processMatches([]).nodes;
			if(this.i < this.matches.length) {
				throw haxe_Exception.thrown(new htmlparser_HtmlParserException("Not all nodes processed.",this.getPosition(this.i)));
			}
			return nodes;
		}
		if(str.length > 0) {
			return [new htmlparser_HtmlNodeText(str)];
		} else {
			return [];
		}
	}
	,processMatches: function(openedTagsLC) {
		var nodes = [];
		var prevEnd = this.i > 0 ? this.matches[this.i - 1].allPos + this.matches[this.i - 1].all.length : 0;
		var curStart = this.matches[this.i].allPos;
		if(prevEnd < curStart) {
			nodes.push(new htmlparser_HtmlNodeText(HxOverrides.substr(this.str,prevEnd,curStart - prevEnd)));
		}
		while(this.i < this.matches.length) {
			var m = this.matches[this.i];
			if(m.elem != null && m.elem != "") {
				var ee = this.parseElement(openedTagsLC);
				nodes.push(ee.element);
				if(ee.closeTagLC != "") {
					return { nodes : nodes, closeTagLC : ee.closeTagLC};
				}
			} else if(m.script != null && m.script != "") {
				var scriptNode = this.newElement("script",htmlparser_HtmlParser.parseAttrs(m.scriptAttrs));
				scriptNode.addChild(new htmlparser_HtmlNodeText(m.scriptText));
				nodes.push(scriptNode);
			} else if(m.style != null && m.style != "") {
				var styleNode = this.newElement("style",htmlparser_HtmlParser.parseAttrs(m.styleAttrs));
				styleNode.addChild(new htmlparser_HtmlNodeText(m.styleText));
				nodes.push(styleNode);
			} else if(m.close != null && m.close != "") {
				if(m.tagCloseLC == openedTagsLC[openedTagsLC.length - 1]) {
					break;
				}
				if(this.tolerant) {
					if(openedTagsLC.lastIndexOf(m.tagCloseLC) >= 0) {
						break;
					}
				} else {
					throw haxe_Exception.thrown(new htmlparser_HtmlParserException("Closed tag <" + m.tagClose + "> don't match to open tag <" + openedTagsLC[openedTagsLC.length - 1] + ">.",this.getPosition(this.i)));
				}
			} else if(m.comment != null && m.comment != "") {
				nodes.push(new htmlparser_HtmlNodeText(m.comment));
			} else {
				throw haxe_Exception.thrown(new htmlparser_HtmlParserException("Unexpected XML node.",this.getPosition(this.i)));
			}
			if(this.tolerant && this.i >= this.matches.length) {
				break;
			}
			var curEnd = this.matches[this.i].allPos + this.matches[this.i].all.length;
			var nextStart = this.i + 1 < this.matches.length ? this.matches[this.i + 1].allPos : this.str.length;
			if(curEnd < nextStart) {
				nodes.push(new htmlparser_HtmlNodeText(HxOverrides.substr(this.str,curEnd,nextStart - curEnd)));
			}
			this.i++;
		}
		return { nodes : nodes, closeTagLC : ""};
	}
	,parseElement: function(openedTagsLC) {
		var tag = this.matches[this.i].tagOpen;
		var tagLC = this.matches[this.i].tagOpenLC;
		var attrs = this.matches[this.i].attrs;
		var isWithClose = this.matches[this.i].tagEnd != null && this.matches[this.i].tagEnd != "" || this.isSelfClosingTag(tagLC);
		var elem = this.newElement(tag,htmlparser_HtmlParser.parseAttrs(attrs));
		var closeTagLC = "";
		if(!isWithClose) {
			this.i++;
			openedTagsLC.push(tagLC);
			var m = this.processMatches(openedTagsLC);
			var _g = 0;
			var _g1 = m.nodes;
			while(_g < _g1.length) {
				var node = _g1[_g];
				++_g;
				elem.addChild(node);
			}
			openedTagsLC.pop();
			closeTagLC = m.closeTagLC != tagLC ? m.closeTagLC : "";
			if(this.i < this.matches.length || !this.tolerant) {
				if(this.matches[this.i].close == null || this.matches[this.i].close == "" || this.matches[this.i].tagCloseLC != tagLC) {
					if(!this.tolerant) {
						throw haxe_Exception.thrown(new htmlparser_HtmlParserException("Tag <" + tag + "> not closed.",this.getPosition(this.i)));
					} else {
						closeTagLC = this.matches[this.i].tagCloseLC;
					}
				}
			}
		}
		return { element : elem, closeTagLC : closeTagLC};
	}
	,isSelfClosingTag: function(tag) {
		return Object.prototype.hasOwnProperty.call(htmlparser_HtmlParser.SELF_CLOSING_TAGS_HTML,tag);
	}
	,newElement: function(name,attributes) {
		return new htmlparser_HtmlNodeElement(name,attributes);
	}
	,getPosition: function(matchIndex) {
		var m = this.matches[matchIndex];
		var line = 1;
		var lastNewLinePos = -1;
		var i = 0;
		while(i < m.allPos) {
			var chars = i + 1 < this.str.length ? this.str.substring(i,i + 2) : this.str.charAt(i);
			if(chars == "\r\n") {
				i += 2;
				lastNewLinePos = i;
				++line;
			} else if(chars.charAt(0) == "\n" || chars.charAt(0) == "\r") {
				++i;
				lastNewLinePos = i;
				++line;
			} else {
				++i;
			}
		}
		return { line : line, column : m.allPos - lastNewLinePos, length : m.all.length};
	}
	,__class__: htmlparser_HtmlParser
};
var htmlparser_HtmlParserException = function(message,pos) {
	this.message = message;
	this.line = pos.line;
	this.column = pos.column;
	this.length = pos.length;
};
htmlparser_HtmlParserException.__name__ = true;
htmlparser_HtmlParserException.prototype = {
	toString: function() {
		return "Parse error at " + this.line + ":" + this.column + ". " + this.message;
	}
	,__class__: htmlparser_HtmlParserException
};
var htmlparser_HtmlTools = function() { };
htmlparser_HtmlTools.__name__ = true;
htmlparser_HtmlTools.get_htmlUnescapeMap = function() {
	if(htmlparser_HtmlTools.htmlUnescapeMap == null) {
		var _g = new haxe_ds_StringMap();
		_g.h["nbsp"] = " ";
		_g.h["amp"] = "&";
		_g.h["lt"] = "<";
		_g.h["gt"] = ">";
		_g.h["quot"] = "\"";
		_g.h["apos"] = "'";
		_g.h["euro"] = "€";
		_g.h["iexcl"] = "¡";
		_g.h["cent"] = "¢";
		_g.h["pound"] = "£";
		_g.h["curren"] = "¤";
		_g.h["yen"] = "¥";
		_g.h["brvbar"] = "¦";
		_g.h["sect"] = "§";
		_g.h["uml"] = "¨";
		_g.h["copy"] = "©";
		_g.h["ordf"] = "ª";
		_g.h["not"] = "¬";
		_g.h["shy"] = "­";
		_g.h["reg"] = "®";
		_g.h["macr"] = "¯";
		_g.h["deg"] = "°";
		_g.h["plusmn"] = "±";
		_g.h["sup2"] = "²";
		_g.h["sup3"] = "³";
		_g.h["acute"] = "´";
		_g.h["micro"] = "µ";
		_g.h["para"] = "¶";
		_g.h["middot"] = "·";
		_g.h["cedil"] = "¸";
		_g.h["sup1"] = "¹";
		_g.h["ordm"] = "º";
		_g.h["raquo"] = "»";
		_g.h["frac14"] = "¼";
		_g.h["frac12"] = "½";
		_g.h["frac34"] = "¾";
		_g.h["iquest"] = "¿";
		_g.h["Agrave"] = "À";
		_g.h["Aacute"] = "Á";
		_g.h["Acirc"] = "Â";
		_g.h["Atilde"] = "Ã";
		_g.h["Auml"] = "Ä";
		_g.h["Aring"] = "Å";
		_g.h["AElig"] = "Æ";
		_g.h["Ccedil"] = "Ç";
		_g.h["Egrave"] = "È";
		_g.h["Eacute"] = "É";
		_g.h["Ecirc"] = "Ê";
		_g.h["Euml"] = "Ë";
		_g.h["Igrave"] = "Ì";
		_g.h["Iacute"] = "Í";
		_g.h["Icirc"] = "Î";
		_g.h["Iuml"] = "Ï";
		_g.h["ETH"] = "Ð";
		_g.h["Ntilde"] = "Ñ";
		_g.h["Ograve"] = "Ò";
		_g.h["Oacute"] = "Ó";
		_g.h["Ocirc"] = "Ô";
		_g.h["Otilde"] = "Õ";
		_g.h["Ouml"] = "Ö";
		_g.h["times"] = "×";
		_g.h["Oslash"] = "Ø";
		_g.h["Ugrave"] = "Ù";
		_g.h["Uacute"] = "Ú";
		_g.h["Ucirc"] = "Û";
		_g.h["Uuml"] = "Ü";
		_g.h["Yacute"] = "Ý";
		_g.h["THORN"] = "Þ";
		_g.h["szlig"] = "ß";
		_g.h["agrave"] = "à";
		_g.h["aacute"] = "á";
		_g.h["acirc"] = "â";
		_g.h["atilde"] = "ã";
		_g.h["auml"] = "ä";
		_g.h["aring"] = "å";
		_g.h["aelig"] = "æ";
		_g.h["ccedil"] = "ç";
		_g.h["egrave"] = "è";
		_g.h["eacute"] = "é";
		_g.h["ecirc"] = "ê";
		_g.h["euml"] = "ë";
		_g.h["igrave"] = "ì";
		_g.h["iacute"] = "í";
		_g.h["icirc"] = "î";
		_g.h["iuml"] = "ï";
		_g.h["eth"] = "ð";
		_g.h["ntilde"] = "ñ";
		_g.h["ograve"] = "ò";
		_g.h["oacute"] = "ó";
		_g.h["ocirc"] = "ô";
		_g.h["otilde"] = "õ";
		_g.h["ouml"] = "ö";
		_g.h["divide"] = "÷";
		_g.h["oslash"] = "ø";
		_g.h["ugrave"] = "ù";
		_g.h["uacute"] = "ú";
		_g.h["ucirc"] = "û";
		_g.h["uuml"] = "ü";
		_g.h["yacute"] = "ý";
		_g.h["thorn"] = "þ";
		htmlparser_HtmlTools.htmlUnescapeMap = _g;
	}
	return htmlparser_HtmlTools.htmlUnescapeMap;
};
htmlparser_HtmlTools.escape = function(text,chars) {
	if(chars == null) {
		chars = "";
	}
	var r = text.split("&").join("&amp;");
	r = r.split("<").join("&lt;");
	r = r.split(">").join("&gt;");
	if(chars.indexOf("\"") >= 0) {
		r = r.split("\"").join("&quot;");
	}
	if(chars.indexOf("'") >= 0) {
		r = r.split("'").join("&apos;");
	}
	if(chars.indexOf(" ") >= 0) {
		r = r.split(" ").join("&nbsp;");
	}
	if(chars.indexOf("\n") >= 0) {
		r = r.split("\n").join("&#xA;");
	}
	if(chars.indexOf("\r") >= 0) {
		r = r.split("\r").join("&#xD;");
	}
	return r;
};
htmlparser_HtmlTools.unescape = function(text) {
	return new EReg("[<]!\\[CDATA\\[((?:.|[\r\n])*?)\\]\\][>]|&[^;]+;","g").map(text,function(re) {
		var s = re.matched(0);
		if(s.charAt(0) == "&") {
			if(s.charAt(1) == "#") {
				var numbers = s.substring(2,s.length - 1);
				if(numbers.charAt(0) == "x") {
					numbers = "0" + numbers;
				}
				var code = Std.parseInt(numbers);
				if(code != null && code != 0) {
					return String.fromCodePoint(code);
				} else {
					return s;
				}
			} else {
				var r = htmlparser_HtmlTools.get_htmlUnescapeMap().h[s.substring(1,s.length - 1)];
				if(r != null) {
					return r;
				} else {
					return s;
				}
			}
		}
		return re.matched(1);
	});
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var urals_IdMatchHelper = function() { };
urals_IdMatchHelper.__name__ = true;
urals_IdMatchHelper.isIdMatch = function(s) {
	return new EReg("[a-zA-Z_\\-]+[a-zA-Z_0-9\\-]*","").match(s);
};
urals_IdMatchHelper.assertIdMatch = function(s) {
	if(urals_IdMatchHelper.isIdMatch(s) == false) {
		throw new haxe_Exception("String " + s + " is not may be valid htmlId");
	}
};
urals_IdMatchHelper.isContainsPrefix = function(s,pref) {
	return s.indexOf(pref) == 0;
};
urals_IdMatchHelper.assertContainsPrefix = function(s,pref) {
	if(urals_IdMatchHelper.isContainsPrefix(s,pref) == false) {
		throw new haxe_Exception("String " + s + " is not contains prefix " + pref);
	}
};
urals_IdMatchHelper.removePrefix = function(s,pref) {
	urals_IdMatchHelper.assertContainsPrefix(s,pref);
	return HxOverrides.substr(s,pref.length,null);
};
var urals_IdRendererInterface = function() { };
urals_IdRendererInterface.__name__ = true;
urals_IdRendererInterface.__isInterface__ = true;
urals_IdRendererInterface.prototype = {
	__class__: urals_IdRendererInterface
};
var urals_IntIdRenderer = function(pref) {
	if(pref == null) {
		pref = "";
	}
	urals_IdMatchHelper.assertIdMatch(pref);
	this.pref = pref;
};
urals_IntIdRenderer.__name__ = true;
urals_IntIdRenderer.__interfaces__ = [urals_IdRendererInterface];
urals_IntIdRenderer.prototype = {
	renderId: function(id) {
		return this.pref + (id == null ? "null" : "" + id);
	}
	,parseId: function(id) {
		return Std.parseInt(urals_IdMatchHelper.removePrefix(id,this.pref));
	}
	,__class__: urals_IntIdRenderer
};
var urals_storage_ReactiveStorageInterface = function() { };
urals_storage_ReactiveStorageInterface.__name__ = true;
urals_storage_ReactiveStorageInterface.__isInterface__ = true;
urals_storage_ReactiveStorageInterface.prototype = {
	__class__: urals_storage_ReactiveStorageInterface
};
var urals_storage_BasicStorageInterface = function() { };
urals_storage_BasicStorageInterface.__name__ = true;
urals_storage_BasicStorageInterface.__isInterface__ = true;
urals_storage_BasicStorageInterface.prototype = {
	__class__: urals_storage_BasicStorageInterface
};
var urals_storage_BasicReactiveStorage = function(setId,onSetTrigger,onReadTrigger) {
	this.els = [];
	this.onReadTrigger = null;
	this.onChangeTrigger = null;
	this.setId = null;
	this.onChangeTrigger = onSetTrigger;
	this.onReadTrigger = onReadTrigger;
	this.setId = setId;
};
urals_storage_BasicReactiveStorage.__name__ = true;
urals_storage_BasicReactiveStorage.__interfaces__ = [urals_storage_ReactiveStorageInterface,urals_storage_BasicStorageInterface];
urals_storage_BasicReactiveStorage.prototype = {
	readAll: function() {
		var result = this.els;
		this.triggerOnRead();
		return result;
	}
	,reInit: function(data) {
		this.els = [];
		this.els = this.setId(data,[]);
		this.triggerOnChange();
	}
	,triggerOnChange: function() {
		if(this.onChangeTrigger != null) {
			this.onChangeTrigger(this.els);
		}
	}
	,triggerOnRead: function() {
		if(this.onReadTrigger != null) {
			this.onReadTrigger(this.els);
		}
	}
	,__class__: urals_storage_BasicReactiveStorage
};
function urals_storage_IdGenFunctions_genIntId(newData,keepedData) {
	var maxId = Lambda.fold(keepedData,function(id,maxId) {
		if(maxId > id) {
			return maxId;
		} else {
			return id;
		}
	},0);
	return Lambda.fold(newData,function(el,m) {
		return m.concat([{ id : m.length + maxId + 1, val : el}]);
	},[]);
}
function urals_storage_IdGenFunctions_genUuidId(newData,keepedData) {
	return Lambda.fold(newData,function(el,m) {
		return m.concat([{ id : uuid_Uuid.v4(), val : el}]);
	},[]);
}
var urals_web_HtmlInjectorInterface = function() { };
urals_web_HtmlInjectorInterface.__name__ = true;
urals_web_HtmlInjectorInterface.__isInterface__ = true;
urals_web_HtmlInjectorInterface.prototype = {
	__class__: urals_web_HtmlInjectorInterface
};
var urals_web_BrowserHtmlInjector = function(elem) {
	this.parentNode = elem == null ? window.document.body : elem;
};
urals_web_BrowserHtmlInjector.__name__ = true;
urals_web_BrowserHtmlInjector.__interfaces__ = [urals_web_HtmlInjectorInterface];
urals_web_BrowserHtmlInjector.prototype = {
	append: function(targetSelector,elemHtml,onlyFirst) {
		if(onlyFirst == null) {
			onlyFirst = false;
		}
		var roots;
		if(onlyFirst == false) {
			var _g = [];
			var _g1 = 0;
			var _g2 = this.parentNode.querySelectorAll(targetSelector);
			while(_g1 < _g2.length) {
				var node = _g2[_g1];
				++_g1;
				_g.push(js_Boot.__cast(node , HTMLElement));
			}
			roots = _g;
		} else {
			roots = [this.parentNode.querySelector(targetSelector)];
		}
		var _g = 0;
		var _g1 = roots.length;
		while(_g < _g1) {
			var i = _g++;
			var newElem = window.document.createElement("div");
			roots[i].append(newElem);
			newElem.outerHTML = elemHtml;
		}
		return this;
	}
	,prepend: function(targetSelector,elemHtml,onlyFirst) {
		if(onlyFirst == null) {
			onlyFirst = false;
		}
		var roots;
		if(onlyFirst == false) {
			var _g = [];
			var _g1 = 0;
			var _g2 = this.parentNode.querySelectorAll(targetSelector);
			while(_g1 < _g2.length) {
				var node = _g2[_g1];
				++_g1;
				_g.push(js_Boot.__cast(node , HTMLElement));
			}
			roots = _g;
		} else {
			roots = [this.parentNode.querySelector(targetSelector)];
		}
		var _g = 0;
		var _g1 = roots.length;
		while(_g < _g1) {
			var i = _g++;
			var newElem = window.document.createElement("div");
			roots[i].prepend(newElem);
			newElem.outerHTML = elemHtml;
		}
		return this;
	}
	,replaceInnerhtml: function(targetSelector,elemHtml,onlyFirst) {
		if(onlyFirst == null) {
			onlyFirst = false;
		}
		var roots;
		if(onlyFirst == false) {
			var _g = [];
			var _g1 = 0;
			var _g2 = this.parentNode.querySelectorAll(targetSelector);
			while(_g1 < _g2.length) {
				var node = _g2[_g1];
				++_g1;
				_g.push(js_Boot.__cast(node , HTMLElement));
			}
			roots = _g;
		} else {
			roots = [this.parentNode.querySelector(targetSelector)];
		}
		var _g = 0;
		var _g1 = roots.length;
		while(_g < _g1) {
			var i = _g++;
			var newElem = window.document.createElement("div");
			roots[i].innerHTML = elemHtml;
		}
		return this;
	}
	,__class__: urals_web_BrowserHtmlInjector
};
function urals_web_BrowserRenderer_browserRender(elements,getRootSelector,renderBundle,afterRender) {
	var doc = window.document;
	var group = urals_web_StaticRenderer_groupBySelector(elements,getRootSelector);
	var _g = 0;
	var _g1 = group.length;
	while(_g < _g1) {
		var i = _g++;
		var el = doc.querySelector(group[i].assoc);
		if(el != null) {
			var _this = group[i].arrs;
			var result = new Array(_this.length);
			var _g2 = 0;
			var _g3 = _this.length;
			while(_g2 < _g3) {
				var i1 = _g2++;
				var el1 = _this[i1];
				result[i1] = renderBundle.template(el1.val,el1.id);
			}
			el.innerHTML = result.join("\n");
		}
	}
	window.setTimeout(function() {
		var _g = 0;
		var _g1 = elements.length;
		while(_g < _g1) {
			var i = _g++;
			var elHtml = doc.querySelector("#" + renderBundle.renderId(elements[i].id));
			if(elHtml != null) {
				afterRender(elHtml,elements[i]);
			}
		}
	},10);
}
var urals_web_StaticHtmlInjector = function(htmlDoc) {
	this.htmlDoc = new htmlparser_HtmlDocument(htmlDoc);
};
urals_web_StaticHtmlInjector.__name__ = true;
urals_web_StaticHtmlInjector.__interfaces__ = [urals_web_HtmlInjectorInterface];
urals_web_StaticHtmlInjector.prototype = {
	append: function(targetSelector,elemHtml,onlyFirst) {
		if(onlyFirst == null) {
			onlyFirst = false;
		}
		var roots = this.htmlDoc.find(targetSelector);
		if(roots.length == 0) {
			return this;
		}
		if(onlyFirst == true) {
			roots = [roots[0]];
		}
		var _g = 0;
		var _g1 = roots.length;
		while(_g < _g1) {
			var i = _g++;
			var tmp = roots[i].get_innerHTML() + elemHtml;
			roots[i].fastSetInnerHTML(tmp);
		}
		return this;
	}
	,prepend: function(targetSelector,elemHtml,onlyFirst) {
		if(onlyFirst == null) {
			onlyFirst = false;
		}
		var roots = this.htmlDoc.find(targetSelector);
		if(roots.length == 0) {
			return this;
		}
		if(onlyFirst == true) {
			roots = [roots[0]];
		}
		var _g = 0;
		var _g1 = roots.length;
		while(_g < _g1) {
			var i = _g++;
			var tmp = elemHtml + roots[i].get_innerHTML();
			roots[i].fastSetInnerHTML(tmp);
		}
		return this;
	}
	,replaceInnerhtml: function(targetSelector,elemHtml,onlyFirst) {
		if(onlyFirst == null) {
			onlyFirst = false;
		}
		var roots = this.htmlDoc.find(targetSelector);
		if(roots.length == 0) {
			return this;
		}
		if(onlyFirst == true) {
			roots = [roots[0]];
		}
		var _g = 0;
		var _g1 = roots.length;
		while(_g < _g1) {
			var i = _g++;
			roots[i].fastSetInnerHTML(elemHtml);
		}
		return this;
	}
	,getResult: function() {
		return this.htmlDoc.toString();
	}
	,__class__: urals_web_StaticHtmlInjector
};
function urals_web_StaticRenderer_groupBySelector(arr,selector) {
	var result = [];
	var _g = 0;
	var _g1 = arr.length;
	while(_g < _g1) {
		var i = _g++;
		var t = selector(arr[i]);
		var _g2 = [];
		var _g3 = 0;
		var _g4 = result;
		while(_g3 < _g4.length) {
			var v = _g4[_g3];
			++_g3;
			if(v.assoc == t) {
				_g2.push(v);
			}
		}
		if(_g2.length == 0) {
			result.push({ assoc : t, arrs : []});
		}
		var result1 = new Array(result.length);
		var _g5 = 0;
		var _g6 = result.length;
		while(_g5 < _g6) {
			var i1 = _g5++;
			var el = result[i1];
			result1[i1] = el.assoc == t ? { assoc : t, arrs : el.arrs.concat([arr[i]])} : el;
		}
		result = result1;
	}
	return result;
}
function urals_web_StaticRenderer_staticRender(elements,getRootSelector,renderBundle,template) {
	var renderEl = function(el) {
		return renderBundle.template(el.val,el.id);
	};
	var groupedElements = urals_web_StaticRenderer_groupBySelector(elements,getRootSelector);
	var result = new Array(groupedElements.length);
	var _g = 0;
	var _g1 = groupedElements.length;
	while(_g < _g1) {
		var i = _g++;
		var el = groupedElements[i];
		var el1 = el.assoc;
		var _this = el.arrs;
		var f = renderEl;
		var result1 = new Array(_this.length);
		var _g2 = 0;
		var _g3 = _this.length;
		while(_g2 < _g3) {
			var i1 = _g2++;
			result1[i1] = f(_this[i1]);
		}
		result[i] = { sel : el1, arr : result1};
	}
	var groupedWidgets = result;
	var injector = new urals_web_StaticHtmlInjector(template);
	var _g = 0;
	var _g1 = groupedWidgets.length;
	while(_g < _g1) {
		var s = _g++;
		var injector1 = injector.replaceInnerhtml(groupedWidgets[s].sel,groupedWidgets[s].arr.join("\n"));
	}
	return injector.getResult();
}
var uuid_Uuid = function() { };
uuid_Uuid.__name__ = true;
uuid_Uuid.splitmix64_seed = function(index) {
	var b_high = -1640531527;
	var b_low = 2135587861;
	var high = index.high + b_high | 0;
	var low = index.low + b_low | 0;
	if(haxe_Int32.ucompare(low,index.low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var this1 = new haxe__$Int64__$_$_$Int64(high,low);
	var result = this1;
	var b = 30;
	b &= 63;
	var b1;
	if(b == 0) {
		var this1 = new haxe__$Int64__$_$_$Int64(result.high,result.low);
		b1 = this1;
	} else if(b < 32) {
		var this1 = new haxe__$Int64__$_$_$Int64(result.high >> b,result.high << 32 - b | result.low >>> b);
		b1 = this1;
	} else {
		var this1 = new haxe__$Int64__$_$_$Int64(result.high >> 31,result.high >> b - 32);
		b1 = this1;
	}
	var a_high = result.high ^ b1.high;
	var a_low = result.low ^ b1.low;
	var b_high = -1084733587;
	var b_low = 484763065;
	var mask = 65535;
	var al = a_low & mask;
	var ah = a_low >>> 16;
	var bl = b_low & mask;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var p11 = haxe_Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = low + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		var ret = high++;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a_low,b_high) + haxe_Int32._mul(a_high,b_low) | 0) | 0;
	var this1 = new haxe__$Int64__$_$_$Int64(high,low);
	result = this1;
	var b = 27;
	b &= 63;
	var b1;
	if(b == 0) {
		var this1 = new haxe__$Int64__$_$_$Int64(result.high,result.low);
		b1 = this1;
	} else if(b < 32) {
		var this1 = new haxe__$Int64__$_$_$Int64(result.high >> b,result.high << 32 - b | result.low >>> b);
		b1 = this1;
	} else {
		var this1 = new haxe__$Int64__$_$_$Int64(result.high >> 31,result.high >> b - 32);
		b1 = this1;
	}
	var a_high = result.high ^ b1.high;
	var a_low = result.low ^ b1.low;
	var b_high = -1798288965;
	var b_low = 321982955;
	var mask = 65535;
	var al = a_low & mask;
	var ah = a_low >>> 16;
	var bl = b_low & mask;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var p11 = haxe_Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = low + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		var ret = high++;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a_low,b_high) + haxe_Int32._mul(a_high,b_low) | 0) | 0;
	var this1 = new haxe__$Int64__$_$_$Int64(high,low);
	result = this1;
	var b = 31;
	b &= 63;
	var b1;
	if(b == 0) {
		var this1 = new haxe__$Int64__$_$_$Int64(result.high,result.low);
		b1 = this1;
	} else if(b < 32) {
		var this1 = new haxe__$Int64__$_$_$Int64(result.high >> b,result.high << 32 - b | result.low >>> b);
		b1 = this1;
	} else {
		var this1 = new haxe__$Int64__$_$_$Int64(result.high >> 31,result.high >> b - 32);
		b1 = this1;
	}
	var this1 = new haxe__$Int64__$_$_$Int64(result.high ^ b1.high,result.low ^ b1.low);
	return this1;
};
uuid_Uuid.randomFromRange = function(min,max) {
	var s1 = uuid_Uuid.state0;
	var s0 = uuid_Uuid.state1;
	uuid_Uuid.state0 = s0;
	var b = 23;
	b &= 63;
	var b1;
	if(b == 0) {
		var this1 = new haxe__$Int64__$_$_$Int64(s1.high,s1.low);
		b1 = this1;
	} else if(b < 32) {
		var this1 = new haxe__$Int64__$_$_$Int64(s1.high << b | s1.low >>> 32 - b,s1.low << b);
		b1 = this1;
	} else {
		var this1 = new haxe__$Int64__$_$_$Int64(s1.low << b - 32,0);
		b1 = this1;
	}
	var this1 = new haxe__$Int64__$_$_$Int64(s1.high ^ b1.high,s1.low ^ b1.low);
	s1 = this1;
	var a_high = s1.high ^ s0.high;
	var a_low = s1.low ^ s0.low;
	var b = 18;
	b &= 63;
	var b1;
	if(b == 0) {
		var this1 = new haxe__$Int64__$_$_$Int64(s1.high,s1.low);
		b1 = this1;
	} else if(b < 32) {
		var this1 = new haxe__$Int64__$_$_$Int64(s1.high >>> b,s1.high << 32 - b | s1.low >>> b);
		b1 = this1;
	} else {
		var this1 = new haxe__$Int64__$_$_$Int64(0,s1.high >>> b - 32);
		b1 = this1;
	}
	var a_high1 = a_high ^ b1.high;
	var a_low1 = a_low ^ b1.low;
	var b = 5;
	b &= 63;
	var b1;
	if(b == 0) {
		var this1 = new haxe__$Int64__$_$_$Int64(s0.high,s0.low);
		b1 = this1;
	} else if(b < 32) {
		var this1 = new haxe__$Int64__$_$_$Int64(s0.high >>> b,s0.high << 32 - b | s0.low >>> b);
		b1 = this1;
	} else {
		var this1 = new haxe__$Int64__$_$_$Int64(0,s0.high >>> b - 32);
		b1 = this1;
	}
	var this1 = new haxe__$Int64__$_$_$Int64(a_high1 ^ b1.high,a_low1 ^ b1.low);
	uuid_Uuid.state1 = this1;
	var a = uuid_Uuid.state1;
	var high = a.high + s0.high | 0;
	var low = a.low + s0.low | 0;
	if(haxe_Int32.ucompare(low,a.low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var this1 = new haxe__$Int64__$_$_$Int64(high,low);
	var x = max - min + 1;
	var this2 = new haxe__$Int64__$_$_$Int64(x >> 31,x);
	var result = haxe_Int64.divMod(this1,this2).modulus.low;
	if(result < 0) {
		result = -result;
	}
	return result + min;
};
uuid_Uuid.randomByte = function() {
	return uuid_Uuid.randomFromRange(0,255);
};
uuid_Uuid.fromShort = function(shortUuid,separator,fromAlphabet) {
	if(fromAlphabet == null) {
		fromAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(separator == null) {
		separator = "-";
	}
	var uuid = uuid_Uuid.convert(shortUuid,fromAlphabet,"0123456789abcdef");
	return uuid_Uuid.hexToUuid(uuid,separator);
};
uuid_Uuid.toShort = function(uuid,separator,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(separator == null) {
		separator = "-";
	}
	uuid = StringTools.replace(uuid,separator,"").toLowerCase();
	return uuid_Uuid.convert(uuid,"0123456789abcdef",toAlphabet);
};
uuid_Uuid.fromNano = function(nanoUuid,separator,fromAlphabet) {
	if(fromAlphabet == null) {
		fromAlphabet = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
	if(separator == null) {
		separator = "-";
	}
	var uuid = uuid_Uuid.convert(nanoUuid,fromAlphabet,"0123456789abcdef");
	return uuid_Uuid.hexToUuid(uuid,separator);
};
uuid_Uuid.toNano = function(uuid,separator,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
	if(separator == null) {
		separator = "-";
	}
	uuid = StringTools.replace(uuid,separator,"").toLowerCase();
	return uuid_Uuid.convert(uuid,"0123456789abcdef",toAlphabet);
};
uuid_Uuid.v1 = function(node,optClockSequence,msecs,optNsecs,randomFunc,separator,shortUuid,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(shortUuid == null) {
		shortUuid = false;
	}
	if(separator == null) {
		separator = "-";
	}
	if(optNsecs == null) {
		optNsecs = -1;
	}
	if(msecs == null) {
		msecs = -1;
	}
	if(optClockSequence == null) {
		optClockSequence = -1;
	}
	if(randomFunc == null) {
		randomFunc = uuid_Uuid.randomByte;
	}
	var buffer = new haxe_io_Bytes(new ArrayBuffer(16));
	if(node == null) {
		node = new haxe_io_Bytes(new ArrayBuffer(6));
		var v = randomFunc();
		node.b[0] = v;
		var v = randomFunc();
		node.b[1] = v;
		var v = randomFunc();
		node.b[2] = v;
		var v = randomFunc();
		node.b[3] = v;
		var v = randomFunc();
		node.b[4] = v;
		var v = randomFunc();
		node.b[5] = v;
		node.b[0] |= 1;
	}
	if(uuid_Uuid.clockSequenceBuffer == -1) {
		uuid_Uuid.clockSequenceBuffer = (randomFunc() << 8 | randomFunc()) & 16383;
	}
	var clockSeq = optClockSequence;
	if(optClockSequence == -1) {
		clockSeq = uuid_Uuid.clockSequenceBuffer;
	}
	if(msecs == -1) {
		msecs = Math.round(Date.now());
	}
	var nsecs = optNsecs;
	if(optNsecs == -1) {
		nsecs = uuid_Uuid.lastNSecs + 1;
	}
	var dt = msecs - uuid_Uuid.lastMSecs + (nsecs - uuid_Uuid.lastNSecs) / 10000;
	if(dt < 0 && optClockSequence == -1) {
		clockSeq = clockSeq + 1 & 16383;
	}
	if((dt < 0 || msecs > uuid_Uuid.lastMSecs) && optNsecs == -1) {
		nsecs = 0;
	}
	if(nsecs >= 10000) {
		throw haxe_Exception.thrown("Can't create more than 10M uuids/sec");
	}
	uuid_Uuid.lastMSecs = msecs;
	uuid_Uuid.lastNSecs = nsecs;
	uuid_Uuid.clockSequenceBuffer = clockSeq;
	msecs += 12219292800000;
	var imsecs = haxe_Int64Helper.fromFloat(msecs);
	var b_high = 0;
	var b_low = 268435455;
	var a_high = imsecs.high & b_high;
	var a_low = imsecs.low & b_low;
	var b_high = 0;
	var b_low = 10000;
	var mask = 65535;
	var al = a_low & mask;
	var ah = a_low >>> 16;
	var bl = b_low & mask;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var p11 = haxe_Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = low + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		var ret = high++;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a_low,b_high) + haxe_Int32._mul(a_high,b_low) | 0) | 0;
	var a_high = high;
	var a_low = low;
	var b_high = nsecs >> 31;
	var b_low = nsecs;
	var high = a_high + b_high | 0;
	var low = a_low + b_low | 0;
	if(haxe_Int32.ucompare(low,a_low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var this1 = new haxe__$Int64__$_$_$Int64(high,low);
	var tl = haxe_Int64.divMod(this1,uuid_Uuid.DVS).modulus.low;
	buffer.b[0] = tl >>> 24 & 255;
	buffer.b[1] = tl >>> 16 & 255;
	buffer.b[2] = tl >>> 8 & 255;
	buffer.b[3] = tl & 255;
	var a = haxe_Int64.divMod(imsecs,uuid_Uuid.DVS).quotient;
	var b_high = 0;
	var b_low = 10000;
	var mask = 65535;
	var al = a.low & mask;
	var ah = a.low >>> 16;
	var bl = b_low & mask;
	var bh = b_low >>> 16;
	var p00 = haxe_Int32._mul(al,bl);
	var p10 = haxe_Int32._mul(ah,bl);
	var p01 = haxe_Int32._mul(al,bh);
	var p11 = haxe_Int32._mul(ah,bh);
	var low = p00;
	var high = (p11 + (p01 >>> 16) | 0) + (p10 >>> 16) | 0;
	p01 <<= 16;
	low = low + p01 | 0;
	if(haxe_Int32.ucompare(low,p01) < 0) {
		var ret = high++;
		high = high | 0;
	}
	p10 <<= 16;
	low = low + p10 | 0;
	if(haxe_Int32.ucompare(low,p10) < 0) {
		var ret = high++;
		high = high | 0;
	}
	high = high + (haxe_Int32._mul(a.low,b_high) + haxe_Int32._mul(a.high,b_low) | 0) | 0;
	var a_high = high;
	var a_low = low;
	var b_high = 0;
	var b_low = 268435455;
	var this_high = a_high & b_high;
	var this_low = a_low & b_low;
	var tmh = this_low;
	buffer.b[4] = tmh >>> 8 & 255;
	buffer.b[5] = tmh & 255;
	buffer.b[6] = tmh >>> 24 & 15 | 16;
	buffer.b[7] = tmh >>> 16 & 255;
	buffer.b[8] = clockSeq >>> 8 | 128;
	buffer.b[9] = clockSeq & 255;
	buffer.b[10] = node.b[0];
	buffer.b[11] = node.b[1];
	buffer.b[12] = node.b[2];
	buffer.b[13] = node.b[3];
	buffer.b[14] = node.b[4];
	buffer.b[15] = node.b[5];
	var uuid = uuid_Uuid.stringify(buffer,separator);
	if(shortUuid) {
		uuid = uuid_Uuid.toShort(uuid,separator,toAlphabet);
	}
	return uuid;
};
uuid_Uuid.v3 = function(name,namespace,separator,shortUuid,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(shortUuid == null) {
		shortUuid = false;
	}
	if(separator == null) {
		separator = "-";
	}
	if(namespace == null) {
		namespace = "";
	}
	namespace = StringTools.replace(namespace,"-","");
	var buffer = haxe_crypto_Md5.make(haxe_io_Bytes.ofHex(namespace + haxe_io_Bytes.ofString(name).toHex()));
	buffer.b[6] = buffer.b[6] & 15 | 48;
	buffer.b[8] = buffer.b[8] & 63 | 128;
	var uuid = uuid_Uuid.stringify(buffer,separator);
	if(shortUuid) {
		uuid = uuid_Uuid.toShort(uuid,separator,toAlphabet);
	}
	return uuid;
};
uuid_Uuid.v4 = function(randBytes,randomFunc,separator,shortUuid,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(shortUuid == null) {
		shortUuid = false;
	}
	if(separator == null) {
		separator = "-";
	}
	if(randomFunc == null) {
		randomFunc = uuid_Uuid.randomByte;
	}
	var buffer = randBytes;
	if(buffer == null) {
		buffer = new haxe_io_Bytes(new ArrayBuffer(16));
		var v = randomFunc();
		buffer.b[0] = v;
		var v = randomFunc();
		buffer.b[1] = v;
		var v = randomFunc();
		buffer.b[2] = v;
		var v = randomFunc();
		buffer.b[3] = v;
		var v = randomFunc();
		buffer.b[4] = v;
		var v = randomFunc();
		buffer.b[5] = v;
		var v = randomFunc();
		buffer.b[6] = v;
		var v = randomFunc();
		buffer.b[7] = v;
		var v = randomFunc();
		buffer.b[8] = v;
		var v = randomFunc();
		buffer.b[9] = v;
		var v = randomFunc();
		buffer.b[10] = v;
		var v = randomFunc();
		buffer.b[11] = v;
		var v = randomFunc();
		buffer.b[12] = v;
		var v = randomFunc();
		buffer.b[13] = v;
		var v = randomFunc();
		buffer.b[14] = v;
		var v = randomFunc();
		buffer.b[15] = v;
	} else if(buffer.length < 16) {
		throw haxe_Exception.thrown("Random bytes should be at least 16 bytes");
	}
	buffer.b[6] = buffer.b[6] & 15 | 64;
	buffer.b[8] = buffer.b[8] & 63 | 128;
	var uuid = uuid_Uuid.stringify(buffer,separator);
	if(shortUuid) {
		uuid = uuid_Uuid.toShort(uuid,separator,toAlphabet);
	}
	return uuid;
};
uuid_Uuid.v5 = function(name,namespace,separator,shortUuid,toAlphabet) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	if(shortUuid == null) {
		shortUuid = false;
	}
	if(separator == null) {
		separator = "-";
	}
	if(namespace == null) {
		namespace = "";
	}
	namespace = StringTools.replace(namespace,"-","");
	var buffer = haxe_crypto_Sha1.make(haxe_io_Bytes.ofHex(namespace + haxe_io_Bytes.ofString(name).toHex()));
	buffer.b[6] = buffer.b[6] & 15 | 80;
	buffer.b[8] = buffer.b[8] & 63 | 128;
	var uuid = uuid_Uuid.stringify(buffer,separator);
	if(shortUuid) {
		uuid = uuid_Uuid.toShort(uuid,separator,toAlphabet);
	}
	return uuid;
};
uuid_Uuid.stringify = function(data,separator) {
	if(separator == null) {
		separator = "-";
	}
	return uuid_Uuid.hexToUuid(data.toHex(),separator);
};
uuid_Uuid.parse = function(uuid,separator) {
	if(separator == null) {
		separator = "-";
	}
	return haxe_io_Bytes.ofHex(StringTools.replace(uuid,separator,""));
};
uuid_Uuid.validate = function(uuid,separator) {
	if(separator == null) {
		separator = "-";
	}
	if(separator == "") {
		uuid = HxOverrides.substr(uuid,0,8) + "-" + HxOverrides.substr(uuid,8,4) + "-" + HxOverrides.substr(uuid,12,4) + "-" + HxOverrides.substr(uuid,16,4) + "-" + HxOverrides.substr(uuid,20,12);
	} else if(separator != "-") {
		uuid = StringTools.replace(uuid,separator,"-");
	}
	return uuid_Uuid.regexp.match(uuid);
};
uuid_Uuid.version = function(uuid,separator) {
	if(separator == null) {
		separator = "-";
	}
	uuid = StringTools.replace(uuid,separator,"");
	return Std.parseInt("0x" + HxOverrides.substr(uuid,12,1));
};
uuid_Uuid.hexToUuid = function(hex,separator) {
	return HxOverrides.substr(hex,0,8) + separator + HxOverrides.substr(hex,8,4) + separator + HxOverrides.substr(hex,12,4) + separator + HxOverrides.substr(hex,16,4) + separator + HxOverrides.substr(hex,20,12);
};
uuid_Uuid.convert = function(number,fromAlphabet,toAlphabet) {
	var fromBase = fromAlphabet.length;
	var toBase = toAlphabet.length;
	var len = number.length;
	var buf = "";
	var this1 = new Array(len);
	var numberMap = this1;
	var divide = 0;
	var newlen = 0;
	var _g = 0;
	var _g1 = len;
	while(_g < _g1) {
		var i = _g++;
		numberMap[i] = fromAlphabet.indexOf(number.charAt(i));
	}
	while(true) {
		divide = 0;
		newlen = 0;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			divide = divide * fromBase + numberMap[i];
			if(divide >= toBase) {
				numberMap[newlen++] = Math.floor(divide / toBase);
				divide %= toBase;
			} else if(newlen > 0) {
				numberMap[newlen++] = 0;
			}
		}
		len = newlen;
		buf = toAlphabet.charAt(divide) + buf;
		if(!(newlen != 0)) {
			break;
		}
	}
	return buf;
};
uuid_Uuid.nanoId = function(len,alphabet,randomFunc) {
	if(alphabet == null) {
		alphabet = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
	if(len == null) {
		len = 21;
	}
	if(randomFunc == null) {
		randomFunc = uuid_Uuid.randomByte;
	}
	if(alphabet == null) {
		throw haxe_Exception.thrown("Alphabet cannot be null");
	}
	if(alphabet.length == 0 || alphabet.length >= 256) {
		throw haxe_Exception.thrown("Alphabet must contain between 1 and 255 symbols");
	}
	if(len <= 0) {
		throw haxe_Exception.thrown("Length must be greater than zero");
	}
	var mask = (2 << Math.floor(Math.log(alphabet.length - 1) / Math.log(2))) - 1;
	var step = Math.ceil(1.6 * mask * len / alphabet.length);
	var sb_b = "";
	while(sb_b.length != len) {
		var _g = 0;
		var _g1 = step;
		while(_g < _g1) {
			var i = _g++;
			var rnd = randomFunc();
			var aIndex = rnd & mask;
			if(aIndex < alphabet.length) {
				sb_b += Std.string(alphabet.charAt(aIndex));
				if(sb_b.length == len) {
					break;
				}
			}
		}
	}
	return sb_b;
};
uuid_Uuid.short = function(toAlphabet,randomFunc) {
	if(toAlphabet == null) {
		toAlphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
	}
	return uuid_Uuid.v4(null,randomFunc,null,true,toAlphabet);
};
function widgets_TodoElemWidget_todoElemWidgetFactory(className,renderId) {
	return { renderBundle : { template : function(m,id) {
		return "\r\n                <div class=\"" + className + "\" \r\n                     id=\"" + renderId(id) + "\">\r\n                    <input type=\"checkbox\"" + (m.isChecked == true ? " checked" : "") + ">\r\n                    <div" + (m.isChecked == true ? " style=\"text-decoration: line-through;\"" : "") + ">\r\n                        " + m.header + "\r\n                    </div>\r\n                </div>";
	}, renderId : renderId}, css : "." + className + " {display: grid; grid-template-columns: 30px 1fr; grid-gap: 10px;}", className : className, adv : { setOnChangeFunction : function(elemHtml,elem,stor) {
		elemHtml.querySelector("input").onchange = function(event) {
			var elems = stor.readAll();
			var result = new Array(elems.length);
			var _g = 0;
			var _g1 = elems.length;
			while(_g < _g1) {
				var i = _g++;
				var el = elems[i];
				result[i] = el.id == elem.id ? { id : elem.id, val : { isChecked : !elem.val.isChecked, header : elem.val.header}} : el;
			}
			elems = result;
			var stor1 = stor;
			var result = new Array(elems.length);
			var _g = 0;
			var _g1 = elems.length;
			while(_g < _g1) {
				var i = _g++;
				result[i] = elems[i].val;
			}
			stor1.reInit(result);
		};
	}}};
}
function widgets_TodoPageWidget_todoPageWidgetFactory(className) {
	return { renderBundle : { template : function(m,id) {
		return "\r\n            <div class=\"" + className + "\" id=\"todoPage\">\r\n                <h1>Todo app</h1>\r\n                <div class=\"" + className + "-container\">\r\n                </div>\r\n            </div>";
	}, renderId : function(id) {
		return "todoPage";
	}}, css : "\r\n        ." + className + " > h1 {padding: 0; margin: 0;}\r\n        ." + className + " {display: grid; grid-gap: 20px;}\r\n        ." + className + "-container {display: grid; grid-gap: 10px;}", className : className, adv : { containerClass : className + "-container"}};
}
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
TodoFrontendApp.pageModels = [{ id : 1, val : { }}];
haxe_Int32._mul = Math.imul != null ? Math.imul : function(a,b) {
	return a * (b & 65535) + (a * (b >>> 16) << 16 | 0) | 0;
};
htmlparser_CssSelector.reID = "[a-z](?:-?[_a-z0-9])*";
htmlparser_CssSelector.reNamespacedID = htmlparser_CssSelector.reID + "(?::" + htmlparser_CssSelector.reID + ")?";
htmlparser_CssSelector.reSelector = "(\\s*)((?:[>]\\s*)?)([.#]?)(" + htmlparser_CssSelector.reNamespacedID + "|[*])((?:\\[\\d+\\])?)";
htmlparser_HtmlParser.SELF_CLOSING_TAGS_HTML = { img : 1, br : 1, input : 1, meta : 1, link : 1, hr : 1, base : 1, embed : 1, spacer : 1, source : 1, param : 1};
htmlparser_HtmlParser.reID = "[a-z](?:-?[_a-z0-9])*";
htmlparser_HtmlParser.reNamespacedID = htmlparser_HtmlParser.reID + "(?::" + htmlparser_HtmlParser.reID + ")?";
htmlparser_HtmlParser.reCDATA = "[<]!\\[CDATA\\[[\\s\\S]*?\\]\\][>]";
htmlparser_HtmlParser.reScript = "[<]\\s*script\\s*([^>]*)>([\\s\\S]*?)<\\s*/\\s*script\\s*>";
htmlparser_HtmlParser.reStyle = "<\\s*style\\s*([^>]*)>([\\s\\S]*?)<\\s*/\\s*style\\s*>";
htmlparser_HtmlParser.reElementOpen = "<\\s*(" + htmlparser_HtmlParser.reNamespacedID + ")";
htmlparser_HtmlParser.reAttr = htmlparser_HtmlParser.reNamespacedID + "(?:\\s*=\\s*(?:'[^']*?'|\"[^\"]*?\"|[-_a-z0-9]+))?";
htmlparser_HtmlParser.reElementEnd = "(/)?\\s*>";
htmlparser_HtmlParser.reElementClose = "<\\s*/\\s*(" + htmlparser_HtmlParser.reNamespacedID + ")\\s*>";
htmlparser_HtmlParser.reComment = "<!--[\\s\\S]*?-->";
htmlparser_HtmlParser.reMain = new EReg("(" + htmlparser_HtmlParser.reCDATA + ")|(" + htmlparser_HtmlParser.reScript + ")|(" + htmlparser_HtmlParser.reStyle + ")|(" + htmlparser_HtmlParser.reElementOpen + "((?:\\s+" + htmlparser_HtmlParser.reAttr + ")*)\\s*" + htmlparser_HtmlParser.reElementEnd + ")|(" + htmlparser_HtmlParser.reElementClose + ")|(" + htmlparser_HtmlParser.reComment + ")","ig");
htmlparser_HtmlParser.reParseAttrs = new EReg("(" + htmlparser_HtmlParser.reNamespacedID + ")(?:\\s*=\\s*('[^']*'|\"[^\"]*\"|[-_a-z0-9]+))?","ig");
uuid_Uuid.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
uuid_Uuid.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
uuid_Uuid.ISO_OID = "6ba7b812-9dad-11d1-80b4-00c04fd430c8";
uuid_Uuid.X500_DN = "6ba7b814-9dad-11d1-80b4-00c04fd430c8";
uuid_Uuid.NIL = "00000000-0000-0000-0000-000000000000";
uuid_Uuid.LOWERCASE_BASE26 = "abcdefghijklmnopqrstuvwxyz";
uuid_Uuid.UPPERCASE_BASE26 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
uuid_Uuid.NO_LOOK_ALIKES_BASE51 = "2346789ABCDEFGHJKLMNPQRTUVWXYZabcdefghijkmnpqrtwxyz";
uuid_Uuid.FLICKR_BASE58 = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
uuid_Uuid.BASE_70 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-+!@#$^";
uuid_Uuid.BASE_85 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#";
uuid_Uuid.COOKIE_BASE90 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&'()*+-./:<=>?@[]^_`{|}~";
uuid_Uuid.NANO_ID_ALPHABET = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
uuid_Uuid.NUMBERS_BIN = "01";
uuid_Uuid.NUMBERS_OCT = "01234567";
uuid_Uuid.NUMBERS_DEC = "0123456789";
uuid_Uuid.NUMBERS_HEX = "0123456789abcdef";
uuid_Uuid.lastMSecs = 0;
uuid_Uuid.lastNSecs = 0;
uuid_Uuid.clockSequenceBuffer = -1;
uuid_Uuid.regexp = new EReg("^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$","i");
uuid_Uuid.rndSeed = haxe_Int64Helper.fromFloat(Date.now());
uuid_Uuid.state0 = uuid_Uuid.splitmix64_seed(uuid_Uuid.rndSeed);
uuid_Uuid.state1 = (function($this) {
	var $r;
	var a = uuid_Uuid.rndSeed;
	var x = Std.random(10000);
	var b_high = x >> 31;
	var b_low = x;
	var high = a.high + b_high | 0;
	var low = a.low + b_low | 0;
	if(haxe_Int32.ucompare(low,a.low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var a_high = high;
	var a_low = low;
	var b_high = 0;
	var b_low = 1;
	var high = a_high + b_high | 0;
	var low = a_low + b_low | 0;
	if(haxe_Int32.ucompare(low,a_low) < 0) {
		var ret = high++;
		high = high | 0;
	}
	var this1 = new haxe__$Int64__$_$_$Int64(high,low);
	$r = uuid_Uuid.splitmix64_seed(this1);
	return $r;
}(this));
uuid_Uuid.DVS = (function($this) {
	var $r;
	var this1 = new haxe__$Int64__$_$_$Int64(1,0);
	$r = this1;
	return $r;
}(this));
TodoFrontendApp.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
