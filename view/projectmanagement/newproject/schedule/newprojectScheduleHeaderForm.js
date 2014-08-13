
Ext.define('MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleHeaderForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.newprojectScheduleHeaderForm',
	margin:'0 580 240 0',
	id: 'newprojectScheduleHeaderForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	width:1100,
	height:65,
	title:'Header Data',
	defaults: {
		labelWidth: 115,
	},
	// collapsible: true,
	defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		{
			id:'scheduleHeader_projectID',
			hidden:true
		},
		{
			id:'scheduleHeader_clientId',
			hidden:true
		},
		{
			id:'scheduleHeader_workflow',
			hidden:true,
		},
		
		{
		id:'scheduleHeader_ClientCode',
		fieldLabel: 'Client Code',
		readOnly: true,
		x:10,
		y:0,
		width:260,
	},
	{
		id:'scheduleHeader_ClientName',
		fieldLabel: 'Client Name',
		margin:'0 0 0 0',
		x:280,
		y:0,
		readOnly: true,
		width:260,
	},
	{
		id:'scheduleHeader_Job',
		fieldLabel: 'Job #',
		//emptyText:'Example: JOB001',
		readOnly: true,
		x:550,
		y:0,
		width:260,
	
		labelWidth: 90,
	},
	{
		id:'scheduleHeader_ProjectName',
		fieldLabel: 'Project Name',
		x:820,
		readOnly: true,
		y:0,
		width:260,
		
	},
	]
	
	this.callParent();
}
});