Ext.define('MyDesktop.view.projectmanagement.editproject.budget.budgetpayinfogrid', {
	extend : 'Ext.grid.property.Grid',
	alias : 'widget.budgetpayinfogrid',
	closeAction : 'hide',
	height : 235,
	hideHeaders : true,
	enableColumnResize : true,
	id : 'budgetpayinfogrid',
	listeners : {
		'beforeedit' : {
			fn : function() {
				return false;
			}
		}
	},
	source : {
		"budgetedpayableamountUSD" : "",
		
		"budgetedpayableamountGDP" : "",
	}
});
