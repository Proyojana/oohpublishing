
if(!Ext.getCmp('dashboardform'))
{
	var dashboardformobject = Ext.create('MyDesktop.view.projectmanagement.DashboardForm');
}

Ext.define('MyDesktop.view.projectmanagement.DashboardTabPanel',{
		extend:'Ext.tab.Panel',
		id:'projectdashboardtab',
		alias:'widget.projectdashboardtab',
		deferredRender: true,
		region: 'center',
        items: [dashboardformobject]
	});