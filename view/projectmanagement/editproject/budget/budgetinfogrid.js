Ext.define('MyDesktop.view.projectmanagement.editproject.budget.budgetinfogrid', {
	extend : 'Ext.grid.property.Grid',
	alias : 'widget.budinfogrid',
	closeAction : 'hide',
	height : 235,
	hideHeaders : true,
	enableColumnResize : true,
	id : 'budinfogrid',
	listeners : {
		'beforeedit' : {
			fn : function() {
				return false;
			}
		}
	},
	source : {
		"budgetedreceivableamountUSD" : "",
		
		"budgetedreceivableamountGDP" : "",
	}
});
