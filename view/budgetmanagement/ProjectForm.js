
Ext.define('MyDesktop.view.budgetmanagement.ProjectForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.projectform',
   		id:'projectform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.budgetmanagement.ProjectBar'],
    title:'Project-wise and Budgets  ',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		
		
		{
			xtype:'projbar',
			width: 1250,
                  height: 590,
		}
	  		]
	  
	
		this.callParent();
	}
     
}); 
