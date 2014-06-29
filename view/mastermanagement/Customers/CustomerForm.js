
Ext.define('MyDesktop.view.mastermanagement.Customers.CustomerForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.customerform',
   		id:'customerform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Customers.CustomerAddForm','MyDesktop.view.mastermanagement.Customers.CustomerGrid'],
    title:'List Of Customers',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'customergrid'
		},
		{
			xtype:'customeraddform',
			x:01,
			y:300
		}
		
		
	  		]
	  
	
		this.callParent();
	}
     
}); 
