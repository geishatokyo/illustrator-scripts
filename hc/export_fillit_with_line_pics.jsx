/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(1);
/**
 * 画面上にTextFrameItemを作って、実行ログを出力する
 */
var Logger = /** @class */ (function () {
    function Logger(layerName) {
        var layer;
        try {
            layer = app.activeDocument.layers.getByName(layerName);
            if (layer) {
                this.textItem = layer.pageItems.getByName("message");
            }
        }
        catch (err) {
        }
        if (!layer) {
            layer = app.activeDocument.layers.add();
            layer.name = layerName;
        }
        if (!this.textItem) {
            this.textItem = layer.textFrames.add();
            this.textItem.name = "message";
        }
        this.textItem.contents = "";
        this.textItem.textRange.characterAttributes.size = 15;
        this.textItem.textRange.characterAttributes.leading = 18;
        this.textItem.textRange.characterAttributes.autoLeading = false;
    }
    Logger.getDefault = function () {
        if (this._defaultLogger == null) {
            this._defaultLogger = new Logger("__log");
        }
        return this._defaultLogger;
    };
    Logger.prototype.log = function (log) {
        this.coloredLog(log, Utils_1.ColorPallete.black());
    };
    Logger.prototype.warn = function (log) {
        this.coloredLog("WARN: " + log, Utils_1.ColorPallete.yellow());
    };
    Logger.prototype.error = function (log) {
        this.coloredLog("ERROR: " + log, Utils_1.ColorPallete.red());
    };
    Logger.prototype.coloredLog = function (log, color) {
        var tr = this.textItem.characters.add(log + "\n");
        tr.characterAttributes.strokeColor = color;
    };
    return Logger;
}());
exports.Logger = Logger;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColorPallete = /** @class */ (function () {
    function ColorPallete() {
    }
    /**
     * 0 <= parameter <= 255
     * @param r
     * @param g
     * @param b
     */
    ColorPallete.rgb = function (r, g, b) {
        var color = new RGBColor();
        color.red = r;
        color.green = g;
        color.blue = b;
        return color;
    };
    /**
     *
     * @param sharpColor #ffffff
     */
    ColorPallete.rgbString = function (sharpColor) {
        if (sharpColor.charAt(0) == "#") {
            sharpColor = sharpColor.slice(1);
        }
        var r = parseInt(sharpColor.slice(0, 2), 16);
        var g = parseInt(sharpColor.slice(2, 4), 16);
        var b = parseInt(sharpColor.slice(4, 6), 16);
        return this.rgb(r, g, b);
    };
    ColorPallete.white = function () {
        return this.rgb(255, 255, 255);
    };
    ColorPallete.black = function () {
        return this.rgb(0, 0, 0);
    };
    ColorPallete.red = function () {
        return this.rgb(255, 0, 0);
    };
    ColorPallete.yellow = function () {
        return this.rgb(255, 255, 0);
    };
    ColorPallete.noColor = function () {
        return new NoColor();
    };
    return ColorPallete;
}());
exports.ColorPallete = ColorPallete;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*
	TODO
	1) Make a list with functionality that need to patch [done]
	2) Get "blueprints" of these methods [done]
	3) Rewrite methods with Photoshop javascript environment and "blueprints" licences in mind

	Function
	• Function.bind [done]

	Object
	• Object.defineProperty [done]
	• Object.getOwnPropertyDescriptor [done]
	• Object.defineProperties 	 [done]
	• Object.create			  	 [done]
	• Object.getOwnPropertyNames [done]
	• Object.getPrototypeOf		 [done]
	• Object.preventExtensions   [done]
	• Object.isExtensible		 [done]
	• Object.seal 				 [done]
	• Object.isSealed(obj)		 [done]
	• Object.freeze 			 [done]
	• Object.isFrozen(obj)		 [done]
	• Object.keys 				 [done]

	Array
	• Array.isArray					[done]
	• Array.prototype.indexOf 		[done]
	• Array.prototype.lastIndexOf	[done]
	• Array.prototype.every 		[done]
	• Array.prototype.some			[done]
	• Array.prototype.forEach		[done]
	• Array.prototype.map			[done]
	• Array.prototype.filter		[done]
	• Array.prototype.reduce 		[done]
	• Array.prototype.reduceRight	[done]


	String
	• String.prototype.trim	

	Other
	• console.log
	• window



	*/
	__webpack_require__(29)

	__webpack_require__(30)
	__webpack_require__(31)
	__webpack_require__(32)
	__webpack_require__(33)
	__webpack_require__(34)
	__webpack_require__(35)
	__webpack_require__(36)
	__webpack_require__(37)
	__webpack_require__(38)
	__webpack_require__(39)

	__webpack_require__(40)

	__webpack_require__(41);
	__webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(50);
	__webpack_require__(51);
	__webpack_require__(52);
	__webpack_require__(53);

/***/ },
/* 29 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	*/
	if (!String.prototype.trim) {
		// Вырезаем BOM и неразрывный пробел
		String.prototype.trim = function() {
			return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		};
	}

