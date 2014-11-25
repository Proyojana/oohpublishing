Ext.define('MyDesktop.view.mastermanagement.currentprojects.budgetForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.budgetform',
   		id:'budgetform',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	requires:['MyDesktop.view.projectmanagement.currentprojects.budgetGrid','MyDesktop.view.projectmanagement.currentprojects.budgetaddform','MyDesktop.view.projectmanagement.currentprojects.budgetorderform'],
   title:'Budget Payables',
    defaults: {
        
        labelWidth: 70,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
		{
		xtype : 'budgetgrid',
		title:'Budget',
		
		height:400,
		x:10,
		y:10
		},
	/*{
		xtype : 'budgetaddform1',
		//title:'Schedule for production',
		anchor:'78% 82%',
		x:'52%',
		y:10
		},
		{
		xtype : 'budgetorderform',
		//title:'Schedule for production',
			width:200,
		height:170,
		x:'80%',
		y:10
		},*/
		
		
			]
	  
	
		this.callParent();
	}
     
}); 


