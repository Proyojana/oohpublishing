var required = '<span style= "color:red;font-weight:bold" data-qtip="Required">*</span>';
var actual = Ext.create('Ext.data.Store', {
        fields: ['period1', 'name1'],
        data : [
         {"period1":"Per Page", "name1":"Per Page"},
            {"period1":"Per Activity", "name1":"Per Activity"},
            
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.editproject.budget.accountsReceivableForm' , {
	 extend: 'Ext.form.Panel',
	alias : 'widget.edit_accountsReceivableForm',
	//margin:'0 580 240 0',
	id: 'edit_accountsReceivableForm',
	layout: {
              type: 'absolute'
            },
	frame:true,
	//requires:['MyDesktop.view.account.accountsreceivableAddForm'],
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
			id:'projectid',
			hidden:true
		},
		
		{
		id:'edit_cast_off_extent_ar',
		fieldLabel: 'Cast Off Extent',
		x:10,
		y:10,
		width:320,
		allowBlank:false,
		afterLabelTextTpl: required,
		
	},
	{
		id:'edit_confirmed_extent_ar',
		fieldLabel: 'Confirmed Extent',
		margin:'0 0 0 0',
		x:360,
		y:10,
		width:320,
		afterLabelTextTpl: required,
		allowBlank:false,
		
	},
	{
		id:'edit_unit_acount_receivable',
		fieldLabel: 'Unit',
		xtype:'combo',
		store:actual,
		queryMode: 'local',
		displayField: 'name1',
		afterLabelTextTpl: required,
		valueField: 'period1',
		x:10,
		y:50,
		width:320,
		afterLabelTextTpl: required,
		allowBlank:false,
		
	},
	{
		id:'edit_unit_usd_ar',
		fieldLabel: 'Rate / Unit in $',
		x:360,
		y:50,
		width:320,
		afterLabelTextTpl: required,
		allowBlank:false,
		
	},
	{
		id:'edit_unit_gbp_ar',
		fieldLabel: 'Rate / Unit in £',
		x:710,
		y:50,
		width:320,
		afterLabelTextTpl: required,
		allowBlank:false,
		
	},
	{
		id:'edit_actual_billable_ar',
		fieldLabel: ' Actual Billable Units ',
		x:10,
		y:90,
		width:320,
		afterLabelTextTpl: required,
		allowBlank:false,
		listeners : {
        change : function (f, e){
            var unit_usd=Ext.getCmp('edit_unit_usd_ar').getValue();
            var unit_gbp=Ext.getCmp('edit_unit_gbp_ar').getValue();
            var amount_usd=unit_usd*e;
            var amount_gbp=unit_gbp*e;
            Ext.getCmp('edit_actual_billable_usd_ar').setValue(amount_usd);
            Ext.getCmp('edit_actual_billable_gbp_ar').setValue(amount_gbp);
            Ext.getCmp('edit_total_contract_usd').setValue(amount_usd);
            Ext.getCmp('edit_total_contract_gbp').setValue(amount_gbp);
            
        }
    }
		
	},
	{
		id:'edit_actual_billable_usd_ar',
		fieldLabel: 'Actual Billable Amount in $',
		x:360,
		y:90,
		width:320,
		readOnly: true,
		afterLabelTextTpl: required,
		allowBlank:false,
		
	},
	{
		id:'edit_actual_billable_gbp_ar',
		fieldLabel: 'Actual Billable Amount in £',
		x:710,
		readOnly: true,
		y:90,
		width:320,
		afterLabelTextTpl: required,
		allowBlank:false,
		
	},
	{	id:'edit_total_contract_usd',
		fieldLabel:'Total Value of the Contract in $',
		x:10,
		readOnly: true,
		y:130,
		width:320,
		
	},
	{	id:'edit_total_contract_gbp',
		fieldLabel:'Total Value of the Contract in £',
		x:360,
		readOnly: true,
		y:130,
		width:320,
		
	},
	{
			xtype:'button',
    	    text:'Update',
    	    iconCls: 'button_add',
    	    id:'edit_account',
			x:350,
			y:220,
			width:75,
			handler: function (){				
				var currentForm = Ext.getCmp('edit_accountsReceivableForm');
				var edit_cast_off_extent = Ext.getCmp('edit_cast_off_extent_ar').getValue();
				var edit_confirmed_extent = Ext.getCmp('edit_confirmed_extent_ar').getValue();
				var edit_unit_account_receivable = Ext.getCmp('edit_unit_acount_receivable').getValue();
				var edit_unit_usd_ar= Ext.getCmp('edit_unit_usd_ar').getValue();
				var edit_unit_gbp_ar = Ext.getCmp('edit_unit_gbp_ar').getValue();
				var edit_actual_billable_ar = Ext.getCmp('edit_actual_billable_ar').getValue();
				var edit_actual_billable_usd_ar = Ext.getCmp('edit_actual_billable_usd_ar').getValue();
				var edit_actual_billable_gbp_ar= Ext.getCmp('edit_actual_billable_gbp_ar').getValue();
				var edit_total_contract_usd = Ext.getCmp('edit_total_contract_usd').getValue();
				var edit_total_contract_gbp= Ext.getCmp('edit_total_contract_gbp').getValue();
				var projectid = Ext.getCmp("projectid").getValue();
				/*if(currentForm.getForm().isValid()== true )
				{*/
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/EditProjects.php',
						method: 'POST',
						params : { action:5,projectid:projectid,edit_cast_off_extent:edit_cast_off_extent,edit_confirmed_extent:edit_confirmed_extent,edit_unit_account_receivable:edit_unit_account_receivable,
							edit_unit_usd_ar:edit_unit_usd_ar,edit_unit_gbp_ar:edit_unit_gbp_ar,edit_actual_billable_ar:edit_actual_billable_ar,edit_actual_billable_usd_ar:edit_actual_billable_usd_ar,edit_actual_billable_gbp_ar:edit_actual_billable_gbp_ar,
							edit_total_contract_usd:edit_total_contract_usd,edit_total_contract_gbp:edit_total_contract_gbp},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							
										
						}
					});
				/*}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}*/
			}
	  	},
	  	{
			xtype: 'button',
		  	text: 'Reset',
		  	iconCls: 'button_reset',
		  	id:'edit_accoun_reset',
			x:500,
			y:220,
			width:75,
			handler: function (){
				var currentForm = this.up('accountsReceivableForm');
				currentForm.getForm().reset();
			}
			
	  	}
	]
	
	this.callParent();
}
});