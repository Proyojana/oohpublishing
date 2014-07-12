var per = Ext.create('Ext.data.Store', {
        fields: ['per_name'],
        data : [
         {"per_name":"Mr"},
            {"per_name":"Mrs"},
            {"per_name":"Miss"}
        ]
    });
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
var service = Ext.create('MyDesktop.store.Service');
		service.load({
			params: {
				start: 0,
				limit: 50
			}
		});
Ext.define('MyDesktop.view.mastermanagement.Vendors.BasicInfoForm' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.basicinfoform',
	id: 'basicinfoform',
	margin: '2 10 9 10',
	layout: {
		type: 'absolute'
	},
	frame:true,
	title:'Basic Info',
	defaults: {
		labelWidth: 80,
	},
	defaultType: 'textfield',
	listeners: {
     	 afterrender: function(){
     	 //	alert("listen");
     	 	var currentForm = Ext.getCmp('basicinfoform');     
       	  	
       	
			 currentForm.getForm().load({
   								 url: 'service/vendors.php',
							     params: {
        						 	action:9
							    },
							    success:function(form,action){
							    	
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){	
							    //	alert("failure");						    
							    	Ext.getCmp('basiccode').setValue(action.result.message);
							    }
							
							});
     	}},
	//initComponent:function(){
			items:[		
			{
				id:'basicid',
			fieldLabel: 'Basicid',
			name: 'basicid',
			hidden:true

			},
			{
		id:'basiccode',
		fieldLabel: 'Code',		
		name: 'basiccode',
		afterLabelTextTpl: required,
		allowBlank: false,			
		readOnly: true,
		x:10,
		y:10,
		width:230
	},
	{
		xtype:'displayfield',
		fieldLabel:'First Name',
		x:260,
		y:10,
		width:80,
	},
	{
		xtype:'combo',
		id:'per1',
		x:345,
		y:10,
		width:50,
		//multiSelect:true,
		store: per,
		queryMode: 'local',
	   displayField: 'per_name',
		
	},
{
		id:'basicname',
		//fieldLabel: 'Name',
		afterLabelTextTpl: required,
		allowBlank: false,
		x:400,
		y:10,
		//margin:'-25 0 0 400',
		width:130
	},
	{
		xtype:'textfield',
		id:'basiclastname',
		fieldLabel: 'Last Name',
		
		x:550,
		y:10,
		//margin:'-25 0 0 400',
		width:230,
		//afterLabelTextTpl: required,allowBlank: false,
	},
	{
		xtype:'textfield',
		id:'basicmiddlename',
		fieldLabel: 'Middle Name',
		x:800,
		y:10,
		//margin:'-25 0 0 400',
		width:230,
		
	},
	{   xtype:'textarea',
		id:'basicaddress1',
		fieldLabel: 'Address1',
		name: 'basicaddress1',
		afterLabelTextTpl: required,
		allowBlank: false,
		x:10,
		y:40,
		//margin:'-25 0 0 400',
		height:70,
		width:230
	},
	{
		xtype:'textarea',
		id:'basicaddress2',
		fieldLabel: 'Address2',
		name: 'basicaddress2',
		x:260,
		y:40,
		//margin:'-25 0 0 400',
		height:70,
		width:270
	},
	{
		xtype:'combo',
		id:'basic_service',
		fieldLabel:'Services',
		x:550,
		y:40,
		width:230,
		multiSelect:true,
		store: service,
		queryMode: 'local',
		displayField: 'service_name',
	    valueField: 'service_id',
									           		         
				
	},
     {
      	id:'basiccity',
		fieldLabel: 'City',
		afterLabelTextTpl: required,
		allowBlank: false,
		x:10,
		y:120,
		width:230,
		
		name: 'city',
	//	margin:'-20 0 0 400',
      },
      {
      	id:'basicstate',
		fieldLabel: 'State',
		afterLabelTextTpl: required,	
		allowBlank: false,		
		x:260,
		y:120,
		name: 'state',
		
		width:270,
		//margin:'5 0 0 0'
      },
      {
      	id:'basiccountry',
		fieldLabel: 'Country',
		afterLabelTextTpl: required,
		allowBlank: false,
		width:230,
		
		x:550,
		y:120,
		name: 'country',
		//margin:'5 0 0 0'
		
      },
      {
      	id:'basicpin',
		fieldLabel: 'Pin',
		width:230,
		
		x:10,
		y:150,
		name: 'basicpin',
		afterLabelTextTpl: required,
		allowBlank: false,
		//margin:'5 0 0 0'
		
      },
      { 
      	xtype:'numberfield',
		hideTrigger:true,
      	id:'basicphone',
		fieldLabel: 'Phone',
		afterLabelTextTpl: required,
		allowBlank: false,
		width:270,
		
		x:260,
		y:150,
		name: 'basicphone',
		//margin:'5 0 0 0'
		
      },
      {
      	id:'basicfax',
		fieldLabel: 'Fax',
		width:230,
		
		x:550,
		y:150,
		name: 'basicfax',
		//margin:'5 0 0 0'
		
      },
      {
      	id:'basicemail',
		fieldLabel: 'E-mail',
		width:230,
		vtype:'email',
		msgTarget : 'side',
		x:10,
		y:180,
		name: 'basicemail',
		//margin:'5 0 0 0'
		
      },
      {
      	id:'basicwebsite',
		fieldLabel: 'Website',
		width:270,
		
		x:260,
		y:180,
		name: 'basicwebsite',
		//margin:'5 0 0 0'
		
      },
      {
		xtype:'textarea',
		id:'basicdescription',
		fieldLabel: 'Description',
		name: 'basicdescription',
		x:10,
		y:210,
		//margin:'-25 0 0 400',
		height:70,
		width:230
	},
      {
		xtype:'button',
		text: 'Add',
		id:'venadd',
		iconCls: 'button_add',
		x:340,
		y:270,
		width:75,
		handler: function (){
			            var currentForm = Ext.getCmp('basicinfoform');
			            var basiccode = Ext.getCmp('basiccode').getValue();
			            var per1 = Ext.getCmp('per1').getValue();
						var basicname = Ext.getCmp('basicname').getValue();
						var lastname = Ext.getCmp('basiclastname').getValue();
						var middlename = Ext.getCmp('basicmiddlename').getValue();
						var basicdescription = Ext.getCmp('basicdescription').getValue();
						var basicaddress1=Ext.getCmp('basicaddress1').getValue();
						var basicaddress2=Ext.getCmp('basicaddress2').getValue();
						var basicservice=Ext.getCmp('basic_service').getValue();
						var basiccity=Ext.getCmp('basiccity').getValue();
						var basicstate=Ext.getCmp('basicstate').getValue();
						var basiccountry=Ext.getCmp('basiccountry').getValue();
						var basicpin=Ext.getCmp('basicpin').getValue();
						var basicphone=Ext.getCmp('basicphone').getValue();
						var basicfax=Ext.getCmp('basicfax').getValue();
						var basicemail=Ext.getCmp('basicemail').getValue();
						var basicwebsite=Ext.getCmp('basicwebsite').getValue();
						basicservice = basicservice + ',';
						if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/vendors.php',
						method: 'POST',
						params : {action:5,basiccode:basiccode,per1:per1,basicname:basicname,lastname:lastname,middlename:middlename,basicdescription:basicdescription,basicaddress1:basicaddress1,basicaddress2:basicaddress2,basicservice:basicservice,basiccity:basiccity,basicstate:basicstate,basiccountry:basiccountry,basicpin:basicpin,basicphone:basicphone,basicfax:basicfax,basicemail:basicemail,basicwebsite:basicwebsite},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('vendorsgrid').getStore().reload();
							}
					});
					}
				else
				{
					Ext.MessageBox.alert("Enter the Required fields");
					
				}
			}
		},
      {
		xtype:'button',
		text: 'Edit',
		
		id:'venedit',
		iconCls: 'editClass',
		x:440,
		y:270,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
			 var currentForm = this.up('basicinfoform');
			 
			            var currentForm = Ext.getCmp('basicinfoform');
			            var basicid = Ext.getCmp('basicid').getValue();
			            var basiccode = Ext.getCmp('basiccode').getValue();
						 var per1 = Ext.getCmp('per1').getValue();
						var basicname = Ext.getCmp('basicname').getValue();
						var lastname = Ext.getCmp('basiclastname').getValue();
						var middlename = Ext.getCmp('basicmiddlename').getValue();
						var basicdescription = Ext.getCmp('basicdescription').getValue();
						var basicaddress1=Ext.getCmp('basicaddress1').getValue();
						var basicaddress2=Ext.getCmp('basicaddress2').getValue();
						var basicservice=Ext.getCmp('basic_service').getValue();
						var basiccity=Ext.getCmp('basiccity').getValue();
						var basicstate=Ext.getCmp('basicstate').getValue();
						var basiccountry=Ext.getCmp('basiccountry').getValue();
						var basicpin=Ext.getCmp('basicpin').getValue();
						var basicphone=Ext.getCmp('basicphone').getValue();
						var basicfax=Ext.getCmp('basicfax').getValue();
						var basicemail=Ext.getCmp('basicemail').getValue();
						var basicwebsite=Ext.getCmp('basicwebsite').getValue();
						
							if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/vendors.php',
						method: 'POST',
						params : {action:4,basicid:basicid,per1:per1,basiccode:basiccode,basicname:basicname,lastname:lastname,middlename:middlename,basicdescription:basicdescription,basicaddress1:basicaddress1,basicaddress2:basicaddress2,basicservice:basicservice,basiccity:basiccity,basicstate:basicstate,basiccountry:basiccountry,basicpin:basicpin,basicphone:basicphone,basicfax:basicfax,basicemail:basicemail,basicwebsite:basicwebsite},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('vendorsgrid').getStore().reload();
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
		id:'venreset',
		iconCls: 'button_reset',
		x:540,
		y:270,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
			
							Ext.getCmp('Vendors_teamformTab').setDisabled(true);
							Ext.getCmp('Vendors_contactTab').setDisabled(true);
							Ext.getCmp('Vendors_ratecardgridTab').setDisabled(true);
						var firstname = Ext.getCmp('basiccode').reset();
						var lastname = Ext.getCmp('basicname').reset();
						var dob=Ext.getCmp('basicdescription').reset();
						var city=Ext.getCmp('basicaddress1').reset();
						var state=Ext.getCmp('basicaddress2').reset();
						var country=Ext.getCmp('sevicesven').reset();
						var address=Ext.getCmp('basiccity').reset();
						var address=Ext.getCmp('basicstate').reset();
						var address=Ext.getCmp('basiccountry').reset();
						var address=Ext.getCmp('basicpin').reset();
						var address=Ext.getCmp('basicphone').reset();
						var address=Ext.getCmp('basicfax').reset();
						var address=Ext.getCmp('basicwebsite').reset();
						var address=Ext.getCmp('basicemail').reset();
						
		}
		}
		]
	
	
	
});