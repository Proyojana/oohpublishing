Ext.define('MyDesktop.view.projectmanagement.newproject.NewProjectForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectform',
   		id:'newprojectform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Teams.TeamsGrid','MyDesktop.view.projectmanagement.newproject.NewProjectAddForm','MyDesktop.view.projectmanagement.newproject.CreateNotesGrid'
	,'MyDesktop.view.projectmanagement.newproject.AuthorGrid','MyDesktop.view.projectmanagement.newproject.ContributorsGrid','MyDesktop.view.projectmanagement.newproject.CreateScheduleForm',
	'MyDesktop.view.projectmanagement.newproject.Newbudgetform','MyDesktop.view.projectmanagement.newproject.AdditionalChargesGrid'],
    title:'Create New Project',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'newprojectaddform',
			//xtype:'cityaddform',
						
		},
		{
		xtype:'tabpanel',
		id:'new_project_tab',
		plain:true,
		x:0,
		y:265,
		activeTab: 0,
		height:270,
	/*	defaults: {
			bodyStyle:'padding:10px'
		},*/
		items:[
	/*	{
			xtype:'teamsgrid',
			
			height:260
		},*/
		{
			xtype:'newnotesgrid',
			
			height:260
		},
		{
			xtype:'authorgrid',
			height:260
			
		},
		{
			xtype:'contributorsgrid',
			height:260
		},
		{
			xtype:'createscheduleform',
			height:260
			
		},
		{
			xtype:'newbudgetform',
			height:260
		}	,
		
			{
			xtype:'additionalchargesgrid',
			height:260
		}	
		
		  	]
	 }
			]
	  
	
		this.callParent();
	}
     
}); 
