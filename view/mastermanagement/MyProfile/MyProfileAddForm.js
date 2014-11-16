var per = Ext.create('Ext.data.Store', {
	fields: ['per_name'],
	data : [{
		"per_name":"Mr"
	},{
		"per_name":"Mrs"
	},{
		"per_name":"Miss"
	}
	]
});
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
function autoLoadCode() {
	var currentForm = Ext.getCmp('myprofileaddform');
	currentForm.getForm().load({
		url: 'service/MyProfile.php',
		params: {
			action:1
		},
		success: function(form,action) {

			//alert("success");
			//alert(action.result.message);
		},
		failure: function(form,action) {
			// alert("failure");
		}
	});
}

Ext.define('MyDesktop.view.mastermanagement.MyProfile.MyProfileAddForm' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.myprofileaddform',
	id:'myprofileaddform',
	margin: '2 10 10 10',
	layout: {
		type: 'absolute'
	},
	frame:true,
	height:270,
	//requires:['MyDesktop.store.State'],
	title:'My Profile',
	defaults: {
		labelWidth: 120,
	},
	defaultType: 'textfield',
	listeners: {
		afterrender: function() {
			//	alert("listen");
			autoLoadCode();

		}
	},
	initComponent: function() {
		
			Ext.apply(Ext.form.field.VTypes, {
               passwordmyprof: function(val, field) {
            if (field.initialPassField) {
                var pwd = field.up('form').down('#' + field.initialPassField);
                return (val == pwd.getValue());
            }
            return true;
        },

        passwordText: 'Passwords do not match'
    });  
		this.items= [{
			id:'myprofuid',
			//name: 'usersid',
			hidden:true
		},{
			id:'myproffn',
			xtype:'displayfield',
			fieldLabel:'First Name',

			allowBlank: false,

			x:100,
			y:10,
			//width:80,
		},{
			id:'myprofper',
			xtype:'combo',
			//id:'myprof_per',
			x:225,
			y:10,
			width:50,
			//multiSelect:true,
			store: per,
			queryMode: 'local',
			displayField: 'per_name',

		},{

			xtype:'textfield',
			id:'myprof_first_name',
			//fieldLabel: 'First Name',
			name: 'basicname',
			x:290,
			y:10,
			//width:320,
			//margin:'-25 0 0 400',
			width:140,

		},{
			xtype:'textfield',
			id:'myprofmn',
			fieldLabel: 'Middle Name',
			name: 'basicname',
			width:270,
			x:600,
			y:10,
			width:320,
			//margin:'-25 0 0 400',
			//	width:230,

		},{
			xtype:'textfield',
			id:'myprofln',
			fieldLabel: 'Sur/Last Name',
			name: 'basicname',
			width:270,
			x:100,
			y:40,
			width:320,
			//margin:'-25 0 0 400',
			//	width:230,

		},{
			id:'myprofname',
			fieldLabel: 'User Name',

			align:'center',
			x:600,
			y:40,
			width:320,
			allowBlank: false,

		},{
			inputType: 'password',
			id:'passwordmyprof',
			fieldLabel: 'Password',

			align:'center',
			x:100,
			y:70,
			width:320,
			//	allowBlank: false,

		},{
			inputType: 'password',
			id:'retype_password_myprof',
			fieldLabel: 'Re-type Password',
			align:'center',
			x:600,
			y:70,
			width:320,
			afterLabelTextTpl: required,
			msgTarget: 'side',
			vtype:'passwordmyprof',
			 initialPassField: 'passwordmyprof'
		},{

			id:'myprofemail',
			fieldLabel: 'E-mail',
			align:'center',
			x:100,
			y:100,
			width:320,
			vtype:'email',
			allowBlank: false,

			vtype:'email',
			msgTarget:'side',
		},{
			xtype: 'button',
			text: 'Edit',
			iconCls: 'editClass',
			id:'edit_myprof',
			align:'center',
			x:450,
			y:195,
			width:75,
			handler: function () {
				var currentForm = this.up('myprofileaddform');
				var userid = Ext.getCmp('myprofuid').getValue();
				//alert(userid);
				var myprofper = Ext.getCmp('myprofper').getValue();
				var myprof_first_name = Ext.getCmp('myprof_first_name').getValue();
				var myprofmn = Ext.getCmp('myprofmn').getValue();
				var myprofln = Ext.getCmp('myprofln').getValue();
				var myprofname = Ext.getCmp('myprofname').getValue();
				var passwordmyprof = Ext.getCmp('passwordmyprof').getValue();
				var retype_password_myprof = Ext.getCmp('retype_password_myprof').getValue();
				var myprofemail = Ext.getCmp('myprofemail').getValue();

				if(currentForm.getForm().isValid() == true) {
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/MyProfile.php',
						method: 'POST',
						params : {
							action:2,
							userid:userid,
							myprofper:myprofper,
							myprof_first_name:myprof_first_name,
							myprofmn:myprofmn,
							myprofln:myprofln,
							myprofname:myprofname,
							passwordmyprof:passwordmyprof,
							//retype_password_myprof:retype_password_myprof,
							myprofemail:myprofemail
						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);
							//currentForm.getForm().reset();

						}
					});
				} else {
					Ext.MessageBox.alert('Please fill the required data.');
				}
			}
		},

		]

		this.callParent();
	}
});