/***/ },
/* 30 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
	*/
	if (!Array.prototype.every) {
	  Array.prototype.every = function(callback, thisArg) {
	    var T, k;

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.every called on null or undefined');
	    }

	    // 1. Let O be the result of calling ToObject passing the this 
	    //    value as the argument.
	    var O = Object(this);

	    // 2. Let lenValue be the result of calling the Get internal method
	    //    of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;

	    // 4. If IsCallable(callback) is false, throw a TypeError exception.
	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	    T = (arguments.length > 1) ? thisArg : void 0;

	    // 6. Let k be 0.
	    k = 0;

	    // 7. Repeat, while k < len
	    while (k < len) {

	      var kValue;

	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the HasProperty internal 
	      //    method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      if (k in O) {

	        // i. Let kValue be the result of calling the Get internal method
	        //    of O with argument Pk.
	        kValue = O[k];

	        // ii. Let testResult be the result of calling the Call internal method
	        //     of callback with T as the this value and argument list 
	        //     containing kValue, k, and O.
	        var testResult = callback.call(T, kValue, k, O);

	        // iii. If ToBoolean(testResult) is false, return false.
	        if (!testResult) {
	          return false;
	        }
	      }
	      k++;
	    }
	    return true;
	  };
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	*/
	if (!Array.prototype.filter) {
	  Array.prototype.filter = function(callback, thisArg) {

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.filter called on null or undefined');
	    }

	    var t = Object(this);
	    var len = t.length >>> 0;

	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    var res = [];

	    var T = (arguments.length > 1) ? thisArg : void 0;
	    
	    for (var i = 0; i < len; i++) {
	      if (i in t) {
	        var val = t[i];

	        // NOTE: Technically this should Object.defineProperty at
	        //       the next index, as push can be affected by
	        //       properties on Object.prototype and Array.prototype.
	        //       But that method's new, and collisions should be
	        //       rare, so use the more-compatible alternative.
	        if (callback.call(T, val, i, t)) {
	          res.push(val);
	        }
	      }
	    }

	    return res;
	  };
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.18
	// Reference: http://es5.github.io/#x15.4.4.18
	if (!Array.prototype.forEach) {
	    Array.prototype.forEach = function(callback, thisArg) {


	        if (this === void 0 || this === null) {
	            throw new TypeError('Array.prototype.forEach called on null or undefined');
	        }

	        // 1. Let O be the result of calling toObject() passing the
	        // |this| value as the argument.
	        var O = Object(this);

	        // 2. Let lenValue be the result of calling the Get() internal
	        // method of O with the argument "length".
	        // 3. Let len be toUint32(lenValue).
	        var len = O.length >>> 0;

	        // 4. If isCallable(callback) is false, throw a TypeError exception. 
	        // See: http://es5.github.com/#x9.11
	        if (callback.__class__ !== 'Function') {
	            throw new TypeError(callback + ' is not a function');
	        }

	        // 5. If thisArg was supplied, let T be thisArg; else let
	        // T be undefined.
	        var T = (arguments.length > 1) ? thisArg : void 0;


	        // 6. Let k be 0
	        //k = 0;

	        // 7. Repeat, while k < len
	        for (var k = 0; k < len; k++) {
	            var kValue;
	            // a. Let Pk be ToString(k).
	            //    This is implicit for LHS operands of the in operator
	            // b. Let kPresent be the result of calling the HasProperty
	            //    internal method of O with argument Pk.
	            //    This step can be combined with c
	            // c. If kPresent is true, then
	            if (k in O) {
	                // i. Let kValue be the result of calling the Get internal
	                // method of O with argument Pk.
	                kValue = O[k];
	                // ii. Call the Call internal method of callback with T as
	                // the this value and argument list containing kValue, k, and O.
	                callback.call(T, kValue, k, O);
	            }
	        }
	        // 8. return undefined
	    }
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.14
	// Reference: http://es5.github.io/#x15.4.4.14
	if (!Array.prototype.indexOf) {
	  Array.prototype.indexOf = function(searchElement, fromIndex) {


	    // 1. Let o be the result of calling ToObject passing
	    //    the this value as the argument.
	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.indexOf called on null or undefined');
	    }

	    var k;
	    var o = Object(this);

	    // 2. Let lenValue be the result of calling the Get
	    //    internal method of o with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = o.length >>> 0;

	    // 4. If len is 0, return -1.
	    if (len === 0) {
	      return -1;
	    }

	    // 5. If argument fromIndex was passed let n be
	    //    ToInteger(fromIndex); else let n be 0.
	    var n = +fromIndex || 0;

	    if (Math.abs(n) === Infinity) {
	      n = 0;
	    }

	    // 6. If n >= len, return -1.
	    if (n >= len) {
	      return -1;
	    }

	    // 7. If n >= 0, then Let k be n.
	    // 8. Else, n<0, Let k be len - abs(n).
	    //    If k is less than 0, then let k be 0.
	    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

	    // 9. Repeat, while k < len
	    while (k < len) {
	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the
	      //    HasProperty internal method of o with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      //    i.  Let elementK be the result of calling the Get
	      //        internal method of o with the argument ToString(k).
	      //   ii.  Let same be the result of applying the
	      //        Strict Equality Comparison Algorithm to
	      //        searchElement and elementK.
	      //  iii.  If same is true, return k.
	      if (k in o && o[k] === searchElement) {
	        return k;
	      }
	      k++;
	    }
	    return -1;
	  };
	}

/***/ },
/* 34 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
	*/
	if (!Array.isArray) {
	  Array.isArray = function(arg) {

	    if (arg === void 0 || arg === null) {
	      return false;
	    }
	  	return (arg.__class__ === 'Array');
	  };
	}

