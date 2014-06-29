Ext.define('MyDesktop.view.mastermanagement.Users.UsersTabPanel',{
		extend:'Ext.tab.Panel',
		id:'userstab',
		alias:'widget.userstab',
		
		requires:['MyDesktop.view.mastermanagement.Users.UsersForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'usersform'}]
	});