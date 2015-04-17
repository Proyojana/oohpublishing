Ext.define('MyDesktop.view.projectmanagement.editproject.budget.budgetprofit', {
	extend : 'Ext.grid.property.Grid',
	alias : 'widget.budgetprofit',
	closeAction : 'hide',
	height : 235,
	hideHeaders : true,
	enableColumnResize : true,
	id : 'budgetprofit',
	listeners : {
		'beforeedit' : {
			fn : function() {
				return false;
			}
		}
	},
	source : {
		"ActualprojectprofitGDP" : "",
		
		"Actualprojectprofit" : "",
	}
});