/***/ },
/* 35 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.15
	// Reference: http://es5.github.io/#x15.4.4.15
	if (!Array.prototype.lastIndexOf) {
	  Array.prototype.lastIndexOf = function(searchElement, fromIndex) {

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.lastIndexOf called on null or undefined');
	    }

	    var n, k,
	      t = Object(this),
	      len = t.length >>> 0;
	    if (len === 0) {
	      return -1;
	    }

	    n = len - 1;
	    if (arguments.length > 1) {
	      n = Number(arguments[1]);
	      if (n != n) {
	        n = 0;
	      }
	      else if (n != 0 && n != Infinity && n != -Infinity) {
	        n = (n > 0 || -1) * Math.floor(Math.abs(n));
	      }
	    }

	    for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
	      if (k in t && t[k] === searchElement) {
	        return k;
	      }
	    }
	    return -1;
	  };
	}

/***/ },
/* 36 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.19
	// Reference: http://es5.github.io/#x15.4.4.19
	if (!Array.prototype.map) {

	  Array.prototype.map = function(callback, thisArg) {

	    var T, A, k;

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.map called on null or undefined');
	    }

	    // 1. Let O be the result of calling ToObject passing the |this| 
	    //    value as the argument.
	    var O = Object(this);

	    // 2. Let lenValue be the result of calling the Get internal 
	    //    method of O with the argument "length".
	    // 3. Let len be ToUint32(lenValue).
	    var len = O.length >>> 0;

	    // 4. If IsCallable(callback) is false, throw a TypeError exception.
	    // See: http://es5.github.com/#x9.11
	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
	    T = (arguments.length > 1) ? thisArg : void 0;

	    // 6. Let A be a new array created as if by the expression new Array(len) 
	    //    where Array is the standard built-in constructor with that name and 
	    //    len is the value of len.
	    A = new Array(len);

	    for (var k = 0; k < len; k++) {

	      var kValue, mappedValue;

	      // a. Let Pk be ToString(k).
	      //   This is implicit for LHS operands of the in operator
	      // b. Let kPresent be the result of calling the HasProperty internal 
	      //    method of O with argument Pk.
	      //   This step can be combined with c
	      // c. If kPresent is true, then
	      if (k in O) {

	        // i. Let kValue be the result of calling the Get internal 
	        //    method of O with argument Pk.
	        kValue = O[k];

	        // ii. Let mappedValue be the result of calling the Call internal 
	        //     method of callback with T as the this value and argument 
	        //     list containing kValue, k, and O.
	        mappedValue = callback.call(T, kValue, k, O);

	        // iii. Call the DefineOwnProperty internal method of A with arguments
	        // Pk, Property Descriptor
	        // { Value: mappedValue,
	        //   Writable: true,
	        //   Enumerable: true,
	        //   Configurable: true },
	        // and false.

	        // In browsers that support Object.defineProperty, use the following:
	        // Object.defineProperty(A, k, {
	        //   value: mappedValue,
	        //   writable: true,
	        //   enumerable: true,
	        //   configurable: true
	        // });

	        // For best browser support, use the following:
	        A[k] = mappedValue;
	      }
	    }
	    // 9. return A
	    return A;
	  };
	}

/***/ },
/* 37 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.21
	// Reference: http://es5.github.io/#x15.4.4.21
	if (!Array.prototype.reduce) {
	  Array.prototype.reduce = function(callback, initialValue) {

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.reduce called on null or undefined');
	    }

	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    var t = Object(this), len = t.length >>> 0, k = 0, value;

	    if (arguments.length > 1) 
	      {
	        value = initialValue;
	      } 
	    else 
	      {
	        while (k < len && !(k in t)) {
	          k++; 
	        }
	        if (k >= len) {
	          throw new TypeError('Reduce of empty array with no initial value');
	        }
	        value = t[k++];
	      }

	    for (; k < len; k++) {
	      if (k in t) {
	        value = callback(value, t[k], k, t);
	      }
	    }
	    return value;
	  };
	}

/***/ },
/* 38 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.22
	// Reference: http://es5.github.io/#x15.4.4.22
	if (!Array.prototype.reduceRight) {
	  Array.prototype.reduceRight = function(callback, initialValue) {

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.reduceRight called on null or undefined');
	    }

	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    var t = Object(this), len = t.length >>> 0, k = len - 1, value;
	    if (arguments.length > 1) 
	      {
	        value = initialValue;
	      } 
	    else 
	      {
	        while (k >= 0 && !(k in t)) {
	          k--;
	        }
	        if (k < 0) {
	          throw new TypeError('Reduce of empty array with no initial value');
	        }
	        value = t[k--];
	      }
	      
	    for (; k >= 0; k--) {
	      if (k in t) {
	        value = callback(value, t[k], k, t);
	      }
	    }
	    return value;
	  };
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
	*/
	// Production steps of ECMA-262, Edition 5, 15.4.4.17
	// Reference: http://es5.github.io/#x15.4.4.17
	if (!Array.prototype.some) {
	  Array.prototype.some = function(callback, thisArg) {

	    if (this === void 0 || this === null) {
	      throw new TypeError('Array.prototype.some called on null or undefined');
	    }

	    if (callback.__class__ !== 'Function') {
	      throw new TypeError(callback + ' is not a function');
	    }

	    var t = Object(this);
	    var len = t.length >>> 0;

	    var T = arguments.length > 1 ? thisArg : void 0;
	    for (var i = 0; i < len; i++) {
	      if (i in t && callback.call(T, t[i], i, t)) {
	        return true;
	      }
	    }

	    return false;
	  };
	}

/***/ },
/* 40 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill

	WARNING! Bound functions used as constructors NOT supported by this polyfill!
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Bound_functions_used_as_constructors
	*/
	if (!Function.prototype.bind) {
	  Function.prototype.bind = function(oThis) {
	    if (this.__class__ !== 'Function') {
	      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
	    }

	    var aArgs   = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP    = function() {},
	        fBound  = function() {
	          return fToBind.apply(this instanceof fNOP
	                 ? this
	                 : oThis,
	                 aArgs.concat(Array.prototype.slice.call(arguments)));
	        };

	    if (this.prototype) {
	      // Function.prototype doesn't have a prototype property
	      fNOP.prototype = this.prototype; 
	    }
	    fBound.prototype = new fNOP();

	    return fBound;
	  };
	}

/***/ },
/* 41 */
/***/ function(module, exports) {

	if (!Object.create) {
	  // Production steps of ECMA-262, Edition 5, 15.2.3.5
	  // Reference: http://es5.github.io/#x15.2.3.5
	  Object.create = (function() {
	    // To save on memory, use a shared constructor
	    function Temp() {}

	    // make a safe reference to Object.prototype.hasOwnProperty
	    var hasOwn = Object.prototype.hasOwnProperty;

	    return function(O) {
	      // 1. If Type(O) is not Object or Null throw a TypeError exception.
	      if (Object(O) !== O && O !== null) {
	        throw TypeError('Object prototype may only be an Object or null');
	      }

	      // 2. Let obj be the result of creating a new object as if by the
	      //    expression new Object() where Object is the standard built-in
	      //    constructor with that name
	      // 3. Set the [[Prototype]] internal property of obj to O.
	      Temp.prototype = O;
	      var obj = new Temp();
	      Temp.prototype = null; // Let's not keep a stray reference to O...

	      // 4. If the argument Properties is present and not undefined, add
	      //    own properties to obj as if by calling the standard built-in
	      //    function Object.defineProperties with arguments obj and
	      //    Properties.
	      if (arguments.length > 1) {
	        // Object.defineProperties does ToObject on its first argument.
	        var Properties = Object(arguments[1]);
	        for (var prop in Properties) {
	          if (hasOwn.call(Properties, prop)) {
	            var descriptor = Properties[prop];
	            if (Object(descriptor) !== descriptor) {
	              throw TypeError(prop + 'must be an object');
	            }
	            if ('get' in descriptor || 'set' in descriptor) {
	              throw new TypeError('getters & setters can not be defined on this javascript engine');
	            }
	            if ('value' in descriptor) {
	              obj[prop] = Properties[prop];
	            }

	          }
	        }
	      }

	      // 5. Return obj
	      return obj;
	    };
	  })();
	}

/***/ },
/* 42 */
/***/ function(module, exports) {

	/*
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties#Polyfill
	*/
	if (!Object.defineProperties) {

	  Object.defineProperties = function(object, props) {

	    function hasProperty(obj, prop) {
	      return Object.prototype.hasOwnProperty.call(obj, prop);
	    }

	    function convertToDescriptor(desc) {

	      if (Object(desc) !== desc) {
	        throw new TypeError('Descriptor can only be an Object.');
	      }


	      var d = {};

	      if (hasProperty(desc, "enumerable")) {
	        d.enumerable = !!desc.enumerable;
	      }

	      if (hasProperty(desc, "configurable")) {
	        d.configurable = !!desc.configurable;
	      }

	      if (hasProperty(desc, "value")) {
	        d.value = desc.value;
	      }

	      if (hasProperty(desc, "writable")) {
	        d.writable = !!desc.writable;
	      }

	      if (hasProperty(desc, "get")) {
	        throw new TypeError('getters & setters can not be defined on this javascript engine');
	      }

	      if (hasProperty(desc, "set")) {
	        throw new TypeError('getters & setters can not be defined on this javascript engine');
	      }

	      return d;
	    }

	    if (Object(object) !== object) {
	      throw new TypeError('Object.defineProperties can only be called on Objects.');
	    }

	    if (Object(props) !== props) {
	      throw new TypeError('Properties can only be an Object.');
	    }

	    var properties = Object(props);
	    for (propName in properties) {
	      if (hasOwnProperty.call(properties, propName)) {
	        var descr = convertToDescriptor(properties[propName]);
	        object[propName] = descr.value;
	      }
	    }
	    return object;
	  }
	}

/***/ },
/* 43 */
/***/ function(module, exports) {

	if (!Object.defineProperty) {

	    Object.defineProperty = function defineProperty(object, property, descriptor) {

	        if (Object(object) !== object) {
	            throw new TypeError('Object.defineProperty can only be called on Objects.');
	        }

	        if (Object(descriptor) !== descriptor) {
	            throw new TypeError('Property description can only be an Object.');
	        }

	        if ('get' in descriptor || 'set' in descriptor) {
	            throw new TypeError('getters & setters can not be defined on this javascript engine');
	        }
	        // If it's a data property.
	        if ('value' in descriptor) {
	            // fail silently if 'writable', 'enumerable', or 'configurable'
	            // are requested but not supported
	            // can't implement these features; allow true but not false
	            /* if ( 
	                     ('writable' in descriptor && !descriptor.writable) ||
	                     ('enumerable' in descriptor && !descriptor.enumerable) ||
	                     ('configurable' in descriptor && !descriptor.configurable)
	                 )
	                     {
	                         throw new RangeError('This implementation of Object.defineProperty does not support configurable, enumerable, or writable properties SET to FALSE.');
	                     }*/


	            object[property] = descriptor.value;
	        }
	        return object;
	    }
	}

/***/ },
/* 44 */
/***/ function(module, exports) {

	/*
	https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
	*/
	// ES5 15.2.3.9
	// http://es5.github.com/#x15.2.3.9
	if (!Object.freeze) {
	    Object.freeze = function freeze(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.freeze can only be called on Objects.');
	        }
	        // this is misleading and breaks feature-detection, but
	        // allows "securable" code to "gracefully" degrade to working
	        // but insecure code.
	        return object;
	    };
	}

