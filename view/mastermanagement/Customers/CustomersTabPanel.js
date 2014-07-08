Ext.define('MyDesktop.view.mastermanagement.Customers.CustomersTabPanel',{
		extend:'Ext.tab.Panel',
		id:'customerstab',
		alias:'widget.customerstab',
		
		requires:['MyDesktop.view.mastermanagement.Customers.CustomersForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
					
                    items: [{xtype:'customersform'}]
	});