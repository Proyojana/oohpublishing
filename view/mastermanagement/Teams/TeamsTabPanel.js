Ext.define('MyDesktop.view.mastermanagement.Teams.TeamsTabPanel',{
		extend:'Ext.tab.Panel',
		id:'teamstab',
		alias:'widget.teamstab',
		
		requires:['MyDesktop.view.mastermanagement.Teams.TeamsForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'teamsform'}]
	});