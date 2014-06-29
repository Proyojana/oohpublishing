Ext.define('MyDesktop.view.budgetmanagement.BudgetTabPanel',{
		extend:'Ext.tab.Panel',
		id:'budgettab',
		alias:'widget.budgettab',
		
		requires:['MyDesktop.view.budgetmanagement.BudgetForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'budgetform1'}]
	});