/***/ },
/* 45 */
/***/ function(module, exports) {

	if (!Object.getOwnPropertyDescriptor) {

	    Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.getOwnPropertyDescriptor can only be called on Objects.');
	        }

	        var descriptor;
	        if (!Object.prototype.hasOwnProperty.call(object, property)) {
	            return descriptor;
	        }

	        descriptor = {
	            enumerable: Object.prototype.propertyIsEnumerable.call(object, property),
	            configurable: true
	        };

	        descriptor.value = object[property];

	        var psPropertyType = object.reflect.find(property).type;
	        descriptor.writable = !(psPropertyType === "readonly");

	        return descriptor;
	    }
	}

/***/ },
/* 46 */
/***/ function(module, exports) {

	if (!Object.getOwnPropertyNames) {
	    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {

	        if (Object(object) !== object) {
	            throw new TypeError('Object.getOwnPropertyNames can only be called on Objects.');
	        }
	        var names = [];
	        var hasOwnProperty = Object.prototype.hasOwnProperty;
	        var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
	        for (var prop in object) {
	            if (hasOwnProperty.call(object, prop)) {
	                names.push(prop);
	            }
	        }
	        var properties = object.reflect.properties;
	        var methods = object.reflect.methods;
	        var all = methods.concat(properties);
	        for (var i = 0; i < all.length; i++) {
	            var prop = all[i].name;
	            if (hasOwnProperty.call(object, prop) && !(propertyIsEnumerable.call(object, prop))) {
	                names.push(prop);
	            }
	        }
	        return names;
	    };
	}

/***/ },
/* 47 */
/***/ function(module, exports) {

	if (!Object.getPrototypeOf) {
		Object.getPrototypeOf = function(object) {
			if (Object(object) !== object) {
				throw new TypeError('Object.getPrototypeOf can only be called on Objects.');
			}
			return object.__proto__;
		}
	}

/***/ },
/* 48 */
/***/ function(module, exports) {

	// ES5 15.2.3.13
	// http://es5.github.com/#x15.2.3.13
	if (!Object.isExtensible) {
	    Object.isExtensible = function isExtensible(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.isExtensible can only be called on Objects.');
	        }
	        return true;
	    };
	}

/***/ },
/* 49 */
/***/ function(module, exports) {

	/*
	https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
	*/
	// ES5 15.2.3.12
	// http://es5.github.com/#x15.2.3.12
	if (!Object.isFrozen) {
	    Object.isFrozen = function isFrozen(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.isFrozen can only be called on Objects.');
	        }
	        return false;
	    };
	}

/***/ },
/* 50 */
/***/ function(module, exports) {

	/*
	https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
	*/
	// ES5 15.2.3.11
	// http://es5.github.com/#x15.2.3.11
	if (!Object.isSealed) {
	    Object.isSealed = function isSealed(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.isSealed can only be called on Objects.');
	        }
	        return false;
	    };
	}

/***/ },
/* 51 */
/***/ function(module, exports) {

	if (!Object.keys) {
	    Object.keys = function(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.keys can only be called on Objects.');
	        }
	        var hasOwnProperty = Object.prototype.hasOwnProperty;
	        var result = [];
	        for (var prop in object) {
	            if (hasOwnProperty.call(object, prop)) {
	                result.push(prop);
	            }
	        }
	        return result;
	    };
	}

