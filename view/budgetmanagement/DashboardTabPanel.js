Ext.define('MyDesktop.view.budgetmanagement.DashboardTabPanel',{
		extend:'Ext.tab.Panel',
		id:'budgetdashboardtab',
		alias:'widget.budgetdashboardtab',
		
		requires:['MyDesktop.view.budgetmanagement.DualbarForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'dualbarform_budget'}]
	});