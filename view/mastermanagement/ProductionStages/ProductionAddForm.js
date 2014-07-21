var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
function autoLoadCode()
{
	var currentForm = Ext.getCmp('Productionaddform');    
			 currentForm.getForm().load({
   								 url: 'service/activity.php',
							     params: {
        						 	action:6
							    },
							    success:function(form,action){
							    	
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){	
							    //	alert("failure");						    
							    	Ext.getCmp('product_code').setValue(action.result.message);
							    }
							
							});
}
Ext.define('MyDesktop.view.mastermanagement.ProductionStages.ProductionAddForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.Productionaddform',
   		id:'Productionaddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:270,
    title:'Add/Edit Activity',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
    listeners: {
     	 afterrender: function(){
     	 //	alert("listen");
     	 	autoLoadCode();
     	}},
	initComponent:function(){
		
		this.items= [
			{
			id:'product_id',
			hidden:true
			},
			{
			id:'product_code',
			fieldLabel: 'Activity Code',
			Name: 'product_code',
			align:'center',
			x:330,
			readOnly: true,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
		{
			id:'product_name',
			fieldLabel: 'Activity Name',
			name: 'product_name',
			x:330,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	
		{   xtype: 'textareafield',
			id:'product_description',
			fieldLabel: ' Description',
			name: 'product_description',
			x:330,
			y:70,
			width:320,
				
    	},
{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	   id:'Add_production',
			x:350,
			y:140,
			width:75,
			handler: function (){				
				var currentForm = this.up('productionform');
				var product_code = Ext.getCmp('product_code').getValue();
				var product_name = Ext.getCmp('product_name').getValue();
				var product_description= Ext.getCmp('product_description').getValue();
				
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/activity.php',
						method: 'POST',
						params : {action:5,product_code:product_code,product_name:product_name,product_description:product_description},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('productiongrid').getStore().reload();
						//Ext.getCmp('productiontab').layout.setActiveItem('productiongrid');
						autoLoadCode();
										
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
		  	id:'edit_production',
			align:'center',
			x:450,
			y:140,
			width:75,
			handler: function ()
			   {
			   var currentForm = this.up('productionform');
				var product_code = Ext.getCmp('product_code').getValue();
				var product_id = Ext.getCmp('product_id').getValue();
				var product_name = Ext.getCmp('product_name').getValue();
				var product_description = Ext.getCmp('product_description').getValue();
				
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/activity.php',
						method: 'POST',
						params : {action:4,product_id:product_id,product_code:product_code,product_name:product_name,product_description:product_description},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('productiongrid').getStore().reload();
							Ext.getCmp('productiontab').layout.setActiveItem('productiongrid');
										
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
		   id:'reset_production',
			x:550,
			y:140,
			width:75,
			handler: function (){
				var currentForm = this.up('Productionaddform');
				currentForm.getForm().reset();
				autoLoadCode();
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


