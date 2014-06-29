
Ext.define('MyDesktop.view.mastermanagement.Vendors.VendorsForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.vendorsform',
   		id:'vendorsform',
    margin: '10 10 10 10',
    //height:280,
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:[/*'MyDesktop.view.mastermanagement.Vendors.VendorsAddForm',*/'MyDesktop.view.mastermanagement.Vendors.VendorsGrid','MyDesktop.view.mastermanagement.Vendors.BasicInfoForm','MyDesktop.view.mastermanagement.Vendors.ContactInfoForm','MyDesktop.view.mastermanagement.Vendors.TeamsInfoForm'],
    title:'List Of Vendors',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'vendorsgrid'
		},
		/*{
			xtype:'vendorsaddform',
			x:01,
			y:270
		},*/
		{
		xtype:'tabpanel',
		id:'tab',
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
			xtype:'basicinfoform'
		},
		{
			//iconCls: 'contactinfo',
			xtype:'contactsform'
		},
		{
			//iconCls: 'familyinfo',
			xtype:'teamform'
		}
		
		]
	}
	
		
		
	  		]
	  
	
		this.callParent();
	}
     
}); 
