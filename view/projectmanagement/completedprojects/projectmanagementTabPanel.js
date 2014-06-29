Ext.define('MyDesktop.view.projectmanagement.completedprojects.projectmanagementTabPanel',{
		extend:'Ext.tab.Panel',
		id:'projectmanagementCPtab',
		alias:'widget.projectmanagementCPtab',
		
		requires:['MyDesktop.view.projectmanagement.completedprojects.PubForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'pubformCP'}]
	});