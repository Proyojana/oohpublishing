Ext.define('MyDesktop.view.mastermanagement.Vendors.VendorsTabPanel',{
		extend:'Ext.tab.Panel',
		id:'vendorstab',
		alias:'widget.vendorstab',
		
		requires:['MyDesktop.view.mastermanagement.Vendors.VendorsForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [{xtype:'vendorsform'}]
	});