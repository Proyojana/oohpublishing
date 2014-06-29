var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.mastermanagement.Users.UsersAddForm' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.usersaddform',
   		id:'usersaddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	//requires:['MyDesktop.store.State'],
    title:'Add/Edit Users',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	initComponent:function(){
	/*	var ci = Ext.create('MyDesktop.store.State');
		ci.load({params:{action: 7}});
	    ci.loadPage(1);*/
		this.items= [
		
			
		{
			id:'users_code',
			fieldLabel: 'User Code',
		//	name: 'userscode',
			x:100,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},{
			id:'users_name',
			fieldLabel: 'User Name',
			//name: 'usersname',
			align:'center',
			x:470,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
			{
    		xtype:'combo',
    		id:'teams_user',
			fieldLabel: 'Select Role',
			name: 'teamsuser',
			x:100,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	
			{
    		xtype:'combo',
    		id:'teams_role',
			fieldLabel: 'Select Team',
			name: 'teamsrole',
			x:470,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	
		{  
			id:'users_description',
			fieldLabel: 'User Description',
			xtype:'textareafield',
			name: 'usersdescription',
			align:'center',
			x:100,
			y:70,
			width:320,
		//	allowBlank: false,
			//afterLabelTextTpl: required,
				
    	},
    		
		{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	  //  id:'add_users',
			x:350,
			y:165,
			width:75,
			handler: function (){				
				var currentForm = this.up('cityform');
				var city_code = Ext.getCmp('citycode').getValue();
				var city_name = Ext.getCmp('cityname').getValue();
				var city_state= Ext.getCmp('cstateid').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/City.php',
						method: 'POST',
						params : {action:5,city_code:city_code,city_name:city_name,city_state:city_state},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('citygrid').getStore().reload();
							Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
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
		//  	id:'edit_users',
			align:'center',
			x:450,
			y:165,
			width:75,
			handler: function ()
			   {
			   	var currentForm = this.up('cityform');
				var city_code = Ext.getCmp('citycode').getValue();
				var city_id = Ext.getCmp('cityid').getValue();
				var city_name = Ext.getCmp('cityname').getValue();
				var city_state= Ext.getCmp('cstateid').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/City.php',
						method: 'POST',
						params : {action:4,city_id:city_id,city_code:city_code,city_name:city_name,city_state:city_state},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('citygrid').getStore().reload();
							Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
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
		  //	id:'reset_users',
			x:550,
			y:165,
			width:75,
			handler: function (){
				var currentForm = this.up('cityform');
				currentForm.getForm().reset();
				Ext.getCmp('citycode').setReadOnly(false);
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


