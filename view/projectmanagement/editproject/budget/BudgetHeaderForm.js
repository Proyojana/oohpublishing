
Ext.define('MyDesktop.view.projectmanagement.editproject.budget.BudgetHeaderForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.BudgetHeaderForm',
	
	id: 'BudgetHeaderForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	width:1100,
	height:140,
	title:'Header Data',
	defaults: {
		labelWidth: 90,
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
		labelWidth: 98,
		x:260,
		y:0,
		readOnly: true,
		width:220,
	},
	{
		id:'edit_Job_code',
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
		width:300,
		
	},
		
	{
		id:'editbudgetHeader_castoffextent',
		fieldLabel: 'Cast Off Extent',
		x:10,
		readOnly: true,
		y:30,
		width:220,
		
	},
	{
		id:'editbudgetHeader_confirmedextent',
		fieldLabel: 'Confirmed Extent',
		x:260,
		labelWidth: 98,
		readOnly: true,
		y:30,
		width:220,
		
	},
	{
		id:'edit_budgetHeader_ponumber1',
		fieldLabel: 'PO Numbers',
		x:510,
		y:30,
		
	},
	{
		id:'edit_budgetHeader_ponumber2',
		x:760,
		y:30,
	},
	{
		fieldLabel: 'Invoice Date',
		xtype:'datefield',
		x:10,
		y:70,
		
	},
	]
	this.callParent();
}
});