var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
 function autoLoadCode()
    {
    	var currentForm = Ext.getCmp('serviceaddform'); 
    	 currentForm.getForm().load({
   								 url: 'service/Service.php',
							     params: {
        						 	action:9
							    },
							    success:function(form,action){
							    	
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){	
							    //	alert("failure");						    
							    	Ext.getCmp('service_code').setValue(action.result.message);
							    }
							
							});
    };
Ext.define('MyDesktop.view.mastermanagement.Services.ServiceAddForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.serviceaddform',
   		id:'serviceaddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	//requires:['MyDesktop.store.State'],
    title:'Add/Edit Services',
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
	/*	var ci = Ext.create('MyDesktop.store.State');
		ci.load({params:{action: 7}});
	    ci.loadPage(1);*/
		this.items= [
			{
			id:'service_id',
			name: 'teamsid',
			hidden:true
			},
			
		{
			id:'service_code',
			fieldLabel: 'Service Code',
			name: 'teamscode',
			x:350,
			y:10,
			width:320,
			readOnly:true,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
			id:'service_name',
			fieldLabel: 'Service Name',
			name: 'teamsname',
			align:'center',
			x:350,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{
    		xtype:'textareafield',
    		id:'service_description',
			fieldLabel: 'Service Description',
			name: 'teamsuser',
			x:350,
			y:70,
			width:320,
		//	allowBlank: false,
		//	afterLabelTextTpl: required,
    	},
    		
    		
		{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	    id:'add_service',
			x:350,
			y:165,
			width:75,
			handler: function (){				
		var currentForm = this.up('serviceform');
		var servicecode = Ext.getCmp('service_code').getValue();
		var servicename = Ext.getCmp('service_name').getValue();
		var servicedescription= Ext.getCmp('service_description').getValue();
		if(currentForm.getForm().isValid() == true)
		{
		var conn = new Ext.data.Connection();
		conn.request({
		url: 'service/Service.php',
		method: 'POST',
		params : {action:5,servicecode:servicecode,servicename:servicename,servicedescription:servicedescription},
		success:function(response){
		obj = Ext.JSON.decode(response.responseText);
		Ext.Msg.alert('Message', obj.message); 
		currentForm.getForm().reset();
		Ext.getCmp('servicegrid').getStore().reload();
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
		  	id:'edit_service',
		    align:'center',
			x:450,
			y:165,
			width:75,
			handler: function ()
			   {
			var currentForm = this.up('serviceform');
	var serviceid = Ext.getCmp('service_id').getValue();
var servicecode = Ext.getCmp('service_code').getValue();
var servicename = Ext.getCmp('service_name').getValue();
var servicedescription= Ext.getCmp('service_description').getValue();
if(currentForm.getForm().isValid() == true)
{
var conn = new Ext.data.Connection();
conn.request({
url: 'service/Service.php',
method: 'POST',
params : {action:4,serviceid:serviceid,servicecode:servicecode,servicename:servicename,servicedescription:servicedescription},
success:function(response){
obj = Ext.JSON.decode(response.responseText);
Ext.Msg.alert('Message', obj.message); 
currentForm.getForm().reset();
Ext.getCmp('servicegrid').getStore().reload();
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
	    	id:'reset_service',
			x:550,
			y:165,
			width:75,
			handler: function (){
				var currentForm = this.up('serviceform');
				currentForm.getForm().reset();
				Ext.getCmp('service_code').setReadOnly(false);
				     	autoLoadCode(); 					
					 			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


