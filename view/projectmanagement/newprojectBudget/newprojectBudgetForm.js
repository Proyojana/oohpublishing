Ext.define('MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectBudgetForm',
   		id:'newprojectBudgetForm',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	title:'Budget',
	requires:['MyDesktop.view.projectmanagement.newprojectBudget.newprojectBudgetHeaderForm','MyDesktop.view.projectmanagement.newprojectBudget.accountPayableGrid','MyDesktop.view.projectmanagement.newprojectBudget.accountsReceivableForm' ],
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'newprojectBudgetHeaderForm',
		},
		
		{
		xtype:'tabpanel',
		id:'newprojectBudgetAccountForm',
		plain:true,
		x:5,
		y:120,
		activeTab: 0,
		height:370,
		
		items:[{
			
			xtype:'accountPayableGrid'
		},
		{
			
			xtype:'accountsReceivableForm'
		}
		]
		},
	
			]
	  
	
		this.callParent();
	}
     
}); 
