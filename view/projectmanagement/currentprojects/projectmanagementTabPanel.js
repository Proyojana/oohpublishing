Ext.define('MyDesktop.view.projectmanagement.currentprojects.projectmanagementTabPanel',{
		extend:'Ext.tab.Panel',
		id:'projectmanagementtab',
		alias:'widget.projectmanagementtab',
		
		requires:['MyDesktop.view.projectmanagement.currentprojects.PubForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'pubform'}]
	});