var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.mastermanagement.Customers.ContactInfoForm' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.custcontactsform',
	id: 'custcontactsform',
	margin: '2 10 9 10',
	layout: {
		type: 'absolute'
	},
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Customers.ContactInfoGrid'],
	title:'Contacts',
	defaults: {
		labelWidth: 80,
	},
	defaultType: 'textfield',
	//initComponent:function(){
			items:[
			{
				id:'custcntctvenid',
				hidden:true
			},		
			{
		id:'custcontctname',
		fieldLabel: 'Name',		
		name: 'contctname',			
		x:150,
		y:10,
		width:250,
		allowBlank: false,
		afterLabelTextTpl: required,
	},{
		xtype:'numberfield',
		hideTrigger:true,
		id:'custcontctphone',
		fieldLabel: 'Phone',
		name: 'contctphone',
		x:150,
		y:50,
		//margin:'-25 0 0 400',
		width:250,
		allowBlank: false,
		afterLabelTextTpl: required,
	},
	
     {
      	id:'custcntctemail',
		fieldLabel: 'Email',
		x:150,
		y:90,
		width:250,
		vtype:'email',
		allowBlank: false,
		afterLabelTextTpl: required,
	//	margin:'-20 0 0 400',
      },
      {
      	id:'custcntctdesignation',
		fieldLabel: 'Designation',			
		x:150,
		y:130,
		name: 'cntctdesignation',
		
		width:250,
		
      },
     
      
      {
		xtype:'button',
		text: 'Add',
		id:'customersContact_add',
		iconCls: 'button_add',
		x:320,
		y:210,
		width:75,
	handler: function (){
		               
			            var currentForm = Ext.getCmp('customercontactsformTab');
			            var contctname = Ext.getCmp('custcontctname').getValue();
						var contctphone = Ext.getCmp('custcontctphone').getValue();
						var cntctemail = Ext.getCmp('custcntctemail').getValue();
						var cntctdesignation=Ext.getCmp('custcntctdesignation').getValue();
						 var teams_customerid = Ext.getCmp('basic_customerid').getValue();
						var cntctvenid=Ext.getCmp('custcntctvenid').getValue();
						if(currentForm.getForm().isValid()==true){
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/customers_Contact.php',
						method: 'POST',
						params : {action:5,teams_customerid:teams_customerid,contctname:contctname,contctphone:contctphone,cntctemail:cntctemail,cntctdesignation:cntctdesignation},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							
							 var grid3=Ext.getCmp('custcontactgrid');
						grid3.getStore().load({params:{action:1,id:teams_customerid}});
							}
					});
					}
				else
				{
					Ext.Msg.alert('Enter the Required fields');
					
				}
			}
		},
      {
		xtype:'button',
		text: 'Edit',
		id:'customersContact_edit',
		iconCls: 'editClass',
		x:410,
		y:210,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
		var currentForm = Ext.getCmp('customercontactsformTab');
			            var contctname = Ext.getCmp('custcontctname').getValue();
						var contctphone = Ext.getCmp('custcontctphone').getValue();
						var cntctemail = Ext.getCmp('custcntctemail').getValue();
						var cntctdesignation=Ext.getCmp('custcntctdesignation').getValue();
						 var teams_customerid = Ext.getCmp('basic_customerid').getValue();
						var cntctvenid=Ext.getCmp('custcntctvenid').getValue();
						
						if(contctname!== "" || contctphone !== "" || cntctemail !== "" || cntctdesignation !== "" )
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/customers_Contact.php',
						method: 'POST',
						params : {action:4,cntctvenid:cntctvenid,teams_customerid:teams_customerid,contctname:contctname,contctphone:contctphone,cntctemail:cntctemail,cntctdesignation:cntctdesignation},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							 var grid3=Ext.getCmp('custcontactgrid');
						grid3.getStore().load({params:{action:1,id:teams_customerid}});
							}
					});
					}
				else
				{
					Ext.MessageBox.alert("Sorry, We can't add an empty row ");
					
				}
		}
		},
      {
		xtype:'button',
		text: 'Reset',
		id:'customersContact_reset',
		iconCls: 'button_reset',
		x:500,
		y:210,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
						Ext.getCmp('custcontctname').reset();
						Ext.getCmp('custcontctphone').reset();
						Ext.getCmp('custcntctemail').reset();
						Ext.getCmp('custcntctdesignation').reset();
						
		}
		},
		{
			xtype:'custcontactgrid',
			x:470,
			y:10,
			height:150,
			width:500,
		}
		]
	
	
	
});