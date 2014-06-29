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
		labelWidth: 80,
	},
	defaultType: 'textfield',
	//initComponent:function(){
			items:[		
			{
		id:'custbasiccode',
		fieldLabel: 'Code',		
		name: 'basiccode',			
		x:10,
		y:10,
		width:250,
		afterLabelTextTpl: required,
	},{
		id:'custbasicname',
		fieldLabel: 'Name',
		name: 'basicname',
		x:340,
		y:10,
		//margin:'-25 0 0 400',
		width:250,
		afterLabelTextTpl: required,
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
		afterLabelTextTpl: required,
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
		afterLabelTextTpl: required,
	//	margin:'-20 0 0 400',
      },
      {
      	id:'custbasicstate',
		fieldLabel: 'State',			
		x:340,
		y:120,
		name: 'state',
		
		width:250,
		afterLabelTextTpl: required,
		//margin:'5 0 0 0'
      },
      {
      	id:'custbasiccountry',
		fieldLabel: 'Country',
		width:250,
		
		x:660,
		y:120,
		name: 'country',
		//margin:'5 0 0 0'
		afterLabelTextTpl: required,
      },
      {
      //	xtype:'numberfield',
      	id:'custbasicpin',
		fieldLabel: 'Pin',
		width:250,
		
		x:10,
		y:150,
		name: 'basicpin',
		afterLabelTextTpl: required,
		//margin:'5 0 0 0'
		
      },
      {
      //	xtype:'numberfield',
      	id:'custbasicphone',
		fieldLabel: 'Phone',
		width:250,
		
		x:340,
		y:150,
		name: 'basicphone',
		afterLabelTextTpl: required,
		//margin:'5 0 0 0'
		
      },
      {
      	id:'custbasicfax',
		fieldLabel: 'Fax',
		width:250,
		
		x:660,
		y:150,
		name: 'basicemail',
		//margin:'5 0 0 0'
		
      },
      {
      	id:'custbasicemail',
		fieldLabel: 'E-mail',
		width:250,
		 vtype: 'email',
		x:10,
		y:180,
		name: 'basicemail',
		 msgTarget: 'side',
		afterLabelTextTpl: required,
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
		y:210,
		//margin:'-25 0 0 400',
		height:70,
		width:250
	},
      
    {
		xtype:'button',
		text: 'Add',
	//	id:'personaladd',
		iconCls: 'button_add',
		x:340,
		y:270,
		width:75,
	/*	handler: function (){
			            var currentForm = this.up('employeeform');
			            var empno = Ext.getCmp('empno').getValue();
						var firstname = Ext.getCmp('firstname').getValue();
						var lastname = Ext.getCmp('lastname').getValue();
						var dob=Ext.getCmp('dob').getValue();
						var city=Ext.getCmp('city').getValue();
						var state=Ext.getCmp('state').getValue();
						var country=Ext.getCmp('country').getValue();
						var address=Ext.getCmp('address').getValue();
						if(firstname !== "" || lastname !== "" || dob !== null || city !== "" || state !== "" || country !== "" || address !== "" )
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/EmpPersonalInfo.php',
						method: 'POST',
						params : {action:2,id:empno,firstname:firstname,lastname:lastname,dob:dob,city:city,state:state,country:country,address:address},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							//currentForm.getForm().reset();
							Ext.getCmp('employee').getStore().reload();
							}
					});
					}
				else
				{
					Ext.MessageBox.alert("Sorry, We can't add an empty row ");
					
				}
			}*/
		},
      {
		xtype:'button',
		text: 'Edit',
		
		//id:'personaledit',
		iconCls: 'editClass',
		x:440,
		y:270,
		//margin:'0 0 0 10',
		width:75,
	/*	handler: function (){
			 var currentForm = this.up('employeeform');
			            var empno = Ext.getCmp('empno').getValue();
						var firstname = Ext.getCmp('firstname').getValue();
						var lastname = Ext.getCmp('lastname').getValue();
						var dob=Ext.getCmp('dob').getValue();
						var city=Ext.getCmp('city').getValue();
						var state=Ext.getCmp('state').getValue();
						var country=Ext.getCmp('country').getValue();
						var address=Ext.getCmp('address').getValue();
								if(firstname !== "" || lastname !== "" || dob !== null || city !== "" || state !== "" || country !== "" || address !== "" )
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/EmpPersonalInfo.php',
						method: 'POST',
						params : {action:1,id:empno,firstname:firstname,lastname:lastname,dob:dob,city:city,state:state,country:country,address:address},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							//currentForm.getForm().reset();
							Ext.getCmp('employee').getStore().reload();
						}
					});
					}
				else
				{
					Ext.MessageBox.alert("Sorry, We can't edit an empty row ");
					
				}
		}*/
		},
      {
		xtype:'button',
		text: 'Reset',
	//	id:'personalreset',
		iconCls: 'button_reset',
		x:540,
		y:270,
		//margin:'0 0 0 10',
		width:75,
	/*	handler: function (){
						var firstname = Ext.getCmp('firstname').reset();
						var lastname = Ext.getCmp('lastname').reset();
						var dob=Ext.getCmp('dob').reset();
						var city=Ext.getCmp('city').reset();
						var state=Ext.getCmp('state').reset();
						var country=Ext.getCmp('country').reset();
						var address=Ext.getCmp('address').reset();
		}*/
		}
		
		]
	
	
	
});