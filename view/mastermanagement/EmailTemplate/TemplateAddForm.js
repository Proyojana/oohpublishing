var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
var per = Ext.create('Ext.data.Store', {
        fields: ['name','id'],
        data : [
         {"name":"Author","id":"1"},
            {"name":"Vendor","id":"2"},
            {"name":"Publisher","id":"3"}
        ]
    });
/* function autoLoadCode()
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
    };*/
Ext.define('MyDesktop.view.mastermanagement.EmailTemplate.TemplateAddForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.templateaddform',
   		id:'tmplateaddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	//requires:['MyDesktop.store.State'],
    title:'Edit Template',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
    
  
   /* listeners: {
     	 afterrender: function(){
     	 //	alert("listen");
     	
     	autoLoadCode(); 	    
       	  	
       	
			
     	}},*/
	initComponent:function(){
	/*	var ci = Ext.create('MyDesktop.store.State');
		ci.load({params:{action: 7}});
	    ci.loadPage(1);*/
		this.items= [
			{
			id:'template_id',
			hidden:true
			},
			
		{
			id:'template_code',
			fieldLabel: 'Template Code',
			x:100,
			y:10,
			width:350,
			readOnly:true,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
			id:'template_name',
			fieldLabel: 'Template Name',
			align:'center',
			x:100,
			y:40,
			width:350,
			
			},
			{
			id:'template_role',
			fieldLabel: 'Template For',
			xtype:'combo',
			store: per,
		    queryMode: 'local',
	        displayField: 'name',
	        valueField: 'id',
			align:'center',
			x:100,
			y:70,
			width:350,
			
			},
    	{
    		xtype:'textareafield',
    		id:'template_main',
			fieldLabel: 'Main Content',
			x:480,
			y:10,
			width:400,
			height:200,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
    		xtype:'textareafield',
    		id:'template_footer',
			fieldLabel: 'Footer Content',
			x:100,
			y:100,
			width:350,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    		
    		
		/*{
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
	  	},*/
		
		{
			xtype: 'button',
		  	text: 'Update',
		  	iconCls: 'editClass',
		  	id:'edit_template',
		    align:'center',
			x:300,
			y:180,
			width:75,
			handler: function ()
			   {
			var currentForm = this.up('templateform');
	var templateid = Ext.getCmp('template_id').getValue();
var templatecode = Ext.getCmp('template_code').getValue();
var templatename = Ext.getCmp('template_name').getValue();
var templaterole= Ext.getCmp('template_role').getValue();
var templatemain= Ext.getCmp('template_main').getValue();
var templatefooter= Ext.getCmp('template_footer').getValue();

if(currentForm.getForm().isValid() == true)
{
var conn = new Ext.data.Connection();
conn.request({
url: 'service/emailTemplate.php',
method: 'POST',
params : {action:7,templateid:templateid,templatecode:templatecode,templatename:templatename,templaterole:templaterole,templatemain:templatemain,templatefooter:templatefooter},
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
		
	  	/*{
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
	  	} */]
	  
	
		
	this.callParent();
	}
     
}); 

