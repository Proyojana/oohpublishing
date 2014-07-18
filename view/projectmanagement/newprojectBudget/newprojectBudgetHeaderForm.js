var required = '<span style= "color:red;font-weight:bold" data-qtip="Required">*</span>';
var times = Ext.create('Ext.data.Store', {
        fields: ['unit'],
        data : [
           {"unit":"Rate / Unit in USD"},
           {"unit":"Rate / Unit in GBP"}
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetHeaderForm' , {
	 extend: 'Ext.form.FieldSet',
	alias : 'widget.newprojectBudgetHeaderForm',
	margin:'0 580 240 0',
	id: 'newprojectBudgetHeaderForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	width:1100,
	height:105,
	title:'Header Data',
	defaults: {
		labelWidth: 80,
	},
	 collapsible: true,
	defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		
		{
		//id:'hrcompanycode',
		fieldLabel: 'Client Code',
		readOnly: true,
		x:10,
		y:10,
		width:240,
	},
	{
		//id:'hrcompanyname',
		fieldLabel: 'Client Name',
		margin:'0 0 0 0',
		x:310,
		y:10,
		readOnly: true,
		width:240,
	},
	{
		//id:'hrcompanygroup',
		fieldLabel: 'Job #',
		readOnly: true,
		x:610,
		y:10,
		width:240,
		//labelWidth: 60,
	},
	{
		//id:'hrcmplocation',
		fieldLabel: 'Project Name',
		x:10,
		readOnly: true,
		y:40,
		width:240,
		
	},
	{
		//id:'hrcmplocation',
		xtype:'combo',
		fieldLabel: 'Currency',
		x:310,
		//readOnly: true,
		y:40,
		width:240,
		store:times,
		displayField:'unit'
		
	},
	]
	
	this.callParent();
}
});