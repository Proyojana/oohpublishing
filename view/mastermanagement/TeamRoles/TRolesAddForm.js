var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.mastermanagement.TeamRoles.TRolesAddForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.trolesaddform',
   		id:'trolesaddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	//requires:['MyDesktop.store.State'],
    title:'Add/Edit Team Roles',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
    listeners: {
     	 afterrender: function(){
     	 	var currentForm = Ext.getCmp('trolesaddform');     
       	  	
       	
			 currentForm.getForm().load({
   								 url: 'service/team_roles.php',
							     params: {
        						 	action:1
							    },
							    success:function(form,action){
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){							    
							    	Ext.getCmp('trolescode').setValue(action.result.message);
							    }
							
							});
     	}},
	initComponent:function(){
	/*	var ci = Ext.create('MyDesktop.store.State');
		ci.load({params:{action: 7}});
	    ci.loadPage(1);*/
		this.items= [
			{
			id:'trolesid',
			fieldLabel: 'City Name',
			name: 'cityid',
			hidden:true
			},
			
		{
			id:'trolescode',
			fieldLabel: 'Role Code',
			name: 'citycode',
			x:330,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},{
			id:'trolesname',
			fieldLabel: 'Role Name',
			name: 'cityname',
			align:'center',
			x:330,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	
		{  
			id:'trolesdescription',
			fieldLabel: 'Role Description',
			xtype:'textareafield',
			name: 'cityname',
			align:'center',
			x:330,
			y:70,
			width:320,
		//	allowBlank: false,
			//afterLabelTextTpl: required,
				
    	},
    		
		{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	    id:'add_roles',
			x:350,
			y:165,
			width:75,
			handler: function (){				
				var currentForm = this.up('trolesaddform');
				var trole_code = Ext.getCmp('trolescode').getValue();
				var trole_name = Ext.getCmp('trolesname').getValue();
				var trole_description= Ext.getCmp('trolesdescription').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/team_roles.php',
						method: 'POST',
						params : {action:2,trole_code:trole_code,trole_name:trole_name,trole_description:trole_description},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
						//	Ext.getCmp('citygrid').getStore().reload();
						//	Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
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
		  	id:'edit_roles',
			align:'center',
			x:450,
			y:165,
			width:75,
			handler: function ()
			   {
			   var currentForm = this.up('trolesaddform');
			   var trole_id = Ext.getCmp('trolesid').getValue();
				var trole_code = Ext.getCmp('trolescode').getValue();
				var trole_name = Ext.getCmp('trolesname').getValue();
				var trole_description= Ext.getCmp('trolesdescription').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/team_roles.php',
						method: 'POST',
						params : {action:6,trole_id:trole_id,trole_code:trole_code,trole_name:trole_name,trole_description:trole_description},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('trolesgrid').getStore().reload();
						//	Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
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
		  	id:'reset_roles',
			x:550,
			y:165,
			width:75,
			handler: function (){
				var currentForm = this.up('trolesaddform');
				currentForm.getForm().reset();
				Ext.getCmp('trolescode').setReadOnly(false);
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


