Ext.define('MyDesktop.view.mastermanagement.Services.ServiceTabPanel',{
		extend:'Ext.tab.Panel',
		id:'servicetab',
		alias:'widget.servicetab',
		
		requires:['MyDesktop.view.mastermanagement.Services.ServiceForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'serviceform'}]
	});