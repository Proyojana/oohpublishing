var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.mastermanagement.Customers.TeamsInfoForm' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.custteamform',
	id: 'custteamform',
	margin: '2 10 9 10',
	layout: {
		type: 'absolute'
	},
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Customers.TeamInfoGrid'],
	title:'Client Teams',
	defaults: {
		labelWidth: 80,
	},
	defaultType: 'textfield',
	//initComponent:function(){
			items:[		
			{
		id:'custteamname',
		fieldLabel: 'Team Name',
		name: 'teamname',
		x:150,
		y:10,
		//margin:'-25 0 0 400',
		width:250,
		afterLabelTextTpl: required,
	},
		
     {
      	id:'custdivision',
		fieldLabel: 'Division',
		x:150,
		y:50,
		width:250,
		afterLabelTextTpl: required,
		
		name: 'division',
	//	margin:'-20 0 0 400',
      },
      {
      	id:'custteamemail',
		fieldLabel: 'Email',			
		x:150,
		y:90,
		name: 'teamemail',
		
		width:250,
		afterLabelTextTpl: required,
		//margin:'5 0 0 0'
      },
      {
      	id:'custteamphone',
		fieldLabel: 'Phone',
		width:250,
		
		x:150,
		y:130,
		name: 'teamphone',
		afterLabelTextTpl: required,
		//margin:'5 0 0 0'
		
      },
      {
      	id:'custteampoc',
		fieldLabel: 'POC',
		width:250,
		
		x:150,
		y:170,
		name: 'teamphone',
		afterLabelTextTpl: required,
		//margin:'5 0 0 0'
		
      },
      
      
      {
		xtype:'button',
		text: 'Add',
		id:'personaladd',
		iconCls: 'button_add',
		x:320,
		y:220,
		width:75,
		handler: function (){
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
			}
		},
      {
		xtype:'button',
		text: 'Edit',
		id:'personaledit',
		iconCls: 'editClass',
		x:410,
		y:220,
		//margin:'0 0 0 10',
		width:75,
		/*handler: function (){
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
		id:'personalreset',
		iconCls: 'button_reset',
		x:500,
		y:220,
		//margin:'0 0 0 10',
		width:75,
		/*handler: function (){
						var firstname = Ext.getCmp('firstname').reset();
						var lastname = Ext.getCmp('lastname').reset();
						var dob=Ext.getCmp('dob').reset();
						var city=Ext.getCmp('city').reset();
						var state=Ext.getCmp('state').reset();
						var country=Ext.getCmp('country').reset();
						var address=Ext.getCmp('address').reset();
		}*/
		},
		{
			xtype:'custteamgrid',
			x:470,
			y:10,
			height:150,
			width:500,
		}
		]
	
	
	
});