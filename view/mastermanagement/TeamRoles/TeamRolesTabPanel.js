Ext.define('MyDesktop.view.mastermanagement.Users.TeamRolesTabPanel',{
		extend:'Ext.tab.Panel',
		id:'trolestab',
		alias:'widget.trolestab',
		
		requires:['MyDesktop.view.mastermanagement.TeamRoles.TRolesForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'trolesform'}]
	});