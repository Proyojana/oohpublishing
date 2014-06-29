Ext.define('MyDesktop.view.budgetmanagement.budgetmanagementTabPanel',{
		extend:'Ext.tab.Panel',
		id:'budgetmanagementtab',
		alias:'widget.budgetmanagementtab',
		
		requires:[/*'MyDesktop.view.projectmanagement.PubForm'*/],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [/*{xtype:'pubform'}*/]
	});