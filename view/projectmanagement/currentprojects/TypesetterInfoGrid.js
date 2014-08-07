Ext.define('MyDesktop.view.projectmanagement.currentprojects.TypesetterInfoGrid', {
	extend : 'Ext.grid.property.Grid',
	alias : 'widget.tinfogrid',
	closeAction : 'hide',
	height : 235,
	hideHeaders : true,
	enableColumnResize : true,
	id : 'tinfogrid',
	listeners : {
		'beforeedit' : {
			fn : function() {
				return false;
			}
		}
	},
	source : {
		"No.of Authors" : "",
		"Path" : "/ooh/users/ooh-newgen/To Newgen/",
		"File Name" : "",
		"Book Title" : "",
		"HB ISBN" : "",
		"PB ISBN" : "",
		"Date proofs required":"",
		"Design" : "",
		"Format" : "",
		"Notes" : "",
		"Index Included?" : "",
	}
});
