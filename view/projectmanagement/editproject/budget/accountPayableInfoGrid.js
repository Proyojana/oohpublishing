Ext.define('MyDesktop.view.projectmanagement.editproject.budget.accountPayableInfoGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.accountPayableInfoGrid',
	closeAction: 'hide',
	id:'accountPayableInfoGrid',
	
	requires : ['MyDesktop.store.TBudget'],
	initComponent: function() {
		var tbudget = Ext.create('MyDesktop.store.TBudget');
	tbudget.load({params:{start: 0, limit: 50}});
	   tbudget.loadPage(1);
			this.store = tbudget,
			this.columns = [
				{
					dataIndex: 'activity',
                    text: 'Activity',
					flex:1,
				},
				{
					dataIndex: 'currency_rate',
					text: 'Currency',
					flex:1,
				},
				{
					dataIndex: 'unit_of_measurement',
					text: 'Unit Of Measurement',
					flex:1,
				},
				{
					dataIndex: 'rat_usd_gbp',
					text: 'Rate / Unit',
					flex:1,
				},
				{
					dataIndex: 'no_of_unit',
					text: 'No Of Units',
					flex:1,
				},
				{
					dataIndex: 'budgeted_usd_gbp',
					text: 'Budgeted Amount',
					flex:1,
				},
				{
					dataIndex: 'actual_usd_gbp',
					text: 'Actual Amount',
					flex:1,
				},
				/*{
					dataIndex: 'au_nop', 
					text: 'No.of Proof',
					align: 'center',
					flex:1,
				},*/
				
			];

		this.callParent(arguments);

	}
});

