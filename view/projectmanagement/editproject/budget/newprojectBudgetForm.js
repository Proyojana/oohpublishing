var type = Ext.create('Ext.data.Store', {
        fields: ['id', 'name'],
        data : [
         {"id":"1", "name":"by Project"},
            {"id":"2", "name":"by Activity"}
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.editproject.budget.newprojectBudgetForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.editBudgetForm',
   		id:'editBudgetForm',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	
	requires:['MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetHeaderForm','MyDesktop.view.projectmanagement.editproject.budget.editaccountPayableGrid','MyDesktop.view.projectmanagement.editproject.budget.accountReceivableGrid_a',
	'MyDesktop.view.projectmanagement.editproject.budget.accountReceivableGrid' ],
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		
		{
							xtype:'combo',
							x:10,
							y:10,
							fieldLabel:'Receivable type',
							store: type,
							id:'receive2',
					        queryMode: 'local',
					        displayField: 'name',
					        valueField: 'id',
					        	listeners: {
					        		afterrender: function(combo){
					        	var recordSelected = combo.getStore().getAt(0);                     
                                combo.setValue(recordSelected.get('id'));
                             },
                            change: function(combo) {
                                var val = Ext.getCmp('receive2').getValue();
                                if(val==1){
                                	Ext.getCmp('editaccountReceiveGrid_a').hide();
                                	Ext.getCmp('editaccountReceiveGrid').show();
                                	Ext.getCmp('edit_total_receive_USD').hide();
                                	Ext.getCmp('edit_total_receive_GBP').hide();
                                	Ext.getCmp('edit_total_receive_USD_p').show();
                                		Ext.getCmp('edit_total_receive_GBP_p').show();
                                	
                                }
                                else{
                                		Ext.getCmp('editaccountReceiveGrid').hide();
                                		Ext.getCmp('editaccountReceiveGrid_a').show();
                                		Ext.getCmp('edit_total_receive_USD_p').hide();
                                		Ext.getCmp('edit_total_receive_GBP_p').hide();
                                		Ext.getCmp('edit_total_receive_USD').show();
                                	Ext.getCmp('edit_total_receive_GBP').show();
                                		
                                }
                               } 
                        }
							
					},
				{
							xtype:'editaccountReceiveGrid',
							x:5,
							y:50,
							height:200,
						},
						{
							xtype:'editaccountReceiveGrid_a',
							x:5,
							y:50,
							height:200,
						},
						{
								xtype:'textfield',
								  id:'edit_total_receive_USD',
								  fieldLabel: 'Total Receivable amount in $',
								  x:5,
								  y:260,
								 // width:400,
								  labelWidth: 180,
								},
								{
								xtype:'textfield',
								  id:'edit_total_receive_GBP',
								  fieldLabel: 'Total Receivable amount in £',
								  x:500,
								  y:260,
								  //width:400,
								  labelWidth: 180,
								},
								
								{
								xtype:'textfield',
								  id:'edit_total_receive_USD_p',
								  fieldLabel: 'Total Receivable amount in $',
								  x:5,
								  y:260,
								 // width:400,
								  labelWidth: 180,
								},
								{
								xtype:'textfield',
								  id:'edit_total_receive_GBP_p',
								  fieldLabel: 'Total Receivable amount in £',
								  x:500,
								  y:260,
								  //width:400,
								  labelWidth: 180,
								},
								{
							xtype : 'editaccountPayableGrid',
							x:5,
							y:300,
							height:200,
							},
                            			{
								xtype:'textfield',
								  id:'edit_total_pay_USD',
								  fieldLabel: 'Total Payable amount in $',
								  x:5,
								  y:510,
								 // width:400,
								  labelWidth: 180,
							},
								{
								xtype:'textfield',
								  id:'edit_total_pay_GBP',
								  fieldLabel: 'Total Payable amount in £',
								  x:500,
								  y:510,
								  //width:400,
								  labelWidth: 180,
								  
								},
                           {
						xtype:'textfield',
						  id:'edit_profit_GBP',
						  fieldLabel: 'Project profit £',
						  x:5,
						  y:540,
						  labelWidth: 180,
						
						},
						{
						xtype:'textfield',
						  id:'edit_profit_percentage',
						  fieldLabel: 'Project profit %',
						  x:500,
						  y:540,
						 labelWidth: 180,
						},
	
			]
	  
	
		this.callParent();
	}
     
}); 
