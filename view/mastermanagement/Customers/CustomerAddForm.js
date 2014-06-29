var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.mastermanagement.Vendors.VendorsAddForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.customeraddform',
   		id:'customeraddform',
    margin: '10 10 10 10',
    requires:['MyDesktop.view.mastermanagement.Customers.ContactGrid'],
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:270,
    title:'Add/Edit Customers',
    defaults: {
        labelWidth: 90,
    },
    defaultType: 'textfield',
	initComponent:function(){
		
		this.items= [
			{
			id:'customer_id',
			hidden:true
			},
			{
			id:'customer_code',
			fieldLabel: 'Code',
			Name: 'customer_code',
			align:'center',
			x:10,
			y:10,
			width:260,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
		{
			id:'customer_name',
			fieldLabel: 'Name',
			name: 'customer_name',
			x:10,
			y:40,
			width:260,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	
		{   xtype: 'textareafield',
			id:'customer_description',
			fieldLabel: 'Description',
			name: 'customer_description',
			x:10,
			y:70,
			width:260,
				
    	},
    	{   xtype: 'textareafield',
			id:'customer_address1',
			fieldLabel: 'Address1',
			name: 'customer_address1',
			x:300,
			y:10,
			width:260,
			height:40
				
    	},
    	{   xtype: 'textareafield',
			id:'customer_address2',
			fieldLabel: 'Address2',
			name: 'customer_address2',
			x:300,
			y:60,
			width:260,
			height:40
				
    	},
    	{
			id:'cust_city',
			fieldLabel: 'City',
			name: 'city',
			x:300,
			y:110,
			width:260,
			allowBlank: false,
			
    	},
    	{
			id:'cust_state',
			fieldLabel: 'State',
			name: 'state',
			x:580,
			y:10,
			width:260,
			allowBlank: false,
			
    	},
    	
    	{
			id:'cust_pin',
			fieldLabel: 'Pin/Zip',
			name: 'pin',
			x:580,
			y:40,
			width:260,
			allowBlank: false,
			
    	},
    	{
			id:'cust_phone',
			fieldLabel: 'Phone',
			name: 'phone',
			x:580,
			y:70,
			width:260,
			allowBlank: false,
			
    	},
    	{
			id:'cust_email',
			fieldLabel: 'E-mail',
			name: 'email',
			x:580,
			y:100,
			width:260,
			allowBlank: false,
			
    	},
    	{
    		xtype:'Ccontactgrid',
    		x:845,
    		y:10,
    		width:215,
    		//height:200,
    	},
        {
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	  // id:'Add_freelancer',
			x:350,
			y:180,
			width:75,
		/*	handler: function (){				
				var currentForm = this.up('vendorsform');
				var vendor_code = Ext.getCmp('vendor_code').getValue();
				var vendor_name = Ext.getCmp('vendor_name').getValue();
				var vendor_description= Ext.getCmp('vendor_description').getValue();
				
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/vendors.php',
						method: 'POST',
						params : {action:5,vendor_code:vendor_code,vendor_name:vendor_name,vendor_description:vendor_description},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('vendorsgrid').getStore().reload();
							Ext.getCmp('vendorstab').layout.setActiveItem('vendorsgrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
			}*/
	  	},
		
		{
			xtype: 'button',
		  	text: 'Edit',
		  	iconCls: 'editClass',
		  //	id:'edit_freelancer',
			align:'center',
			x:450,
			y:180,
			width:75,
		/*	handler: function ()
			   {
			   var currentForm = this.up('freelancermasterform');
				var code = Ext.getCmp('Code').getValue();
				var id=Ext.getCmp('Id').getValue();
				var name = Ext.getCmp('Name').getValue();
				var desc= Ext.getCmp('freelancerDescription').getValue();
				
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/vendors.php',
						method: 'POST',
						params : {action:4,Id:id,Code:code,Name:name,Description:desc},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('freelancermastergrid').getStore().reload();
							Ext.getCmp('freelancermastertab').layout.setActiveItem('freelancermastergrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
			}*/
	  	},
		
	  	{
			xtype: 'button',
		  	text: 'Reset',
		  	iconCls: 'button_reset',
		  //	id:'reset_freelancer',
			x:550,
			y:180,
			width:75,
		/*	handler: function (){
				var currentForm = this.up('freelancermasterform');
				currentForm.getForm().reset();
			}*/
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


