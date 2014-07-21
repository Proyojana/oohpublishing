Ext.define('MyDesktop.view.projectmanagement.newproject.budget.newprojectBudgetForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectBudgetform',
   		id:'newprojectBudgetform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	title:'Budget',
	requires:['MyDesktop.view.projectmanagement.newproject.budget.budgetGrid','MyDesktop.view.projectmanagement.newproject.budget.newprojectBudgetAddForm','MyDesktop.view.projectmanagement.newproject.budget.additionalChargesForm' ],
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'newprojectBudgetgrid',
		},
		
		{
		xtype:'tabpanel',
		id:'newprojectBudgetformtab',
		plain:true,
		x:5,
		y:230,
		activeTab: 0,
		height:290,
		defaults: {
			bodyStyle:'padding:10px'
		},
		items:[{
			xtype:'newprojectBudgetAddForm',
					},
		{
			xtype:'additionalChargesForm'
		}
		]
		},
	
			]
	  
	
		this.callParent();
	}
     
}); 
