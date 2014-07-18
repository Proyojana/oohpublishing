var required = '<span style= "color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newprojectBudget.accountsReceivableForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.accountsReceivableForm',
	//margin:'0 580 240 0',
	id: 'accountsReceivableForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	/*width:1100,
	height:105,*/
	title:'Budgets Accounts Receivables',
	defaults: {
		labelWidth: 180,
	},
	 collapsible: true,
	defaultType: 'textfield',
	
	initComponent:function(){
		
	
		this.items= [
		
		{
		//id:'hrcompanycode',
		fieldLabel: 'Cast Off Extent',
		readOnly: true,
		x:10,
		y:10,
		width:320,
		
	},
	{
		//id:'hrcompanyname',
		fieldLabel: 'Confirmed Extent',
		margin:'0 0 0 0',
		x:360,
		y:10,
		readOnly: true,
		width:320,
		
	},
	{
		//id:'hrcompanygroup',
		fieldLabel: 'Unit ',
		readOnly: true,
		x:710,
		y:10,
		labelWidth:90,
		width:240,
		
	},
	{
		//id:'hrcmplocation',
		fieldLabel: 'Rate / Unit in USD',
		x:10,
		readOnly: true,
		y:50,
		width:320,
		
		
	},
	{
		//id:'hrcmplocation',
		fieldLabel: 'Rate / Unit in GBP',
		x:360,
		readOnly: true,
		y:50,
		width:320,
		
		
	},
	{
		//id:'hrcmplocation',
		fieldLabel: ' Actual Billable Units #',
		x:10,
		readOnly: true,
		y:80,
		width:320,
		
		
	},
	{
		//id:'hrcmplocation',
		fieldLabel: 'Actual Billable Amount in USD',
		x:360,
		readOnly: true,
		y:80,
		width:320,
		
		
	},
	{
		//id:'hrcmplocation',
		fieldLabel: 'Total Value of the Contract in USD',
		x:10,
		readOnly: true,
		y:110,
		width:320,
		
		
	},
	]
	
	this.callParent();
}
});