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
function autoLoadCode()
{
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

}
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
		labelWidth: 100,
	},
	defaultType: 'textfield',
	listeners: {
     	 afterrender: function(){
     	 //	alert("listen");
     	 autoLoadCode();
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
		x:10,
		y:10,
		width:250
	},{
		id:'basicname',
		fieldLabel: 'Name',
		name: 'basicname',
		afterLabelTextTpl: required,
		allowBlank: false,
		x:340,
		y:10,
		//margin:'-25 0 0 400',
		width:250
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
		width:250
	},
	{
		xtype:'textarea',
		id:'basicaddress2',
		fieldLabel: 'Address2',
		name: 'basicaddress2',
		x:340,
		y:40,
		//margin:'-25 0 0 400',
		height:70,
		width:250
	},
	{
		xtype:'multiselect',
		id:'basic_service',
		fieldLabel:'Services',
		x:660,
		y:10,
		width:250,
		height:100,
	//	multiSelect:true,
		store: service,
	//	queryMode: 'local',
		displayField: 'service_name',
	    valueField: 'service_id',
	    ddReorder: true,
							           		         
				
	},
     {
      	id:'basiccity',
		fieldLabel: 'City',
		afterLabelTextTpl: required,
		allowBlank: false,
		x:10,
		y:120,
		width:250,
		
		name: 'city',
	//	margin:'-20 0 0 400',
      },
      {
      	id:'basicstate',
		fieldLabel: 'Country/State',
		afterLabelTextTpl: required,	
		allowBlank: false,		
		x:340,
		y:120,
		name: 'state',
		
		width:250,
		//margin:'5 0 0 0'
      },
      {
      	id:'basiccountry',
		fieldLabel: 'Country',
		afterLabelTextTpl: required,
		allowBlank: false,
		width:250,
		
		x:660,
		y:120,
		name: 'country',
		//margin:'5 0 0 0'
		
      },
      /*{
      	id:'basicpin',
		fieldLabel: 'Pin',
		width:250,
		
		x:10,
		y:150,
		name: 'basicpin',
		afterLabelTextTpl: required,
		allowBlank: false,
		//margin:'5 0 0 0'
		
      },*/
      { 
      	xtype:'numberfield',
		hideTrigger:true,
      	id:'basicphone',
		fieldLabel: 'Phone',
		afterLabelTextTpl: required,
		allowBlank: false,
		width:250,
		
		x:340,
		y:150,
		name: 'basicphone',
		//margin:'5 0 0 0'
		
      },
      {
      	id:'basicfax',
		fieldLabel: 'Fax',
		width:250,
		
		x:660,
		y:150,
		name: 'basicfax',
		//margin:'5 0 0 0'
		
      },
      {
      	id:'basicemail',
		fieldLabel: 'E-mail',
		width:250,
		vtype:'email',
		msgTarget : 'side',
		x:10,
		y:150,
		name: 'basicemail',
		afterLabelTextTpl: required,
		allowBlank: false,
		//margin:'5 0 0 0'
		
      },
      {
      	id:'basicwebsite',
		fieldLabel: 'Website',
		width:250,
		
		x:340,
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
		y:180,
		//margin:'-25 0 0 400',
		height:70,
		width:250
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
						var basicname = Ext.getCmp('basicname').getValue();
						var basicdescription = Ext.getCmp('basicdescription').getValue();
						var basicaddress1=Ext.getCmp('basicaddress1').getValue();
						var basicaddress2=Ext.getCmp('basicaddress2').getValue();
						var basicservice=Ext.getCmp('basic_service').getValue();
						var basiccity=Ext.getCmp('basiccity').getValue();
						var basicstate=Ext.getCmp('basicstate').getValue();
						var basiccountry=Ext.getCmp('basiccountry').getValue();
						//var basicpin=Ext.getCmp('basicpin').getValue();
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
						params : {action:5,basiccode:basiccode,basicname:basicname,basicdescription:basicdescription,basicaddress1:basicaddress1,basicaddress2:basicaddress2,basicservice:basicservice,basiccity:basiccity,basicstate:basicstate,basiccountry:basiccountry,basicphone:basicphone,basicfax:basicfax,basicemail:basicemail,basicwebsite:basicwebsite},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('vendorsgrid').getStore().reload();
							 autoLoadCode();
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
						var basicname = Ext.getCmp('basicname').getValue();
						var basicdescription = Ext.getCmp('basicdescription').getValue();
						var basicaddress1=Ext.getCmp('basicaddress1').getValue();
						var basicaddress2=Ext.getCmp('basicaddress2').getValue();
						var basicservice=Ext.getCmp('basic_service').getValue();
						var basiccity=Ext.getCmp('basiccity').getValue();
						var basicstate=Ext.getCmp('basicstate').getValue();
						var basiccountry=Ext.getCmp('basiccountry').getValue();
						//var basicpin=Ext.getCmp('basicpin').getValue();
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
						params : {action:4,basicid:basicid,basiccode:basiccode,basicname:basicname,basicdescription:basicdescription,basicaddress1:basicaddress1,basicaddress2:basicaddress2,basicservice:basicservice,basiccity:basiccity,basicstate:basicstate,basiccountry:basiccountry,basicphone:basicphone,basicfax:basicfax,basicemail:basicemail,basicwebsite:basicwebsite},
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
							var currentForm = this.up('basicinfoform');
				currentForm.getForm().reset();
						 autoLoadCode();
						
		}
		}
		]
	
	
	
});