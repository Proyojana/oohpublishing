Ext.define('MyDesktop.view.mastermanagement.CurrencyRate.CurrencyRateTabPanel',{
		extend:'Ext.tab.Panel',
		id:'currencyratetab',
		alias:'widget.currencyratetab',
		
		requires:['MyDesktop.view.mastermanagement.CurrencyRate.CurrencyRateForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
					
                    items: [{xtype:'currencyrateform'}]
	});