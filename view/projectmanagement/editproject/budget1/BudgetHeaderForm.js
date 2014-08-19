
Ext.define('MyDesktop.view.projectmanagement.editproject.budget.BudgetHeaderForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.BudgetHeaderForm',
	
	id: 'BudgetHeaderForm',
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
	defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		{
			id:'editbudgetHeader_projectID',
			hidden:true
		},
		
		{
			id:'editbudgetHeader_workflow',
			hidden:true,
		},
		
		{
		id:'editbudgetHeader_ClientCode',
		fieldLabel: 'Client Code',
		readOnly: true,
		x:10,
		y:0,
		width:220,
	},
	{
		id:'editbudgetHeader_ClientName',
		fieldLabel: 'Client Name',
		margin:'0 0 0 0',
		x:260,
		y:0,
		readOnly: true,
		width:220,
	},
	{
		id:'editbudgetHeader_Job',
		fieldLabel: 'Job #',
		//emptyText:'Example: JOB001',
		readOnly: true,
		x:510,
		y:0,
		width:220,
	
	},
	{
		id:'editbudgetHeader_ProjectName',
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