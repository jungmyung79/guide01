
/**

 Ajax 객체를 관리한다.

 - 이 객체를 통해 ajax 를 요청하고
 - singleton 으로 설계되어 전체 Ajax 요청을 중지 시킬 수 있다.



 @author jungmyung.seo@yt.com
 @version 1.0
 @since 2015-10-27



 @class
 @classdesc singletone
 @ignore



 @example

 ```js
 var oAjaxManager = ns.AjaxManager.getInstance();

 oAjaxManager.request(
 // config
 {
     'url': 'api/example.nhn',
     'method': 'GET',
     data: {id: 123}
 },
 // callback
 {
     fnDone: function(){ //... },
     fnFail: function(){ //... },
     fnAlways: function(){ //... }
 }
 );
 ```
 */

ns.AjaxManager = {
    _oInstance: null,

    /**
     * singleton
     *
     * @public
     * @static
     *
     * @memberof ns.AjaxManager
     *
     * @return {ns.AjaxManager}
     */
    getInstance: function(){

        if(null !== this._oInstance){
            return this._oInstance;
        }

        this._oInstance = new this(arguments);

        this._oInstance._$constructor().init().activate();


        return this._oInstance;
    }

};
