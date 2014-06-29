
Ext.define('MyDesktop.view.budgetmanagement.BudgetForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.budgetform1',
   		id:'budgetform1',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.budgetmanagement.DashboardBuget'],
    title:'Budget',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'budgetdashboard',
			width: 1250,
                  height: 590,
		},
		
	  		]
	  
	
		this.callParent();
	}
     
}); 
