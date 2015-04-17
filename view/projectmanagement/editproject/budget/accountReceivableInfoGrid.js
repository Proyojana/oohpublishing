Ext.define('MyDesktop.view.projectmanagement.editproject.budget.accountReceivableInfoGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.accountReceivableInfoGrid',
	closeAction: 'hide',
	id:'accountReceivableInfoGrid',
	
	requires : ['MyDesktop.store.TBudgetpay'],
	initComponent: function() {
		var tbudgetpay = Ext.create('MyDesktop.store.TBudgetpay');
	tbudgetpay.load({params:{start: 0, limit: 50}});
	   tbudgetpay.loadPage(1);
			this.store = tbudgetpay,
			this.columns = [
				{
					dataIndex: 'activitys',
                    text: 'Activity',
					flex:1,
				},
				{
					dataIndex: 'vendor',
                    text: 'Vendor',
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
					dataIndex: 'rate_USD_GBP',
					text: 'Rate / Unit',
					flex:1,
				},
				{
					dataIndex: 'no_of_unit',
					text: 'No Of Units',
					flex:1,
				},
				{
					dataIndex: 'budgeted_amount_USD_GBP',
					text: 'Budgeted Amount',
					flex:1,
				},
				{
					dataIndex: 'acual_amount_USD_GBP',
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

