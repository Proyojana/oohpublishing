var per = Ext.create('Ext.data.Store', {
        fields: ['per_name'],
        data : [
         {"per_name":"Mr"},
            {"per_name":"Mrs"},
            {"per_name":"Miss"}
        ]
    });
     Ext.apply(Ext.form.VTypes, {
            'phone': function () {
                var re = /^[0-9]{0,20}$/;  
                return function (v) { return re.test(v); };
            }(), 'phoneText': 'Must be Numeric Values ',
          
        });    

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
			},		{
		xtype:'displayfield',
		fieldLabel:'First Name',
		afterLabelTextTpl: required,allowBlank: false,

		x:150,
		y:10,
		width:80,
	},
	{
		xtype:'combo',
		id:'vendor_per',
		x:235,
		y:10,
		width:50,
		//multiSelect:true,
		store: per,
		queryMode: 'local',
	   displayField: 'per_name',
		
	},
	{
		xtype:'textfield',
		id:'vendor_first_name',
		//fieldLabel: 'First Name',
		name: 'basicname',
		x:290,
		y:10,
		//margin:'-25 0 0 400',
		width:130,
		afterLabelTextTpl: required,allowBlank: false,
	},
	{
		xtype:'textfield',
		id:'vendor_middle_name',
		fieldLabel: 'Middle Name',
		name: 'basicname',
		width:270,
		x:150,
		y:40,
		//margin:'-25 0 0 400',
	//	width:230,
		
	},
	{
		xtype:'textfield',
		id:'vendor_last_name',
		fieldLabel: 'Last Name',
		name: 'basicname',
		width:270,
		x:150,
		y:70,
		//margin:'-25 0 0 400',
	//	width:230,
		afterLabelTextTpl: required,allowBlank: false,
	},
{ 
		xtype:'textfield',
		hideTrigger:true,

		id:'contctphone',
		fieldLabel: 'Phone',
		name: 'contctphone',
		vtype: 'phone',
		//afterLabelTextTpl: required,
		//allowBlank: false,
		x:150,
		y:100,
		
		//margin:'-25 0 0 400',
		width:270
	},
	
     {
      	id:'cntctemail',
		fieldLabel: 'Email',
		afterLabelTextTpl: required,
		allowBlank: false,
		vtype:'email',
		msgTarget : 'side',
		x:150,
		y:130,
		width:270,
		
		name: 'cntctemail',
	//	margin:'-20 0 0 400',
      },
      {
      	id:'cntctdesignation',
		fieldLabel: 'Designation',			
		x:150,
		y:160,
		name: 'cntctdesignation',
		
		width:270,
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
			             var per_name = Ext.getCmp('vendor_per').getValue();
			          	var firstname = Ext.getCmp('vendor_first_name').getValue();
			          	var middlename = Ext.getCmp('vendor_middle_name').getValue();
			          	var lastname = Ext.getCmp('vendor_last_name').getValue();
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
						params : {action:5,vendorid:vendorid,per_name:per_name,firstname:firstname,middlename:middlename,lastname:lastname,contctphone:contctphone,cntctemail:cntctemail,cntctdesignation:cntctdesignation},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							var grid1=Ext.getCmp('vendorscontactgrid');
						    grid1.getStore().load({params:{action:1,vendorid:vendorid}});						   						
							Ext.getCmp('vendorscontactgrid').getView().refresh();
							 autoLoadCode();
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
		text: 'Edit/Save',
		
		id:'cntcteditven',
		iconCls: 'editClass',
		x:410,
		y:220,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
			  var currentForm = Ext.getCmp('Vendors_contactTab');
			  
			            var per_name = Ext.getCmp('vendor_per').getValue();
			          	var firstname = Ext.getCmp('vendor_first_name').getValue();
			          	var middlename = Ext.getCmp('vendor_middle_name').getValue();
			          	var lastname = Ext.getCmp('vendor_last_name').getValue();
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
						params : {action:4,cntctvenid:cntctvenid,vendorid:vendorid,per_name:per_name,firstname:firstname,middlename:middlename,lastname:lastname,contctphone:contctphone,cntctemail:cntctemail,cntctdesignation:cntctdesignation},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							var grid1=Ext.getCmp('vendorscontactgrid');
						    grid1.getStore().load({params:{action:1,vendorid:vendorid}});						    					
							 Ext.getCmp('vendorscontactgrid').getView().refresh();
							 autoLoadCode();
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
		handler: function ()
		{
						var vendor_per = Ext.getCmp('vendor_per').reset();
						var vendor_first_name = Ext.getCmp('vendor_first_name').reset();
						var vendor_middle_name = Ext.getCmp('vendor_middle_name').reset();
						var vendor_last_name = Ext.getCmp('vendor_last_name').reset();
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