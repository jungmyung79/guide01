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

	

	__webpack_require__(1);

	document.write("It works..");


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var ns = __webpack_require__(2);
	var Util = __webpack_require__(3);

	ns.Api = {

	    tempsave: {
	        list: '/api/temp',
	        getdata : '/api/temp/{{seq}}',
	        setdata: '/api/temp/save', // post
	        deleteitem: '/api/temp/delete', // post
	        setconfig: '/api/temp/config/save' // post
	    },

	    /**
	     *
	     * @param {String} sPath    e.g. 'api/path/a/'
	     * @param {HashTable} htParam   path에 적용될 template data
	     * @return {String}
	     * @example
	     * pathroot: {
	     *  getapi: '/api/get/{{seq}}'
	     * }
	     *
	     * get('pathroot/getapi', {seq:1}); ///api/get/1
	     */
	    get : function(sPath, htParam){

	        var sUrl = Util.getByPath(sPath, this);


	        if(undefined !== sUrl && undefined !== htParam){
	            sUrl = Handlebars.compile(sUrl)(htParam);
	        }

	        return sUrl;
	    }
	};

	module.exports = ns.Api;

/***/ },
/* 2 */
/***/ function(module, exports) {

	
	// namespace
	// `sPsNamespace`: user can define
	var sNamespace = window.sPsNamespace || 'yt'; // `yt` is yello travel
	var ns = window[sNamespace] = window[sNamespace] || {}; // for shorthand in context

	module.exports = ns;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * 공통으로 사용하는 유틸
	 *
	 *
	 *
	 * @author jungmyung.seo@yt.com
	 * @version 1.0
	 * @since 2015-10-27
	 *
	 *
	 *
	 * @class
	 * @ignore
	 */
	var ns = __webpack_require__(2);

	ns.Util = {
	    convertToReadabilityFileSize: function(nByte){

	        var aUnit = ['KB', 'M', 'G'];
	        var nKb = 1024;

	        var nReadabilitySize = nByte;
	        var sReadabilityUnit = 'B'; // default


	        // more then 1kb
	        if(nReadabilitySize >= nKb){

	            $.each(aUnit, function(idx, sUnit){
	                nReadabilitySize = nReadabilitySize / nKb;

	                if(nReadabilitySize < nKb){
	                    sReadabilityUnit = sUnit;
	                    return false;
	                }
	            });
	        }

	        return parseInt(nReadabilitySize, 10) + sReadabilityUnit;
	    },

	    /**
	     * - directory path 형식으로 object를 탐색하고 값을 리턴
	     * - path 구분자는 "/" 만 지원 (ex. "a/b/c")
	     *
	     * @public
	     *
	     * @param   {String} sObjectPath	탐색할 경로
	     * @param   {Object} [oContext=window] 설정된 값부터 탐색을 시작
	     * @return  {variable}
	     * @example
	     * var ht = {a : 1, b : { a : 100}};
	     * getByPath("b/a", ht) // 100
	     * getByPath("B/A", ht) // undefined
	     * getByPath("b/a/c/d/e", ht) // undefined
	     */
	    getByPath : function(sObjectPath, oContext){

	        var aSplitPath = sObjectPath.split("/");
	        var varLastPath = oContext || window;


	        $.each(aSplitPath, function(idx, sPathName){
	            if("" === sPathName){
	                return;
	            }

	            varLastPath = varLastPath[sPathName];

	            if(undefined === varLastPath){
	                return false;
	            }
	        });

	        return varLastPath;
	    },

	    /**
	     * 입력된 min, max 중 random 값을 return
	     *
	     * @public
	     *
	     * @param {Number}	nMin	random 범위 중 가장 작은 수
	     * @param {Number}	nMax	random 범위 중 가장 큰 수
	     * @example
	     * // 0 부터 10중 random 값
	     * getRandomNum(0, 10);
	     */
	    getRandomNum : function(nMin, nMax){
	        return Math.round(
	            (nMax - nMin) * Math.random() + nMin);
	    },

	    /**
	     * `JSON.stringify()` polyfill from [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#Polyfill)
	     *
	     * @public
	     *
	     * @param {HashTable}   htJson  문자열로 변경할 JSON 객체
	     * @return {String}
	     */
	    stringify: (function () {
	        var toString = Object.prototype.toString;
	        var isArray = Array.isArray || function (a) { return toString.call(a) === '[object Array]'; };
	        var escMap = {'"': '\\"', '\\': '\\\\', '\b': '\\b', '\f': '\\f', '\n': '\\n', '\r': '\\r', '\t': '\\t'};
	        var escFunc = function (m) { return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1); };
	        var escRE = /[\\"\u0000-\u001F\u2028\u2029]/g;
	        return function stringify(htJson) {
	            if (htJson == null) {
	                return 'null';
	            } else if (typeof htJson === 'number') {
	                return isFinite(htJson) ? htJson.toString() : 'null';
	            } else if (typeof htJson === 'boolean') {
	                return htJson.toString();
	            } else if (typeof htJson === 'object') {
	                if (typeof htJson.toJSON === 'function') {
	                    return stringify(htJson.toJSON());
	                } else if (isArray(htJson)) {
	                    var res = '[';
	                    for (var i = 0; i < htJson.length; i++)
	                        res += (i ? ', ' : '') + stringify(htJson[i]); // jshint ignore:line
	                    return res + ']';
	                } else if (toString.call(htJson) === '[object Object]') {
	                    var tmp = [];
	                    for (var k in htJson) { // jshint ignore:line
	                        if (htJson.hasOwnProperty(k))
	                            tmp.push(stringify(k) + ': ' + stringify(htJson[k])); // jshint ignore:line
	                    }
	                    return '{' + tmp.join(', ') + '}';
	                }
	            }
	            return '"' + htJson.toString().replace(escRE, escFunc) + '"';
	        };
	    })()
	};

	module.exports = ns.Util;


/***/ }
/******/ ]);