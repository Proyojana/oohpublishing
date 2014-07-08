Ext.define('MyDesktop.view.mastermanagement.Workflow.WorkflowTabPanel',{
		extend:'Ext.tab.Panel',
		id:'workflowtab',
		alias:'widget.workflowtab',
	
		
		requires:['MyDesktop.view.mastermanagement.Workflow.WorkflowForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                    items: [
                    {xtype:'workflowform'}
                    ]
	});