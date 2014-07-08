var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.mastermanagement.Vendors.ContactInfoForm' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.contactsform',
	id: 'contactsform',
	margin: '2 10 9 10',
	layout: {
		type: 'absolute'
	},
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Vendors.ContactInfoGrid'],
	title:'Contacts',
	defaults: {
		labelWidth: 80,
	},
	defaultType: 'textfield',
	//initComponent:function(){
			items:[		
			{
				id:'cntctvenid',
				hidden:true
			},{
		id:'contctname',
		fieldLabel: 'Name',		
		name: 'contctname',		
		afterLabelTextTpl: required,	
		allowBlank: false,
		x:150,
		y:10,
		width:250
	},{ 
		xtype:'numberfield',
		hideTrigger:true,

		id:'contctphone',
		fieldLabel: 'Phone',
		name: 'contctphone',
		afterLabelTextTpl: required,
		allowBlank: false,
		x:150,
		y:50,
		//margin:'-25 0 0 400',
		width:250
	},
	
     {
      	id:'cntctemail',
		fieldLabel: 'Email',
		afterLabelTextTpl: required,
		allowBlank: false,
		vtype:'email',
		msgTarget : 'side',
		x:150,
		y:90,
		width:250,
		
		name: 'cntctemail',
	//	margin:'-20 0 0 400',
      },
      {
      	id:'cntctdesignation',
		fieldLabel: 'Designation',			
		x:150,
		y:130,
		name: 'cntctdesignation',
		
		width:250,
		//margin:'5 0 0 0'
      },
     
      
      {
		xtype:'button',
		text: 'Add',
		id:'cntctaddven',
		iconCls: 'button_add',
		x:320,
		y:220,
		width:75,
		handler: function (){
			            var currentForm = Ext.getCmp('Vendors_contactTab');
			            var contctname = Ext.getCmp('contctname').getValue();
						var contctphone = Ext.getCmp('contctphone').getValue();
						var cntctemail = Ext.getCmp('cntctemail').getValue();
						var cntctdesignation=Ext.getCmp('cntctdesignation').getValue();
						var vendorid=Ext.getCmp('basicid').getValue();
						var cntctvenid=Ext.getCmp('cntctvenid').getValue();
						
						if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/ContactInfoVen.php',
						method: 'POST',
						params : {action:5,vendorid:vendorid,contctname:contctname,contctphone:contctphone,cntctemail:cntctemail,cntctdesignation:cntctdesignation},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							var grid1=Ext.getCmp('vendorscontactgrid');
						    grid1.getStore().load({params:{action:1,vendorid:vendorid}});
							}
					});
					}
				else
				{
					Ext.MessageBox.alert('Enter the Required fields');
					
				}
			}
		},
      {
		xtype:'button',
		text: 'Edit',
		
		id:'cntcteditven',
		iconCls: 'editClass',
		x:410,
		y:220,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
			  var currentForm = Ext.getCmp('Vendors_contactTab');
			            var contctname = Ext.getCmp('contctname').getValue();
						var contctphone = Ext.getCmp('contctphone').getValue();
						var cntctemail = Ext.getCmp('cntctemail').getValue();
						var cntctdesignation=Ext.getCmp('cntctdesignation').getValue();
						var vendorid=Ext.getCmp('basicid').getValue();
						var id=Ext.getCmp('basicid').getValue();
						var cntctvenid=Ext.getCmp('cntctvenid').getValue();
								if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/ContactInfoVen.php',
						method: 'POST',
						params : {action:4,cntctvenid:cntctvenid,vendorid:vendorid,contctname:contctname,contctphone:contctphone,cntctemail:cntctemail,cntctdesignation:cntctdesignation},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							var grid1=Ext.getCmp('vendorscontactgrid');
						    grid1.getStore().load({params:{action:1,vendorid:id}});
						}
					});
					}
				else
				{
					Ext.MessageBox.alert("Sorry, We can't edit an empty row ");
					
				}
		}
		},
      {
		xtype:'button',
		text: 'Reset',
		id:'cntctrstven',
		iconCls: 'button_reset',
		x:500,
		y:220,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
						var contctname = Ext.getCmp('contctname').reset();
						var contctphone = Ext.getCmp('contctphone').reset();
						var cntctemail=Ext.getCmp('cntctemail').reset();
						var cntctdesignation=Ext.getCmp('cntctdesignation').reset();
						
		}
		},
		{
			xtype:'vendorscontactgrid',
			x:470,
			y:10,
			height:150,
			width:528,
		}
		]
	
	
	
});