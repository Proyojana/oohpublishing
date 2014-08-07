Ext.define('MyDesktop.view.projectmanagement.currentprojects.ProductionBudgetGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.pbudgetgrid',
	closeAction: 'hide',
	id:'pbudgetgrid',
	requires : ['MyDesktop.store.PBudget'],
	initComponent: function() {
		var pbudget = Ext.create('MyDesktop.store.PBudget');
		pbudget.load({params:{start: 0, limit: 50}});
	    pbudget.loadPage(1);
			this.store = pbudget,
			this.columns = [
				{
					dataIndex: 'activity',
                    text: 'Activity',
					flex:1,
				},
				{
					dataIndex: 'stage',
					text: 'Satge',
					flex:1,
				},
				{
					dataIndex: 'unit',
					text: 'Unit',
					align: 'center',
					flex:1,
				},
				{
					dataIndex: 'amt',
					text: 'Actual Amount',
					flex:1,
				},
			];
this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			displayInfo : true,
			displayMsg : 'Displaying topics {0} - {1} of {2}',
			emptyMsg : "No topics to display"
		}),
		this.callParent(arguments);

	}
});

