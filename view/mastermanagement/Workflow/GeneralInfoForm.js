var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.mastermanagement.Workflow.GeneralInfoForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.generalinfoform',
   		id:'generalinfoform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:270,
	requires:['MyDesktop.view.mastermanagement.Workflow.ClientGrid'],
    title:'General Info',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
    listeners: {
     	 afterrender: function(){
     	 //	alert("listen");
     	 	var currentForm = Ext.getCmp('generalinfoform');     
       	  	
       	
			 currentForm.getForm().load({
   								 url: 'service/Workflow.php',
							     params: {
        						 	action:7
        						 	
							    },
							    success:function(form,action){
							    	
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){	
							    //	alert("failure");						    
							    	Ext.getCmp('workflow_code').setValue(action.result.message);
							    }
							
							});
     	}},
	initComponent:function(){
		var client = Ext.create('MyDesktop.store.Customers');
		client.load({params:{action: 1}});
		this.items= [
			{
			id:'workflow_id',
			hidden:true
			},
			{
			id:'workflow_code',
			fieldLabel: 'Workflow Code',
			Name: 'workflow_code',
			align:'center',
			x:100,
			y:10,
			width:320,
			allowBlank: false,
			readOnly: true,
			afterLabelTextTpl: required,
			},
		{
			id:'workflow_name',
			fieldLabel: 'Workflow Name',
			name: 'workflow_name',
			x:550,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
    		xtype:'multiselect',
			id:'workflow_client',
			fieldLabel: 'Select Clients',
			name: 'workflow_client',
			x:100,
			y:40,
			width:320,
		height:100,
			allowBlank: false,
			afterLabelTextTpl: required,
			store:client,
			displayField: 'name',
			valueField: 'id',
		//	multiSelect:true,
			
    	},
    	
		{   xtype: 'textareafield',
			id:'workflow_description',
			fieldLabel: 'Workflow Description',
			name: 'workflow_description',
			x:550,
			y:40,
			width:320,
				
    	},
    /*	{   xtype: 'clientgrid',
			x:500,
			y:20,
			width:320,
		
    	},*/
{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	   id:'add_workflow',
			x:350,
			y:180,
			width:75,
			handler: function (){				
				var currentForm = this.up('workflowform');
				var workflow_code = Ext.getCmp('workflow_code').getValue();
				var workflow_name = Ext.getCmp('workflow_name').getValue();
				var workflow_client = Ext.getCmp('workflow_client').getValue();
				var workflow_description= Ext.getCmp('workflow_description').getValue();
				var clients = workflow_client + ',';
			//	alert(clients);
				
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/Workflow.php',
						method: 'POST',
						params : {action:5,workflow_code:workflow_code,workflow_name:workflow_name,clients:clients,workflow_description:workflow_description},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('workflowgrid').getStore().reload();
															
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
		  	id:'edit_workflow',
			align:'center',
			x:450,
			y:180,
			width:75,
			handler: function ()
			   {
			   var currentForm = this.up('workflowform');
			   var workflow_id = Ext.getCmp('workflow_id').getValue();
				var workflow_code = Ext.getCmp('workflow_code').getValue();
				var workflow_name = Ext.getCmp('workflow_name').getValue();
				
				var workflow_description= Ext.getCmp('workflow_description').getValue();
				
				var workflow_client = Ext.getCmp('workflow_client').getValue();
						var clients = workflow_client + ',';
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/workflow.php',
						method: 'POST',
						params : {action:4,workflow_id:workflow_id,workflow_code:workflow_code,workflow_name:workflow_name,clients:clients,workflow_description:workflow_description},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('workflowgrid').getStore().reload();
																
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
		   id:'reset_workflow',
			x:550,
			y:180,
			width:75,
			handler: function (){
				var currentForm = this.up('workflowform');
				currentForm.getForm().reset();
		//		var grid1=Ext.getCmp('clientgrid');
			//			grid1.getStore().load();
						
				var generalForm = Ext.getCmp('generalinfoform'); 
						
				generalForm.getForm().load({
   								 url: 'service/Workflow.php',
							     params: {
        						 	action:7
        						 	
							    },
							    success:function(form,action){
							    	
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){	
							    //	alert("failure");						    
							    	Ext.getCmp('workflow_code').setValue(action.result.message);
							    }
							
							});
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


