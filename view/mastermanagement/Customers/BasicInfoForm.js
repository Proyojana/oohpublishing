var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
function autoLoadCode()
    {
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
    };
     Ext.apply(Ext.form.VTypes, {
            'phone': function () {
                var re = /^[0-9]{0,20}$/;  
                return function (v) { return re.test(v); };
            }(), 'phoneText': 'Must be Numeric Values ',
          
        });
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
		labelWidth: 100,
	},
	requires:['MyDesktop.store.Service'],
	defaultType: 'textfield',
	listeners: {
     	 afterrender: function(){
     		autoLoadCode();
     	 	
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
		id:'custbasiccode',
		fieldLabel: 'Code',		
		name: 'basiccode',			
		x:10,
		y:10,
		width:250,
		afterLabelTextTpl: required,allowBlank: false,
		readOnly:true,
	},{
		id:'custbasicname',
		fieldLabel: 'Name',
		name: 'basicname',
		x:340,
		y:10,
		//margin:'-25 0 0 400',
		width:250,
		afterLabelTextTpl: required,allowBlank: false,
	},
	/*{
		xtype:'multiselect',
		id:'custsevicesven',
		fieldLabel:'Services',
		x:660,
		y:10,
		width:250,
		height:100,
	//	multiSelect:true,
		store: service,
//		queryMode: 'local',
		displayField: 'service_name',
	//	value: [],
		valueField: 'service_id',
		ddReorder: true,
		
	},*/
	{
    		xtype:'combo',
    		id:'custsevicesven',
			fieldLabel: 'Services',
			//multiSelect: true,
			x:660,
			y:10,
			width:250,
			store:service,
			displayField:'service_name',
			valueField: 'service_id',
			//labelWidth:140,
			
    },
	
	{   xtype:'textarea',
		id:'custbasicaddress1',
		fieldLabel: 'Address1',
		name: 'basicaddress1',
		x:10,
		y:40,
		//margin:'-25 0 0 400',
		height:70,
		width:250,
		afterLabelTextTpl: required,allowBlank: false,
	},
	{
		xtype:'textarea',
		id:'custbasicaddress2',
		fieldLabel: 'Address2',
		name: 'basicaddress2',
		x:340,
		y:40,
		//margin:'-25 0 0 400',
		height:70,
		width:250
	},
	
     {
      	id:'custbasiccity',
		fieldLabel: 'City',
		x:10,
		y:120,
		width:250,
		
		name: 'city',
	//	afterLabelTextTpl: required,allowBlank: false,
	//	margin:'-20 0 0 400',
      },
      {
      	id:'custbasicstate',
		fieldLabel: 'Country/State',			
		x:340,
		y:120,
		name: 'state',
		
		width:250,
		//afterLabelTextTpl: required,allowBlank: false,
		//margin:'5 0 0 0'
      },
      {
      	id:'custbasiccountry',
		fieldLabel: 'Country',
		width:250,
		
		x:660,
		y:50,
		name: 'country',
		//margin:'5 0 0 0'
		//afterLabelTextTpl: required,allowBlank: false,
      },
    /*  {
      //	xtype:'numberfield',
      	id:'custbasicpin',
		fieldLabel: 'Pin',
		width:250,
		
		x:10,
		y:150,
		name: 'basicpin',
		afterLabelTextTpl: required,allowBlank: false,
		//margin:'5 0 0 0'
		
      },*/
      {
      		xtype:'textfield',
      	hideTrigger:true,
      	id:'custbasicphone',
		fieldLabel: 'Phone',
		width:250,
		
		x:340,
		y:150,
		name: 'basicphone',
		//afterLabelTextTpl: required,allowBlank: false,
			vtype: 'phone',
		//margin:'5 0 0 0'
		
      },
      {
      	id:'custbasicfax',
		fieldLabel: 'Fax',
		width:250,
		x:660,
		y:90,
		name: 'basicemail',
		
		
      },
      {
      	id:'custbasicemail',
		fieldLabel: 'E-mail',
		width:250,
		vtype: 'email',
		x:10,
		y:150,
		name: 'basicemail',
		msgTarget: 'side',
		afterLabelTextTpl: required,allowBlank: false,
		//margin:'5 0 0 0'
		
      },
      {
      	id:'custbasicwebsite',
		fieldLabel: 'Website',
		width:250,
		
		x:340,
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
		y:180,
		//margin:'-25 0 0 400',
		height:70,
		width:250
	},
      
    {
		xtype:'button',
		text: 'Add',
		id:'customer_basicadd',
		iconCls: 'button_add',
		hidden: false,
		x:340,
		y:270,
		width:75,
		handler: function (){
			            var currentForm = this.up('custbasicinfoform');
			            var basiccode = Ext.getCmp('custbasiccode').getValue();
						var basicname = Ext.getCmp('custbasicname').getValue();
						var basicdescription = Ext.getCmp('custbasicdescription').getValue();
						var basicaddress1=Ext.getCmp('custbasicaddress1').getValue();
						var basicaddress2=Ext.getCmp('custbasicaddress2').getValue();
						var sevicesven=Ext.getCmp('custsevicesven').getValue();
						var basiccity=Ext.getCmp('custbasiccity').getValue();
						var basicstate=Ext.getCmp('custbasicstate').getValue();
						var basiccountry=Ext.getCmp('custbasiccountry').getValue();
						//var basicpin=Ext.getCmp('custbasicpin').getValue();
						var basicphone=Ext.getCmp('custbasicphone').getValue();
						var basicfax=Ext.getCmp('custbasicfax').getValue();
						var basicemail=Ext.getCmp('custbasicemail').getValue();
						var basicwebsite=Ext.getCmp('custbasicwebsite').getValue();
					//alert(sevicesven);
						sevicesven = sevicesven + ','; 
						if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/customers.php',
						method: 'POST',
							params : {action:5,basiccode:basiccode,basicname:basicname,basicdescription:basicdescription,basicaddress1:basicaddress1,basicaddress2:basicaddress2,sevicesven:sevicesven,basiccity:basiccity,basicstate:basicstate,basiccountry:basiccountry,basicphone:basicphone,basicfax:basicfax,basicemail:basicemail,basicwebsite:basicwebsite},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('customersgrid').getStore().reload();
							
							Ext.getCmp('customersgrid').getView().refresh();
							autoLoadCode();
							Ext.getCmp('workflowgrid').getStore().reload();
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
		text: 'Edit/Save',
		
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
						var basicname = Ext.getCmp('custbasicname').getValue();
						var basicdescription = Ext.getCmp('custbasicdescription').getValue();
						var basicaddress1=Ext.getCmp('custbasicaddress1').getValue();
						var basicaddress2=Ext.getCmp('custbasicaddress2').getValue();
						var sevicesven=Ext.getCmp('custsevicesven').getValue();
						var basiccity=Ext.getCmp('custbasiccity').getValue();
						var basicstate=Ext.getCmp('custbasicstate').getValue();
						var basiccountry=Ext.getCmp('custbasiccountry').getValue();
						//var basicpin=Ext.getCmp('custbasicpin').getValue();
						var basicphone=Ext.getCmp('custbasicphone').getValue();
						var basicfax=Ext.getCmp('custbasicfax').getValue();
						var basicemail=Ext.getCmp('custbasicemail').getValue();
						var basicwebsite=Ext.getCmp('custbasicwebsite').getValue();
					//	alert(sevicesven);
						sevicesven = sevicesven + ',';
						if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/customers.php',
						method: 'POST',
						params : {action:4,basicid:basicid,basiccode:basiccode,basicname:basicname,basicdescription:basicdescription,basicaddress1:basicaddress1,basicaddress2:basicaddress2,sevicesven:sevicesven,basiccity:basiccity,basicstate:basicstate,basiccountry:basiccountry,basicphone:basicphone,basicfax:basicfax,basicemail:basicemail,basicwebsite:basicwebsite},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('customersgrid').getStore().reload();
							
							Ext.getCmp('customersgrid').getView().refresh();
							autoLoadCode();
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
					
						var currentForm = this.up('custbasicinfoform');
						currentForm.getForm().reset();
						autoLoadCode();
						Ext.getCmp('custbasiccode').setReadOnly(false);
						
						
		}
		}
		
		]
		this.callParent();
	
	}
});