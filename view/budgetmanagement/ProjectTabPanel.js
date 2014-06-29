Ext.define('MyDesktop.view.budgetmanagement.ProjectTabPanel',{
		extend:'Ext.tab.Panel',
		id:'projecttab',
		alias:'widget.projecttab',
		
		requires:['MyDesktop.view.budgetmanagement.ProjectForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'projectform'}]
	});