/***/ },
/* 52 */
/***/ function(module, exports) {

	/*
	https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
	*/
	// ES5 15.2.3.10
	// http://es5.github.com/#x15.2.3.10
	if (!Object.preventExtensions) {
	    Object.preventExtensions = function preventExtensions(object) {

	        if (Object(object) !== object) {
	            throw new TypeError('Object.preventExtensions can only be called on Objects.');
	        }
	        // this is misleading and breaks feature-detection, but
	        // allows "securable" code to "gracefully" degrade to working
	        // but insecure code.
	        return object;
	    };
	}

/***/ },
/* 53 */
/***/ function(module, exports) {

	/*
	https://github.com/es-shims/es5-shim/blob/master/es5-sham.js
	*/
	// ES5 15.2.3.8
	// http://es5.github.com/#x15.2.3.8
	if (!Object.seal) {
	    Object.seal = function seal(object) {
	        if (Object(object) !== object) {
	            throw new TypeError('Object.seal can only be called on Objects.');
	        }
	        // this is misleading and breaks feature-detection, but
	        // allows "securable" code to "gracefully" degrade to working
	        // but insecure code.
	        return object;
	    };
	}

/***/ }
/******/ ]);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference types="illustrator/2015.3"/>
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(1);
var ActionExecutor_1 = __webpack_require__(5);
var Actions_1 = __webpack_require__(6);
var ImageExporter_1 = __webpack_require__(7);
var Logger_1 = __webpack_require__(0);
var DocumentTree_1 = __webpack_require__(8);
var OriginLayerName = "original";
var OutlinedLayerName = "outline";
var TempOutlinedLayerName = "temp_outline";
var SilhouetteLayerName = "silhouette";
var StrokeColor = Utils_1.ColorPallete.rgbString("#898989");
/**
 * originalの名前のレイヤーを元に、
 * 輪郭化したものをoutline
 * シルエット化したものをshilhouette
 * のレイヤーに作成し、それぞれの画像を保存する
 */
