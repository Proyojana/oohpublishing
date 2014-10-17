
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
	requires:['MyDesktop.view.mastermanagement.Vendors.VendorsGrid','MyDesktop.view.mastermanagement.Vendors.BasicInfoForm','MyDesktop.view.mastermanagement.Vendors.ContactInfoForm','MyDesktop.view.mastermanagement.Vendors.TeamsInfoForm','MyDesktop.view.mastermanagement.Vendors.RateCardGrid','MyDesktop.view.mastermanagement.Vendors.CurrentProjects','MyDesktop.view.mastermanagement.Vendors.HistoryProjects'],
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
			//bodyStyle:'padding:10px'
		},
		listeners: {
						afterrender:function(){
							
							Ext.getCmp('Vendors_teamformTab').setDisabled(true);
							Ext.getCmp('Vendors_contactTab').setDisabled(true);
							Ext.getCmp('Vendors_ratecardgridTab').setDisabled(true);
						}
					},
		items:[{
			
			xtype:'basicinfoform'
		},
		{
			//iconCls: 'contactinfo',
			id:'Vendors_contactTab',
			xtype:'contactsform'
		},
		{
			//iconCls: 'familyinfo',
			id:'Vendors_teamformTab',
			xtype:'teamform'
		},
		{
			id:'Vendors_ratecardgridTab',
			xtype:'ratecardgrid',
		//	width:500,
			//height:450,
		},
		{
			id:'Vendors_currentprojectsgridTab',
			xtype:'vendorcurrentprojects',
		//	width:500,
			//height:450,
		},
			{
			id:'Vendors_histryprojectsgridTab',
			xtype:'vendorhistryprojects',
		//	width:500,
			//height:450,
		},
		
		
		]
	}
	
		
		
	  		]
	  
	
		this.callParent();
	}
     
}); 
