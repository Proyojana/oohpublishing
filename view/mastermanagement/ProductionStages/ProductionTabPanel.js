Ext.define('MyDesktop.view.mastermanagement.ProductionStages.ProductionTabPanel',{
		extend:'Ext.tab.Panel',
		id:'productiontab',
		alias:'widget.productiontab',
	
		
		requires:['MyDesktop.view.mastermanagement.ProductionStages.ProductionForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [
                    {xtype:'productionform'}
                    ]
	});