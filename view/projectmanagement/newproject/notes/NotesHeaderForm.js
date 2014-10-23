
Ext.define('MyDesktop.view.projectmanagement.newproject.notes.NotesHeaderForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.newprojectNotesHeaderForm',
	
	id: 'newprojectNotesHeaderForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	width:1100,
	height:90,
	title:'Header Data',
	defaults: {
		labelWidth: 80,
	},
	defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		{
			id:'addnotesHeader_projectID',
			hidden:true
		},
		
		{
			id:'addnotesHeader_workflow',
			hidden:true,
		},
		
		{
		id:'addnotesHeader_ClientCode',
		fieldLabel: 'Client Code',
		readOnly: true,
		x:10,
		y:0,
		width:220,
	},
	{
		id:'addnotesHeader_ClientName',
		fieldLabel: 'Client Name',
		margin:'0 0 0 0',
		x:260,
		y:0,
		readOnly: true,
		width:220,
	},
	{
		id:'addnotesHeader_Job',
		fieldLabel: 'Job #',
		//emptyText:'Example: JOB001',
		readOnly: true,
		x:510,
		y:0,
		width:220,
	
	},
	{
		id:'addnotesHeader_ProjectName',
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