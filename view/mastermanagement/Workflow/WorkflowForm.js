
Ext.define('MyDesktop.view.mastermanagement.Workflow.WorkflowForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.workflowform',
   		id:'workflowform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Workflow.WorkflowGrid','MyDesktop.view.mastermanagement.Workflow.GeneralInfoForm','MyDesktop.view.mastermanagement.Workflow.StagesGrid'],
    title:'Workflow',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'workflowgrid'
		},
		{
		xtype:'tabpanel',
		id:'worktab',
		plain:true,
		x:5,
		y:270,
		activeTab: 0,
		height:340,
		defaults: {
			},
		items:[{
			
			xtype:'generalinfoform'
		},
		{
			
			xtype:'stagesgrid'
		},
	
		
		]
	}
		
	  		]
	  
	
		this.callParent();
	}
     
}); 
