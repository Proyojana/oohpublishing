
Ext.define('MyDesktop.view.projectmanagement.newproject.team.newprojectTeamHeaderForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.newprojectTeamHeaderForm',
	margin:'0 580 240 0',
	id: 'newprojectTeamHeaderForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	width:1100,
	height:65,
	title:'Header Data',
	defaults: {
		labelWidth: 80,
	},
	// collapsible: true,
	defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		{
			id:'teamHeader_projectID',
			hidden:true
		},
		{
			id:'teamHeader_clientId',
			hidden:true
		},
		{
			id:'teamHeader_workflow',
			hidden:true,
		},
		
		{
		id:'teamHeader_ClientCode',
		fieldLabel: 'Client Code',
		readOnly: true,
		x:10,
		y:0,
		width:220,
	},
	{
		id:'teamHeader_ClientName',
		fieldLabel: 'Client Name',
		margin:'0 0 0 0',
		x:260,
		y:0,
		readOnly: true,
		width:220,
	},
	{
		id:'teamHeader_Job',
		fieldLabel: 'Job #',
		//emptyText:'Example: JOB001',
		readOnly: true,
		x:510,
		y:0,
		width:220,
	
		//labelWidth: 60,
	},
	{
		id:'teamHeader_ProjectName',
		fieldLabel: 'Project Name',
		x:760,
		readOnly: true,
		y:0,
		width:220,
		
	},
	]
	
	this.callParent();
}
});