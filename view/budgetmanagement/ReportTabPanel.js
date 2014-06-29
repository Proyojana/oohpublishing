Ext.define('MyDesktop.view.budgetmanagement.ReportTabPanel',{
		extend:'Ext.tab.Panel',
		id:'reporttab',
		alias:'widget.reporttab',
		
		
		requires:['MyDesktop.view.budgetmanagement.ReportGrid'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [
                    {xtype:'reportgrid'}
                    ]
	});