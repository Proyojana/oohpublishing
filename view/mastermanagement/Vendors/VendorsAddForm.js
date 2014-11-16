var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.mastermanagement.Vendors.VendorsAddForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.vendorsaddform',
   		id:'vendorsaddform',
    margin: '10 10 10 10',
    requires:['MyDesktop.view.mastermanagement.Vendors.ContactGrid'],
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:270,
    title:'Add/Edit Vendors',
    defaults: {
        labelWidth: 90,
    },
    defaultType: 'textfield',
	initComponent:function(){
		
		this.items= [
			{
			id:'vendor_id',
			hidden:true
			},
			{
			id:'vendor_code',
			fieldLabel: 'Code',
			Name: 'vendor_code',
			align:'center',
			x:10,
			y:10,
			width:260,
			allowBlank: false,
			readOnly: true,
			afterLabelTextTpl: required,
			},
		{
			id:'vendor_name',
			fieldLabel: 'Name',
			name: 'vendor_name',
			x:10,
			y:40,
			width:260,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	
		{   xtype: 'textareafield',
			id:'vendor_description',
			fieldLabel: 'Description',
			name: 'vendor_description',
			x:10,
			y:70,
			width:260,
				
    	},
    	{   xtype: 'textareafield',
			id:'vendor_address1',
			fieldLabel: 'Address1',
			name: 'vendor_address1',
			x:300,
			y:10,
			width:260,
				
    	},
    	{   xtype: 'textareafield',
			id:'vendor_address2',
			fieldLabel: 'Address2',
			name: 'vendor_address2',
			x:300,
			y:80,
			width:260,
				
    	},
    	{
			id:'city',
			fieldLabel: 'City',
			name: 'city',
			x:300,
			y:150,
			width:260,
			allowBlank: false,
			
    	},
    	{
			id:'state',
			fieldLabel: 'State',
			name: 'state',
			x:580,
			y:10,
			width:260,
			allowBlank: false,
			
    	},
    	
    	{
			id:'pin',
			fieldLabel: 'Pin/Zip',
			name: 'pin',
			x:580,
			y:40,
			width:260,
			allowBlank: false,
			
    	},
    	{
			id:'phone',
			fieldLabel: 'Phone',
			name: 'phone',
			x:580,
			y:70,
			width:260,
			allowBlank: false,
			
    	},
    	{
			id:'email',
			fieldLabel: 'E-mail',
			name: 'email',
			x:580,
			y:100,
			width:260,
			allowBlank: false,
			
    	},
    	{
    		xtype:'contactgrid',
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
			handler: function (){				
				var currentForm = this.up('vendorsform');
				var vendor_code = Ext.getCmp('vendor_code').getValue();
				var vendor_name = Ext.getCmp('vendor_name').getValue();
				var vendor_description= Ext.getCmp('vendor_description').getValue();
				var vendor_address1= Ext.getCmp('vendor_address1').getValue();
				var vendor_address2= Ext.getCmp('vendor_address2').getValue();
				var city= Ext.getCmp('city').getValue();
				var vendor_description= Ext.getCmp('state').getValue();
				var pin= Ext.getCmp('pin').getValue();
				var phone= Ext.getCmp('phone').getValue();
				var email= Ext.getCmp('email').getValue();
				
				
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/vendors.php',
						method: 'POST',
						params : {action:5,vendor_code:vendor_code,vendor_name:vendor_name,vendor_description:vendor_description,vendor_address1:vendor_address1,vendor_address2:vendor_address2,city:city,state:state,pin:pin,phone:phone,email:email},
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
			}
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
			handler: function ()
			   {
			   var currentForm = this.up('vendorsform');
			   var vendor_code = Ext.getCmp('vendor_id').getValue();
				var vendor_code = Ext.getCmp('vendor_code').getValue();
				var vendor_name = Ext.getCmp('vendor_name').getValue();
				var vendor_description= Ext.getCmp('vendor_description').getValue();
				var vendor_address1= Ext.getCmp('vendor_address1').getValue();
				var vendor_address2= Ext.getCmp('vendor_address2').getValue();
				var city= Ext.getCmp('city').getValue();
				var vendor_description= Ext.getCmp('state').getValue();
				var pin= Ext.getCmp('pin').getValue();
				var phone= Ext.getCmp('phone').getValue();
				var email= Ext.getCmp('email').getValue();
				
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/vendors.php',
						method: 'POST',
						params : {action:4,vendor_id:vendor_id,vendor_code:vendor_code,vendor_name:vendor_name,vendor_description:vendor_description,vendor_address1:vendor_address1,vendor_address2:vendor_address2,city:city,state:state,pin:pin,phone:phone,email:email},
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
			}
	  	},
		
	  	{
			xtype: 'button',
		  	text: 'Reset',
		  	iconCls: 'button_reset',
		  //	id:'reset_freelancer',
			x:550,
			y:180,
			width:75,
			handler: function (){
				var currentForm = this.up('vendorsform');
				currentForm.getForm().reset();
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


