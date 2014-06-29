
Ext.define('MyDesktop.view.mastermanagement.Customers.CustomersForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.customersform',
   		id:'customersform',
    margin: '10 10 10 10',
    //height:280,
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Customers.CustomersGrid','MyDesktop.view.mastermanagement.Customers.BasicInfoForm','MyDesktop.view.mastermanagement.Customers.ContactInfoForm','MyDesktop.view.mastermanagement.Customers.TeamsInfoForm'],
    title:'List Of Customers',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'customersgrid'
		},
		/*{
			xtype:'vendorsaddform',
			x:01,
			y:270
		},*/
		{
		xtype:'tabpanel',
		id:'custtab',
		plain:true,
		x:5,
		y:200,
		activeTab: 0,
		height:340,
		defaults: {
			bodyStyle:'padding:10px'
		},
		items:[{
			//iconCls: 'personalinfo',
			xtype:'custbasicinfoform'
		},
		{
			//iconCls: 'contactinfo',
			xtype:'custcontactsform'
		},
		{
			//iconCls: 'familyinfo',
			xtype:'custteamform'
		}
		
		]
	}
	
		
		
	  		]
	  
	
		this.callParent();
	}
     
}); 
