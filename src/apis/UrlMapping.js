/*
 * Description: UrlMapping
 * Author: chaoge
 * Date: 2018/05/23
*/


export default class UrlMapping {
	constructor(){
		this.isLocalHost = window.location.host.toLowerCase() == 'http://localhost:8080';
		this.origin = window.location.origin;
		
		this.POST_QUERYCOMMONINFO = (this.isLocalHost?'/apis':this.origin)+'/wumart/partner/queryCommonInfo';                // 列表-通过门店编号（siteNo）获取业态，小店类型，大区号
		this.POST_QUERYSUBJECTTYPE = (this.isLocalHost?'/apis':this.origin)+'/wumart/partner/querySubjectType';              // 列表-查询科目
		
	}
	
}
