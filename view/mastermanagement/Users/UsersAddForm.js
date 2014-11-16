var per = Ext.create('Ext.data.Store', {
        fields: ['per_name'],
        data : [
         {"per_name":"Mr"},
            {"per_name":"Mrs"},
            {"per_name":"Miss"}
        ]
    });
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
function autoLoadCode()
{
	var currentForm = Ext.getCmp('usersaddform');   
	 currentForm.getForm().load({
   								 url: 'service/Users.php',
							     params: {
        						 	action:7
							    },
							    success:function(form,action){
							    	
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){	
							    //	alert("failure");						    
							    	Ext.getCmp('usercode').setValue(action.result.message);
							    }
							
							});
}
Ext.define('MyDesktop.view.mastermanagement.Users.UsersAddForm' ,{
    extend: 'Ext.form.Panel',
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
        labelWidth: 120,
    },
    defaultType: 'textfield',
    listeners: {
     	 afterrender: function(){
     	 //	alert("listen");
     	 	 autoLoadCode();
			
     	}},
	initComponent:function(){
			Ext.apply(Ext.form.field.VTypes, {
               password: function(val, field) {
            if (field.initialPassField) {
                var pwd = field.up('form').down('#' + field.initialPassField);
                return (val == pwd.getValue());
            }
            return true;
        },

        passwordText: 'Passwords do not match'
    });  
    var role = Ext.create('MyDesktop.store.TeamRoles');
		role.load({
			params: {
				start: 0,
				limit: 50
			}
		});
			role.loadPage(1); 
	/*	var ci = Ext.create('MyDesktop.store.State');
		ci.load({params:{action: 7}});
	    ci.loadPage(1);*/
		this.items= [
			{
			id:'userid',
			name: 'usersid',
			hidden:true
			},
			
		{
			id:'usercode',
			fieldLabel: 'User Code',
			
			x:100,
			y:10,
			width:320,
		//	allowBlank: false,
		//	disabled: true,
			readOnly : true,
			afterLabelTextTpl: required,
    	},
    	{
		xtype:'displayfield',
		fieldLabel:'First Name',
		afterLabelTextTpl: required,
		allowBlank: false,
		
		x:550,
		y:10,
		//width:80,
	},
	{
		xtype:'combo',
		id:'user_per',
		x:675,
		y:10,
		width:50,
		//multiSelect:true,
		store: per,
		queryMode: 'local',
	   displayField: 'per_name',
		
	},
	{
		xtype:'textfield',
		id:'user_first_name',
		//fieldLabel: 'First Name',
		name: 'basicname',
		x:730,
		y:10,
		//width:320,
		//margin:'-25 0 0 400',
		width:140,
		afterLabelTextTpl: required,allowBlank: false,
	},
	{
		xtype:'textfield',
		id:'user_middle_name',
		fieldLabel: 'Middle Name',
		name: 'basicname',
		width:270,
		x:100,
		y:40,
		width:320,
		//margin:'-25 0 0 400',
	//	width:230,
		
	},
	{
		xtype:'textfield',
		id:'user_last_name',
		fieldLabel: 'Sur/Last Name',
		name: 'basicname',
		width:270,
		x:550,
		y:40,
		width:320,
		//margin:'-25 0 0 400',
	//	width:230,
		afterLabelTextTpl: required,allowBlank: false,
	},
	
    	{
			id:'username',
			fieldLabel: 'User Name',
			
			align:'center',
			x:100,
			y:70,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
			{
			   inputType: 'password',
			id:'password',
			fieldLabel: 'Password',
			
			align:'center',
			x:550,
			y:70,
			width:320,
		//	allowBlank: false,
			afterLabelTextTpl: required,
			},
			{
				   inputType: 'password',
			id:'retype_password',
			fieldLabel: 'Re-type Password',
			
			align:'center',
			x:100,
			y:100,
			width:320,
		//	allowBlank: false,
			afterLabelTextTpl: required,
			msgTarget: 'side',
			vtype:'password',
			 initialPassField: 'password'
			},
		{
			id:'userrole',
			fieldLabel: 'Select Role',
			xtype:'combo',
			align:'center',
			x:550,
			y:100,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			store:role,
			displayField: 'trolesname',
	    	valueField: 'trolesid',
			},
			{
			
			id:'useremail',
			fieldLabel: 'E-mail',			
			align:'center',
			x:100,
			y:130,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			vtype:'email',
			msgTarget:'side',
			},
    	
		{  
			id:'userdescription',
			fieldLabel: 'User Description',
			xtype:'textareafield',
			
			align:'center',
			x:550,
			y:130,
			width:320,
			
    	},
    		
	{
xtype:'button',
        text:'Add',
        iconCls: 'button_add',
        id:'add_users',
				x:350,
				y:195,
				width:75,
				handler: function (){
				var currentForm = this.up('usersform');
				var usercode = Ext.getCmp('usercode').getValue();
				var userper = Ext.getCmp('user_per').getValue();
				var userfirstname = Ext.getCmp('user_first_name').getValue();
				var usermiddlename = Ext.getCmp('user_middle_name').getValue();
				var userlastname = Ext.getCmp('user_last_name').getValue();
				var username = Ext.getCmp('username').getValue();
				var password = Ext.getCmp('password').getValue();
				var role = Ext.getCmp('userrole').getValue();
				var useremail = Ext.getCmp('useremail').getValue();
				var userdescription= Ext.getCmp('userdescription').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
				conn.request({
				url: 'service/Users.php',
				method: 'POST',
				params : {action:5,usercode:usercode,userper:userper,userfirstname:userfirstname,usermiddlename:usermiddlename,userlastname:userlastname,username:username,password:password,role:role,useremail:useremail,userdescription:userdescription},
				success:function(response){
					obj = Ext.JSON.decode(response.responseText);
					Ext.Msg.alert('Message', obj.message); 
					currentForm.getForm().reset();
					Ext.getCmp('usersgrid').getStore().reload();
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
		  	id:'edit_users',
			align:'center',
			x:450,
			y:195,
			width:75,
			handler: function ()
			   {
					var currentForm = this.up('usersform');
					var userid = Ext.getCmp('userid').getValue();
					var usercode = Ext.getCmp('usercode').getValue();
					var userper = Ext.getCmp('user_per').getValue();
					var userfirstname = Ext.getCmp('user_first_name').getValue();
					var usermiddlename = Ext.getCmp('user_middle_name').getValue();
					var userlastname = Ext.getCmp('user_last_name').getValue();
					var username = Ext.getCmp('username').getValue();
					var password = Ext.getCmp('password').getValue();
					var role = Ext.getCmp('userrole').getValue();
					var useremail = Ext.getCmp('useremail').getValue();
					var userdescription= Ext.getCmp('userdescription').getValue();
					//alert(usercode);
					//alert(role);
					if(currentForm.getForm().isValid() == true)
					{
					var conn = new Ext.data.Connection();
					conn.request({
					url: 'service/Users.php',
					method: 'POST',
					params : {action:4,userid:userid,usercode:usercode,userper:userper,userfirstname:userfirstname,usermiddlename:usermiddlename,userlastname:userlastname,username:username,role:role,useremail:useremail,userdescription:userdescription,password:password},
					success:function(response){
					obj = Ext.JSON.decode(response.responseText);
					Ext.Msg.alert('Message', obj.message); 
					currentForm.getForm().reset();
					Ext.getCmp('usersgrid').getStore().reload();
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
		  	id:'reset_users',
			x:550,
			y:195,
			width:75,
			handler: function (){
				var currentForm = this.up('usersform');
				currentForm.getForm().reset();
				Ext.getCmp('password').setDisabled(false);
				Ext.getCmp('retype_password').setDisabled(false);
			//	Ext.getCmp('citycode').setReadOnly(false);
			autoLoadCode();
							
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