var FillItDocument = /** @class */ (function () {
    function FillItDocument() {
        this.doc = app.activeDocument;
    }
    FillItDocument.prototype.getDocName = function () {
        var name = app.activeDocument.name;
        if (name.indexOf(".") >= 0) {
            return name.substring(0, name.indexOf("."));
        }
        else {
            return name;
        }
    };
    FillItDocument.prototype.getOriginLayer = function () {
        return this.doc.layers.getByName(OriginLayerName);
    };
    FillItDocument.prototype.changeToOutline = function () {
        var copyer = new LayerCopyer();
        var logger = Logger_1.Logger.getDefault();
        logger.log("Start copy");
        copyer.copyAllItems(OriginLayerName, OutlinedLayerName);
        copyer.copyAllItems(OriginLayerName, TempOutlinedLayerName);
        copyer.copyAllItems(OriginLayerName, SilhouetteLayerName);
        logger.log("Make outline");
        // アウトライン化
        // 結合
        this.mergeOutlineElements();
        DocumentTree_1.Element.getActive().revertAll();
        DocumentTree_1.Element.clearCache();
        // 細線のみ
        logger.log("Inner lines");
        for (var _i = 0, _a = DocumentTree_1.Element.getActive().findElement(OutlinedLayerName).children(); _i < _a.length; _i++) {
            var ele = _a[_i];
            logger.log("Layer " + ele.name());
            var outlineOperator = new ObjectOperator(ele.findElement("inner"));
            outlineOperator.outlinenize();
        }
        // 外線
        logger.log("Outer lines");
        for (var _b = 0, _c = DocumentTree_1.Element.getActive().findElement(OutlinedLayerName).children(); _b < _c.length; _b++) {
            var ele = _c[_b];
            logger.log("Layer " + ele.name());
            var outlineOperator = new ObjectOperator(ele.findElement("outer"));
            outlineOperator.shilhouettenize(Utils_1.ColorPallete.noColor());
        }
        // シルエット化
        logger.log("Make silhouette");
        for (var _d = 0, _e = DocumentTree_1.Element.getActive().findElement(SilhouetteLayerName).children(); _d < _e.length; _d++) {
            var ele = _e[_d];
            var outlineOperator = new ObjectOperator(ele);
            outlineOperator.shilhouettenize(Utils_1.ColorPallete.white());
        }
        this.saveImages();
        DocumentTree_1.Element.getActive().revertAll();
    };
    FillItDocument.prototype.saveImages = function () {
        var imageExporter = new ImageExporter_1.ImageExporter();
        var imageDir = "images/";
        var logger = Logger_1.Logger.getDefault();
        imageExporter.makeDir(imageDir);
        logger.log("Export normal images");
        this.foreachChildLayers(OriginLayerName)(function (layer) {
            imageExporter.saveAsPng(imageDir + layer.name(), layer);
        });
        logger.log("Export outline images");
        this.foreachChildLayers(OutlinedLayerName)(function (layer) {
            imageExporter.saveAsPng(imageDir + layer.name() + "_outline", layer);
        });
        logger.log("Export silhouette images");
        this.foreachChildLayers(SilhouetteLayerName)(function (layer) {
            imageExporter.saveAsPng(imageDir + layer.name() + "_silhouette", layer);
        });
        DocumentTree_1.Element.getActive().revertAll();
    };
    FillItDocument.prototype.layer = function (name) {
        return app.activeDocument.layers.getByName(name);
    };
    FillItDocument.prototype.foreachChildLayers = function (layerName) {
        return function (func) {
            var targetLayer = DocumentTree_1.Element.getActive().findElement(layerName);
            for (var _i = 0, _a = targetLayer.children(); _i < _a.length; _i++) {
                var ele = _a[_i];
                func(ele);
            }
        };
    };
    FillItDocument.prototype.mergeOutlineElements = function () {
        var outerLines = DocumentTree_1.Element.getActive().findElement(OutlinedLayerName).children();
        var innerLines = DocumentTree_1.Element.getActive().findElement(TempOutlinedLayerName).children();
        var layer = DocumentTree_1.Element.getActive().findElement(OutlinedLayerName);
        for (var i = 0; i < outerLines.length; i++) {
            var l = layer.asLayer().layers.add();
            var innerLine = innerLines[i];
            var outerLine = outerLines[i];
            l.name = innerLine.name();
            innerLine.setName("inner");
            innerLine.raw().move(l, ElementPlacement.PLACEATBEGINNING);
            outerLine.setName("outer");
            outerLine.raw().move(l, ElementPlacement.PLACEATBEGINNING);
        }
        //Element.getActive().findElement(TempOutlinedLayerName).remove();
    };
    return FillItDocument;
}());
var LayerCopyer = /** @class */ (function () {
    function LayerCopyer() {
    }
    LayerCopyer.prototype.copyAllItems = function (copyFromLayerName, copyTargetLayerName) {
        var doc = app.activeDocument;
        var originLayer = doc.layers.getByName(copyFromLayerName);
        if (!originLayer) {
            return null;
        }
        var copyTarget = null;
        try {
            copyTarget = doc.layers.getByName(copyTargetLayerName);
        }
        catch (err) {
            copyTarget = null;
        }
        if (copyTarget) {
            if (!copyTarget.visible) {
                copyTarget.visible = true;
            }
            copyTarget.remove();
        }
        var newCopyTarget = doc.layers.add();
        newCopyTarget.name = copyTargetLayerName;
        var isVisible = originLayer.visible;
        originLayer.visible = true;
        this.copyRecursively(originLayer, newCopyTarget);
        originLayer.visible = isVisible;
        return newCopyTarget;
    };
    LayerCopyer.prototype.copyRecursively = function (from, dest) {
        // Copy items
        for (var i = 0; i < from.pageItems.length; i++) {
            var fromI = from.pageItems[i];
            // Invisibleになっている場合、コピーのために表示状態にして
            // 終わったら元に戻す
            var isVisible = true;
            if (fromI.hidden) {
                isVisible = false;
                fromI.hidden = false;
            }
            fromI.duplicate(dest, ElementPlacement.PLACEATEND);
            if (!isVisible) {
                fromI.hidden = true;
            }
        }
        // Copy layers
        for (var i = from.layers.length - 1; i >= 0; i--) {
            var fromL = from.layers[i];
            var isVisible = true;
            if (!fromL.visible) {
                fromL.visible = true;
                isVisible = false;
            }
            var copied = dest.layers.add();
            copied.name = fromL.name;
            this.copyRecursively(fromL, copied);
            if (!isVisible) {
                fromL.visible = false;
            }
        }
    };
    return LayerCopyer;
}());
var ObjectOperator = /** @class */ (function () {
    function ObjectOperator(element) {
        this.element = element;
    }
    ObjectOperator.prototype.gatherItems = function (layer) {
        var pageItems = [];
        for (var i = 0; i < layer.pageItems.length; i++) {
            pageItems.push(layer.pageItems[i]);
        }
        if (layer.typename == "Layer") {
            var l = layer;
            for (var i = 0; i < l.layers.length; i++) {
                pageItems = pageItems.concat(this.gatherItems(l.layers[i]));
            }
        }
        return pageItems;
    };
    /**
     * 線画化する
     */
    ObjectOperator.prototype.outlinenize = function () {
        var actionExecutor = new ActionExecutor_1.ActionExecutor();
        var outlineizeRec = function (e) {
            if (e.children().length > 0) {
                for (var _i = 0, _a = e.children(); _i < _a.length; _i++) {
                    var c = _a[_i];
                    outlineizeRec(c);
                }
            }
            else {
                var pageItem = e.raw();
                if (pageItem == null) {
                    return;
                }
                var strokeWidth = pageItem.strokeWidth;
                // 色変更
                pageItem.strokeColor = pageItem.fillColor;
                pageItem.fillColor = Utils_1.ColorPallete.white();
                app.activeDocument.selection = [];
                pageItem.selected = true;
                actionExecutor.executeActionFromSrc(Actions_1.aiscripts.ChangeStrokeSide);
                pageItem.strokeWidth = strokeWidth;
            }
        };
        outlineizeRec(this.element);
    };
    ObjectOperator.prototype.shilhouettenize = function (fillColor) {
        this.changeStrokeAndFillColor(StrokeColor, fillColor);
        this.mergeAndOutineize(this.element);
        // 線の設定を変更
        new ActionExecutor_1.ActionExecutor().executeActionFromSrc(Actions_1.aiscripts.ChangeStrokeSide);
    };
    ObjectOperator.prototype.changeStrokeAndFillColor = function (strokeColor, fillColor) {
        this.element.makeModifiable();
        var changeColor = function (ele) {
            if (ele.typename() == "PathItem") {
                var pathItem = ele.asPageItem();
                pathItem.strokeColor = strokeColor;
                pathItem.fillColor = fillColor;
            }
            else {
                for (var _i = 0, _a = ele.children(); _i < _a.length; _i++) {
                    var c = _a[_i];
                    changeColor(c);
                }
            }
        };
        for (var _i = 0, _a = this.element.children(); _i < _a.length; _i++) {
            var item = _a[_i];
            changeColor(item);
        }
    };
    ObjectOperator.prototype.mergeAndOutineize = function (element) {
        if (element === void 0) { element = this.element; }
        Logger_1.Logger.getDefault().log("Outlineize: " + element.name());
        element.makeVisibleAllChildren(true);
        if (element.typename() == "Layer") {
            var layer = element.asLayer();
            var compound = layer.compoundPathItems.add();
            for (var _i = 0, _a = element.children(); _i < _a.length; _i++) {
                var child = _a[_i];
                var item = child.raw();
                item.move(compound, ElementPlacement.PLACEATEND);
            }
            app.activeDocument.selection = [];
            compound.selected = true;
            app.executeMenuCommand("Live Pathfinder Add");
            app.executeMenuCommand('expandStyle');
        }
        else {
            app.activeDocument.selection = [];
            element.setSelected(true);
            app.executeMenuCommand("Live Pathfinder Add");
            app.executeMenuCommand('expandStyle');
        }
    };
    return ObjectOperator;
}());
new FillItDocument().changeToOutline();
alert("Done!");


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference types="illustrator/2015.3"/>
Object.defineProperty(exports, "__esModule", { value: true });
var ActionExecutor = /** @class */ (function () {
    function ActionExecutor() {
    }
    ActionExecutor.prototype.executeActionFromSrc = function (actionScript) {
        var file = new File(Folder.temp + "/" + actionScript.folder + "_" + actionScript.name);
        try {
            app.unloadAction(actionScript.folder, "");
        }
        catch (err) {
        }
        var isLoaded = false;
        try {
            file.open("w");
            file.write(actionScript.script);
            file.close();
            app.loadAction(file);
            isLoaded = true;
            app.doScript(actionScript.name, actionScript.folder, false);
        }
        finally {
            if (isLoaded) {
                app.unloadAction(actionScript.folder, "");
            }
        }
    };
    return ActionExecutor;
}());
exports.ActionExecutor = ActionExecutor;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var aiscripts;
(function (aiscripts) {
    /**
       * 線のオプションを
       * - 線の幅 9pt
       * - 線端 丸
       * - 角の形状 丸
       * - 線の位置 外側
       *
       * へ変更するアクション。線の位置がスクリプトだけでは変更できないためアクションを使用している
       */
    aiscripts.ChangeStrokeSide = {
        name: "Center",
        folder: "ChangeStrokeSide",
        script: "/version 3\n/name [ 16\n\t4368616e67655374726f6b6553696465\n]\n/isOpen 1\n/actionCount 1\n/action-1 {\n\t/name [ 6\n\t\t43656e746572\n\t]\n\t/keyIndex 0\n\t/colorIndex 0\n\t/isOpen 1\n\t/eventCount 1\n\t/event-1 {\n\t\t/useRulersIn1stQuadrant 0\n\t\t/internalName (ai_plugin_setStroke)\n\t\t/localizedName [ 12\n\t\t\te7b79ae38292e8a8ade5ae9a\n\t\t]\n\t\t/isOpen 1\n\t\t/isOn 1\n\t\t/hasDialog 0\n\t\t/parameterCount 9\n\t\t/parameter-1 {\n\t\t\t/key 2003072104\n\t\t\t/showInPalette 4294967295\n\t\t\t/type (unit real)\n\t\t\t/value 9.0\n\t\t\t/unit 592476268\n\t\t}\n\t\t/parameter-2 {\n\t\t\t/key 1667330094\n\t\t\t/showInPalette 4294967295\n\t\t\t/type (enumerated)\n\t\t\t/name [ 12\n\t\t\t\te4b8b8e59e8be7b79ae7abaf\n\t\t\t]\n\t\t\t/value 1\n\t\t}\n\t\t/parameter-3 {\n\t\t\t/key 1785686382\n\t\t\t/showInPalette 4294967295\n\t\t\t/type (enumerated)\n\t\t\t/name [ 18\n\t\t\t\te383a9e382a6e383b3e38389e7b590e59088\n\t\t\t]\n\t\t\t/value 1\n\t\t}\n\t\t/parameter-4 {\n\t\t\t/key 1684825454\n\t\t\t/showInPalette 4294967295\n\t\t\t/type (integer)\n\t\t\t/value 0\n\t\t}\n\t\t/parameter-5 {\n\t\t\t/key 1684104298\n\t\t\t/showInPalette 4294967295\n\t\t\t/type (boolean)\n\t\t\t/value 0\n\t\t}\n\t\t/parameter-6 {\n\t\t\t/key 1634231345\n\t\t\t/showInPalette 4294967295\n\t\t\t/type (ustring)\n\t\t\t/value [ 8\n\t\t\t\t5be381aae381975d\n\t\t\t]\n\t\t}\n\t\t/parameter-7 {\n\t\t\t/key 1634231346\n\t\t\t/showInPalette 4294967295\n\t\t\t/type (ustring)\n\t\t\t/value [ 8\n\t\t\t\t5be381aae381975d\n\t\t\t]\n\t\t}\n\t\t/parameter-8 {\n\t\t\t/key 1634230636\n\t\t\t/showInPalette 4294967295\n\t\t\t/type (enumerated)\n\t\t\t/name [ 24\n\t\t\t\te38391e382b9e381aee7b582e782b9e381abe9858de7bdae\n\t\t\t]\n\t\t\t/value 0\n\t\t}\n\t\t/parameter-9 {\n\t\t\t/key 1634494318\n\t\t\t/showInPalette 4294967295\n\t\t\t/type (enumerated)\n\t\t\t/name [ 6\n\t\t\t\te5a496e581b4\n\t\t\t]\n\t\t\t/value 2\n\t\t}\n\t}\n}"
    };
})(aiscripts = exports.aiscripts || (exports.aiscripts = {}));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = __webpack_require__(0);
/// <reference types="illustrator/2015.3"/>
var ImageExporter = /** @class */ (function () {
    function ImageExporter() {
    }
    ImageExporter.prototype.makeDir = function (name) {
        var f = new Folder(app.activeDocument.path + "/" + name);
        if (!f.exists) {
            f.create();
        }
    };
    ImageExporter.prototype.saveAsPng = function (name, element) {
        element.makeOthersInvisible();
        Logger_1.Logger.getDefault().log("Save as png:" + name);
        var exportOptions = new ExportOptionsPNG24();
        exportOptions.antiAliasing = true;
        exportOptions.transparency = true;
        exportOptions.matte = false;
        //exportOptions.clip = true;
        exportOptions.saveAsHTML = false;
        exportOptions.verticalScale = 100;
        exportOptions.horizontalScale = 100;
        app.activeDocument.exportFile(new File(app.activeDocument.path + "/" + name + ".png"), ExportType.PNG24, exportOptions);
        //element.revertAll()
    };
    return ImageExporter;
}());
exports.ImageExporter = ImageExporter;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = __webpack_require__(0);
var Element = /** @class */ (function () {
    function Element(parent) {
        this._isVisible = true;
        this._isLocked = false;
        this._parent = parent;
    }
    Element.getActive = function () {
        var doc = app.activeDocument;
        if (this.cache[doc.name]) {
            return this.cache[doc.name];
        }
        else {
            var e = new DocumentElement(doc);
            this.cache[doc.name] = e;
            return e;
        }
    };
    Element.clearCache = function () {
        this.cache = {};
    };
    Element.prototype.parent = function () {
        return this._parent;
    };
    Element.prototype.root = function () {
        if (this._parent == null) {
            return this;
        }
        else {
            return this._parent.root();
        }
    };
    Element.prototype.children = function () {
        if (this._children) {
            return this._children;
        }
        this._children = this.makeChildren();
        return this._children;
    };
    Element.prototype.findElement = function (name) {
        for (var _i = 0, _a = this.children(); _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.name() === name) {
                return child;
            }
        }
        return null;
    };
    Element.prototype.name = function () {
        return this.raw().name;
    };
    Element.prototype.setName = function (name) {
        var raw = this.raw();
        if (raw.typename !== "Document") {
            raw.name = name;
        }
    };
    Element.prototype.typename = function () {
        return this.raw().typename;
    };
    Element.prototype.asPageItem = function () {
        return this.raw();
    };
    Element.prototype.asLayer = function () {
        return this.raw();
    };
    Element.prototype.asDocument = function () {
        return this.raw();
    };
    Element.prototype.makeModifiable = function () {
        if (this.parent() !== null) {
            this.parent().makeModifiable();
        }
        this.setVisible(true);
        this.setLocked(false);
    };
    Element.prototype.makeVisibleAllChildren = function (visible) {
        this.setVisible(visible);
        for (var _i = 0, _a = this.children(); _i < _a.length; _i++) {
            var child = _a[_i];
            child.makeVisibleAllChildren(visible);
        }
    };
    Element.prototype.isModifiable = function () {
        return this.isVisible() && !this.isLocked();
    };
    /**
     * この要素以外を不可視状態にする
     */
    Element.prototype.makeOthersInvisible = function () {
        return this.makeOthersInvisibleExcept(null);
    };
    Element.prototype.makeOthersInvisibleExcept = function (except) {
        if (this.parent() !== null) {
            this.parent().makeOthersInvisibleExcept(this);
        }
        this.setVisible(true);
        if (except === null)
            return;
        for (var _i = 0, _a = this.children(); _i < _a.length; _i++) {
            var child = _a[_i];
            if (child === except) {
                child.setVisible(true);
            }
            else {
                child.setVisible(false);
            }
        }
    };
    Element.prototype.saveState = function () {
        this._isLocked = this.isLocked();
        this._isVisible = this.isVisible();
    };
    /**
     * 自身のみを巻き戻す
     */
    Element.prototype.revertState = function () {
        if (this.isLocked() != this._isLocked) {
            // 可視状態でないと変更できない
            if (!this.isVisible()) {
                this.setVisible(true);
            }
            this.setLocked(this._isLocked);
        }
        if (this.isVisible() != this._isVisible) {
            this.setVisible(this._isVisible);
        }
    };
    /**
     * ドキュメント全体を巻き戻す
     */
    Element.prototype.revertAll = function () {
        Logger_1.Logger.getDefault().log("Revert " + this.name());
        if (this.parent() !== null) {
            this.parent().revertAll();
        }
        else {
            this.revertChildren();
        }
    };
    /**
     * 自分と子供のみを巻き戻す
     */
    Element.prototype.revertChildren = function () {
        this.setVisible(true);
        this.setLocked(false);
        for (var _i = 0, _a = this.children(); _i < _a.length; _i++) {
            var child = _a[_i];
            child.revertChildren();
        }
        this.revertState();
    };
    Element.prototype.clearCache = function () {
        this._children = null;
    };
    Element.cache = {};
    return Element;
}());
exports.Element = Element;
var PageItemElement = /** @class */ (function (_super) {
    __extends(PageItemElement, _super);
    function PageItemElement(item, parent) {
        var _this = _super.call(this, parent) || this;
        _this.item = item;
        _this.saveState();
        return _this;
    }
    PageItemElement.create = function (item, parent) {
        if (item.typename === "GroupItem") {
            return new GroupItemElemennt(item, parent);
        }
        else {
            return new PageItemElement(item, parent);
        }
    };
    PageItemElement.prototype.raw = function () {
        return this.item;
    };
    PageItemElement.prototype.makeChildren = function () {
        return [];
    };
    PageItemElement.prototype.setVisible = function (visible) {
        this.item.hidden = !visible;
    };
    PageItemElement.prototype.isVisible = function () {
        return !this.item.hidden;
    };
    PageItemElement.prototype.isLocked = function () {
        return this.item.locked;
    };
    PageItemElement.prototype.setLocked = function (locked) {
        this.item.locked = locked;
    };
    PageItemElement.prototype.isSelected = function () {
        return this.item.selected;
    };
    PageItemElement.prototype.setSelected = function (selected) {
        this.item.selected = selected;
    };
    PageItemElement.prototype.remove = function () {
        this.item.remove();
        this._children = null;
        this._parent.clearCache();
    };
    PageItemElement.prototype.moveTo = function (newParent, ep) {
        this.item.move(newParent.raw(), ep);
        this._parent = newParent;
        newParent.clearCache();
    };
    return PageItemElement;
}(Element));
var GroupItemElemennt = /** @class */ (function (_super) {
    __extends(GroupItemElemennt, _super);
    function GroupItemElemennt(item, parent) {
        var _this = _super.call(this, item, parent) || this;
        _this.item = item;
        return _this;
    }
    GroupItemElemennt.prototype.makeChildren = function () {
        var items = [];
        var pageItems = this.item.pageItems;
        for (var i = 0; i < pageItems.length; i++) {
            items.push(PageItemElement.create(pageItems[i], this));
        }
        return items;
    };
    return GroupItemElemennt;
}(PageItemElement));
var LayerElement = /** @class */ (function (_super) {
    __extends(LayerElement, _super);
    function LayerElement(layer, parent) {
        var _this = _super.call(this, parent) || this;
        _this.layer = layer;
        _this.saveState();
        return _this;
    }
    LayerElement.prototype.raw = function () {
        return this.layer;
    };
    LayerElement.prototype.makeChildren = function () {
        var items = [];
        var layers = this.layer.layers;
        for (var i = 0; i < layers.length; i++) {
            items.push(new LayerElement(layers[i], this));
        }
        var pageItems = this.layer.pageItems;
        for (var i = 0; i < pageItems.length; i++) {
            items.push(PageItemElement.create(pageItems[i], this));
        }
        return items;
    };
    LayerElement.prototype.setVisible = function (visible) {
        this.layer.visible = visible;
    };
    LayerElement.prototype.isVisible = function () {
        return this.layer.visible;
    };
    LayerElement.prototype.isLocked = function () {
        return this.layer.locked;
    };
    LayerElement.prototype.setLocked = function (locked) {
        this.layer.locked = locked;
    };
    LayerElement.prototype.isSelected = function () {
        for (var _i = 0, _a = this.children(); _i < _a.length; _i++) {
            var child = _a[_i];
            if (!child.isSelected()) {
                return false;
            }
        }
        return true;
    };
    LayerElement.prototype.setSelected = function (selected) {
        for (var _i = 0, _a = this.children(); _i < _a.length; _i++) {
            var child = _a[_i];
            child.setSelected(selected);
        }
    };
    LayerElement.prototype.remove = function () {
        this.layer.remove();
        this._children = null;
        this._parent.clearCache();
    };
    LayerElement.prototype.moveTo = function (newParent, ep) {
        this.layer.move(newParent.raw(), ep);
        this._parent = newParent;
        newParent.clearCache();
    };
    return LayerElement;
}(Element));
var DocumentElement = /** @class */ (function (_super) {
    __extends(DocumentElement, _super);
    function DocumentElement(document) {
        var _this = _super.call(this, null) || this;
        _this.document = document;
        return _this;
    }
    DocumentElement.prototype.raw = function () {
        return this.document;
    };
    DocumentElement.prototype.makeChildren = function () {
        var items = [];
        var layers = this.document.layers;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].parent === this.document) {
                items.push(new LayerElement(layers[i], this));
            }
        }
        var pageItems = this.document.pageItems;
        for (var i = 0; i < pageItems.length; i++) {
            if (pageItems[i].parent === this.document) {
                items.push(PageItemElement.create(pageItems[i], this));
            }
        }
        return items;
    };
    DocumentElement.prototype.setVisible = function (visible) {
    };
    DocumentElement.prototype.isVisible = function () {
        return true;
    };
    DocumentElement.prototype.isLocked = function () {
        return false;
    };
    DocumentElement.prototype.setLocked = function (locked) {
    };
    DocumentElement.prototype.isSelected = function () {
        return false;
    };
    DocumentElement.prototype.setSelected = function (selected) {
    };
    DocumentElement.prototype.remove = function () {
    };
    DocumentElement.prototype.moveTo = function (newParent, ep) {
    };
    return DocumentElement;
}(Element));


/***/ })
/******/ ]);