Ext.define('MyDesktop.view.mastermanagement.Customers.CustomerTabPanel',{
		extend:'Ext.tab.Panel',
		id:'customertab',
		alias:'widget.customertab',
		
		requires:['MyDesktop.view.mastermanagement.Customers.CustomerForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'customerform'}]
	});