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
        labelWidth: 120,
    },
    defaultType: 'textfield',
    
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
			allowBlank: false,
			afterLabelTextTpl: required,
    	},{
			id:'username',
			fieldLabel: 'User Name',
			
			align:'center',
			x:550,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
			{
			   inputType: 'password',
			id:'pass',
			fieldLabel: 'Password',
			
			align:'center',
			x:100,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
			{
				   inputType: 'password',
			id:'retype_password',
			fieldLabel: 'Re-type Password',
			
			align:'center',
			x:550,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			msgTarget: 'side',
			vtype:'password',
			 initialPassField: 'pass'
			},
		{
			id:'userrole',
			fieldLabel: 'Select Role',
			xtype:'combo',
			align:'center',
			x:100,
			y:70,
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
			x:550,
			y:70,
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
			x:100,
			y:100,
			width:320,
			
    	},
    		
	{
xtype:'button',
        text:'Add',
        iconCls: 'button_add',
        id:'add_users',
x:350,
y:175,
width:75,
handler: function (){
var currentForm = this.up('usersform');
var usercode = Ext.getCmp('usercode').getValue();
var username = Ext.getCmp('username').getValue();
var password = Ext.getCmp('pass').getValue();
var role = Ext.getCmp('userrole').getValue();
var useremail = Ext.getCmp('useremail').getValue();
var userdescription= Ext.getCmp('userdescription').getValue();
if(currentForm.getForm().isValid() == true)
{
var conn = new Ext.data.Connection();
conn.request({
url: 'service/Users.php',
method: 'POST',
params : {action:5,usercode:usercode,username:username,password:password,role:role,useremail:useremail,userdescription:userdescription},
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
		  	text: 'Edit',
		  	iconCls: 'editClass',
		  	id:'edit_users',
			align:'center',
			x:450,
			y:175,
			width:75,
			handler: function ()
			   {
	var currentForm = this.up('usersform');
	var userid = Ext.getCmp('userid').getValue();
var usercode = Ext.getCmp('usercode').getValue();
var username = Ext.getCmp('username').getValue();
var password = Ext.getCmp('pass').getValue();
var role = Ext.getCmp('userrole').getValue();
var useremail = Ext.getCmp('useremail').getValue();
var userdescription= Ext.getCmp('userdescription').getValue();
if(currentForm.getForm().isValid() == true)
{
var conn = new Ext.data.Connection();
conn.request({
url: 'service/Users.php',
method: 'POST',
params : {action:4,userid:userid,usercode:usercode,username:username,password:password,role:role,useremail:useremail,userdescription:userdescription},
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
			y:175,
			width:75,
			handler: function (){
				var currentForm = this.up('usersform');
				currentForm.getForm().reset();
			//	Ext.getCmp('citycode').setReadOnly(false);
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


