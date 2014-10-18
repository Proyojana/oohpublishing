
Ext.define('MyDesktop.view.projectmanagement.newproject.artwork.CreateprojectArtworkHeaderForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.createprojectArtworkHeaderForm',
	margin:'0 580 240 0',
	id: 'createprojectArtworkHeaderForm',
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
	// collapsible: true,
	defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		{
			id:'add_ArtworkHeader_projectID',
			hidden:true
		},
		{
			id:'add_ArtworkHeader_clientId',
			hidden:true
		},
		{
			id:'add_ArtworkHeader_workflow',
			hidden:true,
		},
		
		{
		id:'add_ArtworkHeader_ClientCode',
		fieldLabel: 'Client Code',
		readOnly: true,
		x:10,
		y:0,
		width:220,
	},
	{
		id:'add_ArtworkHeader_ClientName',
		fieldLabel: 'Client Name',
		margin:'0 0 0 0',
		x:260,
		y:0,
		readOnly: true,
		width:220,
	},
	{
		id:'add_ArtworkHeader_Job',
		fieldLabel: 'Job #',
		//emptyText:'Example: JOB001',
		readOnly: true,
		x:510,
		y:0,
		width:220,
	
		//labelWidth: 60,
	},
	{
		id:'add_ArtworkHeader_ProjectName',
		fieldLabel: 'Project Name',
		x:760,
		readOnly: true,
		y:0,
		width:220,
		
	},
	{
		id:'add_ArtworkHeader_AuthorName',
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