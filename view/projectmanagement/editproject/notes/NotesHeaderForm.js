
Ext.define('MyDesktop.view.projectmanagement.editproject.notes.NotesHeaderForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.NotesHeaderForm',
	
	id: 'NotesHeaderForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	width:1100,
	height:95,
	title:'Header Data',
	defaults: {
		labelWidth: 80,
	},
	defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		{
			id:'editnotesHeader_projectID',
			hidden:true
		},
		
		{
			id:'editnotesHeader_workflow',
			hidden:true,
		},
		
		{
		id:'editnotesHeader_ClientCode',
		fieldLabel: 'Client Code',
		readOnly: true,
		x:10,
		y:0,
		width:220,
	},
	{
		id:'editnotesHeader_ClientName',
		fieldLabel: 'Client Name',
		margin:'0 0 0 0',
		x:260,
		y:0,
		readOnly: true,
		width:220,
	},
	{
		id:'editnotesHeader_Job',
		fieldLabel: 'Job #',
		//emptyText:'Example: JOB001',
		readOnly: true,
		x:510,
		y:0,
		width:220,
	
	},
	{
		id:'editnotesHeader_ProjectName',
		fieldLabel: 'Project Name',
		x:760,
		readOnly: true,
		y:0,
		width:220,
		
	},
	{
		id:'editnotesHeader_AuthorName',
		fieldLabel: 'Author Name',
		x:10,
		readOnly: true,
		y:30,
		width:220,
		
	},
	]
	
	this.callParent();
}
});