Ext.define('MyDesktop.view.projectmanagement.Reports.ProjectReportTabPanel',{
		extend:'Ext.tab.Panel',
		id:'projectreporttab',
		alias:'widget.projectreporttab',
		
		requires:['MyDesktop.view.projectmanagement.Reports.ProjectReportGrid'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [
                    {
                                     	
                   xtype:'projectreportgrid'
                    }
                    ]
	});