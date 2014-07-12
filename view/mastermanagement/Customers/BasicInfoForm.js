var per = Ext.create('Ext.data.Store', {
        fields: ['per_name'],
        data : [
         {"per_name":"Mr"},
            {"per_name":"Mrs"},
            {"per_name":"Miss"}
        ]
    });
var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.mastermanagement.Customers.BasicInfoForm' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.custbasicinfoform',
	id: 'custbasicinfoform',
	margin: '2 10 9 10',
	layout: {
		type: 'absolute'
	},
	frame:true,
	
	title:'Basic Info',
	defaults: {
		labelWidth:80,
	},
	requires:['MyDesktop.store.Service'],
	//defaultType: 'textfield',
	listeners: {
     	 afterrender: function(){
     	 //	alert("listen");
     	 	var currentForm = Ext.getCmp('custbasicinfoform');     
       	  	
       	
			 currentForm.getForm().load({
   								 url: 'service/customers.php',
							     params: {
        						 	action:7
							    },
							    success:function(form,action){
							    	
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){	
							    //	alert("failure");						    
							    	Ext.getCmp('custbasiccode').setValue(action.result.message);
							    }
							
							});
     	}},
	initComponent:function(){
		var service = Ext.create('MyDesktop.store.Service');
		service.load({
			params: {
				start: 0,
				limit: 50
			}
		});
			service.loadPage(1);
			this.items=[
			{
				id:'basic_customerid',
				hidden:true
			},		
			{
			xtype:'textfield',
		id:'custbasiccode',
		fieldLabel: 'Code',		
		name: 'basiccode',	
		readOnly:true,		
		x:10,
		y:10,
		width:230,
		afterLabelTextTpl: required,allowBlank: false,
	},
	{
		xtype:'displayfield',
		fieldLabel:'First Name',
		afterLabelTextTpl: required,allowBlank: false,

		x:260,
		y:10,
		width:80,
	},
	{
		xtype:'combo',
		id:'per',
		x:345,
		y:10,
		width:50,
		//multiSelect:true,
		store: per,
		queryMode: 'local',
	   displayField: 'per_name',
		
	},
	{
		xtype:'textfield',
		id:'custbasicname',
		//fieldLabel: 'First Name',
		name: 'basicname',
		x:400,
		y:10,
		//margin:'-25 0 0 400',
		width:130,
		afterLabelTextTpl: required,allowBlank: false,
	},
	{
		xtype:'textfield',
		id:'custbasiclastname',
		fieldLabel: 'Last Name',
		name: 'basicname',
		x:550,
		y:10,
		//margin:'-25 0 0 400',
		width:230,
		afterLabelTextTpl: required,allowBlank: false,
	},
	{
		xtype:'textfield',
		id:'custbasicmiddlename',
		fieldLabel: 'Middle Name',
		name: 'basicname',
		x:800,
		y:10,
		//margin:'-25 0 0 400',
		width:230,
		
	},
	
	{
		xtype:'combo',
		id:'custsevicesven',
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
	
	{   xtype:'textarea',
		id:'custbasicaddress1',
		fieldLabel: 'Address1',
		name: 'basicaddress1',
		x:10,
		y:40,
		//margin:'-25 0 0 400',
		height:70,
		width:230,
		afterLabelTextTpl: required,allowBlank: false,
	},
	{
		xtype:'textarea',
		id:'custbasicaddress2',
		fieldLabel: 'Address2',
		name: 'basicaddress2',
		x:260,
		y:40,
		//margin:'-25 0 0 400',
		height:70,
		width:270
	},
	
     {
     	xtype:'textfield',
      	id:'custbasiccity',
		fieldLabel: 'City',
		x:10,
		y:120,
		width:230,
		
		name: 'city',
		afterLabelTextTpl: required,allowBlank: false,
	//	margin:'-20 0 0 400',
      },
      {
      	xtype:'textfield',
      	id:'custbasicstate',
		fieldLabel: 'State',			
		x:260,
		y:120,
		name: 'state',
		
		width:270,
		afterLabelTextTpl: required,allowBlank: false,
		//margin:'5 0 0 0'
      },
      {
      	xtype:'textfield',
      	id:'custbasiccountry',
		fieldLabel: 'Country',
		width:230,
		
		x:550,
		y:120,
		name: 'country',
		//margin:'5 0 0 0'
		afterLabelTextTpl: required,allowBlank: false,
      },
      {
      	xtype:'textfield',
      //	xtype:'numberfield',
      	id:'custbasicpin',
		fieldLabel: 'Pin',
		width:230,
		
		x:10,
		y:150,
		name: 'basicpin',
		afterLabelTextTpl: required,allowBlank: false,
		//margin:'5 0 0 0'
		
      },
      {
      	xtype:'numberfield',
      	hideTrigger:true,
      	id:'custbasicphone',
		fieldLabel: 'Phone',
		width:270,
		
		x:260,
		y:150,
		name: 'basicphone',
		afterLabelTextTpl: required,allowBlank: false,
		//margin:'5 0 0 0'
		
      },
      {
      	xtype:'textfield',
      	id:'custbasicfax',
		fieldLabel: 'Fax',
		width:230,
		x:550,
		y:150,
		name: 'basicemail',
		
		
      },
      
      {
      	xtype:'textfield',
      	id:'custbasicemail',
		fieldLabel: 'E-mail',
		width:230,
		vtype: 'email',
		x:10,
		y:180,
		name: 'basicemail',
		msgTarget: 'side',
		afterLabelTextTpl: required,allowBlank: false,
		//margin:'5 0 0 0'
		
      },
      {
      	xtype:'textfield',
      	id:'custbasicwebsite',
		fieldLabel: 'Website',
		width:270,
		
		x:260,
		y:180,
		name: 'basicwebsite',
		//margin:'5 0 0 0'
		
      },
      {
		xtype:'textarea',
		id:'custbasicdescription',
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
		id:'customer_basicadd',
		iconCls: 'button_add',
		x:340,
		y:270,
		width:75,
		handler: function (){
			            var currentForm = this.up('custbasicinfoform');
			            var basiccode = Ext.getCmp('custbasiccode').getValue();
			            var per = Ext.getCmp('per').getValue();
						var basicname = Ext.getCmp('custbasicname').getValue();
						var lastname = Ext.getCmp('custbasiclastname').getValue();
						var middlename = Ext.getCmp('custbasicmiddlename').getValue();
						var basicdescription = Ext.getCmp('custbasicdescription').getValue();
						var basicaddress1=Ext.getCmp('custbasicaddress1').getValue();
						var basicaddress2=Ext.getCmp('custbasicaddress2').getValue();
						var sevicesven=Ext.getCmp('custsevicesven').getValue();
						var basiccity=Ext.getCmp('custbasiccity').getValue();
						var basicstate=Ext.getCmp('custbasicstate').getValue();
						var basiccountry=Ext.getCmp('custbasiccountry').getValue();
						var basicpin=Ext.getCmp('custbasicpin').getValue();
						var basicphone=Ext.getCmp('custbasicphone').getValue();
						var basicfax=Ext.getCmp('custbasicfax').getValue();
						var basicemail=Ext.getCmp('custbasicemail').getValue();
						var basicwebsite=Ext.getCmp('custbasicwebsite').getValue();
						sevicesven = sevicesven + ','; 
						if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/customers.php',
						method: 'POST',
							params : {action:5,basiccode:basiccode,per:per,basicname:basicname,lastname:lastname,middlename:middlename,basicdescription:basicdescription,basicaddress1:basicaddress1,basicaddress2:basicaddress2,sevicesven:sevicesven,basiccity:basiccity,basicstate:basicstate,basiccountry:basiccountry,basicpin:basicpin,basicphone:basicphone,basicfax:basicfax,basicemail:basicemail,basicwebsite:basicwebsite},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('customersgrid').getStore().reload();
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
		
		id:'customer_basicedit',
		iconCls: 'editClass',
		x:440,
		y:270,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
			  var currentForm = this.up('custbasicinfoform');
			 
			           
			            var basicid = Ext.getCmp('basic_customerid').getValue();
			            var basiccode = Ext.getCmp('custbasiccode').getValue();
						 var per = Ext.getCmp('per').getValue();
						var basicname = Ext.getCmp('custbasicname').getValue();
						var lastname = Ext.getCmp('custbasiclastname').getValue();
						var middlename = Ext.getCmp('custbasicmiddlename').getValue();
						var basicdescription = Ext.getCmp('custbasicdescription').getValue();
						var basicaddress1=Ext.getCmp('custbasicaddress1').getValue();
						var basicaddress2=Ext.getCmp('custbasicaddress2').getValue();
						var sevicesven=Ext.getCmp('custsevicesven').getValue();
						var basiccity=Ext.getCmp('custbasiccity').getValue();
						var basicstate=Ext.getCmp('custbasicstate').getValue();
						var basiccountry=Ext.getCmp('custbasiccountry').getValue();
						var basicpin=Ext.getCmp('custbasicpin').getValue();
						var basicphone=Ext.getCmp('custbasicphone').getValue();
						var basicfax=Ext.getCmp('custbasicfax').getValue();
						var basicemail=Ext.getCmp('custbasicemail').getValue();
						var basicwebsite=Ext.getCmp('custbasicwebsite').getValue();
						if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/customers.php',
						method: 'POST',
						params : {action:4,basicid:basicid,basiccode:basiccode,per:per,basicname:basicname,lastname:lastname,middlename:middlename,basicdescription:basicdescription,basicaddress1:basicaddress1,basicaddress2:basicaddress2,sevicesven:sevicesven,basiccity:basiccity,basicstate:basicstate,basiccountry:basiccountry,basicpin:basicpin,basicphone:basicphone,basicfax:basicfax,basicemail:basicemail,basicwebsite:basicwebsite},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							//currentForm.getForm().reset();
							Ext.getCmp('customersgrid').getStore().reload();
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
		text: 'Reset',
		id:'customer_basicreset',
		iconCls: 'button_reset',
		x:540,
		y:270,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
			Ext.getCmp('customercontactsformTab').setDisabled(true);
							Ext.getCmp('customerteamsformTab').setDisabled(true);
							Ext.getCmp('customerratecardformTab').setDisabled(true);
					    var basiccode = Ext.getCmp('custbasiccode').reset();
						var basicname = Ext.getCmp('custbasicname').reset();
						var basicdescription = Ext.getCmp('custbasicdescription').reset();
						var basicaddress1=Ext.getCmp('custbasicaddress1').reset();
						var basicaddress2=Ext.getCmp('custbasicaddress2').reset();
						var sevicesven=Ext.getCmp('custsevicesven').reset();
						var basiccity=Ext.getCmp('custbasiccity').reset();
						var basicstate=Ext.getCmp('custbasicstate').reset();
						var basiccountry=Ext.getCmp('custbasiccountry').reset();
						var basicpin=Ext.getCmp('custbasicpin').reset();
						var basicphone=Ext.getCmp('custbasicphone').reset();
						var basicfax=Ext.getCmp('custbasicfax').reset();
						var basicemail=Ext.getCmp('custbasicemail').reset();
						var basicwebsite=Ext.getCmp('custbasicwebsite').reset();
						
						Ext.getCmp('custbasiccode').setReadOnly(false);
		}
		}
		
		]
		this.callParent();
	
	}
});