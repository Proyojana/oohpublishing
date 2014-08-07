Ext.define('MyDesktop.view.projectmanagement.DashboardTabPanel',{
		extend:'Ext.tab.Panel',
		id:'projectdashboardtab',
		alias:'widget.projectdashboardtab',
		
		requires:['MyDesktop.view.projectmanagement.DashboardForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'dashboardform'}]
	});