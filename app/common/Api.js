
var ns = require("./namespace.js");
var Util = require("./util/Util.js");

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