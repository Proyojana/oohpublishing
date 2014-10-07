var required = '<span style= "color:red;font-weight:bold" data-qtip="Required">*</span>';
var times = Ext.create('Ext.data.Store', {
        fields: ['unit'],
        data : [
           {"unit":"Rate / Unit in USD"},
           {"unit":"Rate / Unit in GBP"}
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetHeaderForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.newprojectBudgetHeaderForm',
	margin:'0 580 240 0',
	id: 'newprojectBudgetHeaderForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	width:1050,
	height:110,
	title:'Header Data',
	defaults: {
		labelWidth: 100,
	},
	
	defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		{
			id:'budgetHeader_projectID',
			hidden:true
		},
		{
			id:'budgetHeader_clientId',
			hidden:true
		},
		{
			id:'budgetHeader_workflow',
			hidden:true,
		},
		
		{
		id:'budgetHeader_ClientCode',
		fieldLabel: 'Client Code',
		readOnly: true,
		x:10,
		y:10,
		width:220,
	},
	{
		id:'budgetHeader_ClientName',
		fieldLabel: 'Client Name',
		margin:'0 0 0 0',
		x:260,
		y:10,
		readOnly: true,
		width:220,
	},
	{
		id:'budgetHeader_Job',
		fieldLabel: 'Job #',
		//emptyText:'Example: JOB001',
		readOnly: true,
		x:510,
		y:10,
		width:220,
		
	},
	{
		id:'budgetHeader_ProjectName',
		fieldLabel: 'Project Name',
		x:760,
		readOnly: true,
		y:10,
		width:220,
		
	},
		
	{
		id:'budgetHeader_castoffextent',
		fieldLabel: 'Cast Off Extent',
		x:10,
		readOnly: true,
		y:40,
		width:220,
		
	},
	{
		id:'budgetHeader_confirmedextent',
		fieldLabel: 'Confirmed Extent',
		x:260,
		readOnly: true,
		y:40,
		width:220,
		
	},
	{
		id:'budgetHeader_ponumber1',
		fieldLabel: 'PO Numbers',
		x:510,
		y:40,
		
	},
	{
		id:'budgetHeader_ponumber2',
		x:760,
		y:40,
	},
	
	]
	
	this.callParent();
}
});