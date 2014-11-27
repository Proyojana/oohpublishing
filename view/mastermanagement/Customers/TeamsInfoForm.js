var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.apply(Ext.form.VTypes, {
            'phone': function () {
                var re = /^[0-9]{0,20}$/;  
                return function (v) { return re.test(v); };
            }(), 'phoneText': 'Must be Numeric Values ',
          
        });    
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
				id:'teams_customerid',
				hidden:true
			},
			{
				id:'customers_teamid',
				hidden:true
			},
			{
		id:'custteamname',
		fieldLabel: 'Team Name',
		name: 'teamname',
		x:150,
		y:10,
		//margin:'-25 0 0 400',
		width:250,
		
	},
		
     {
      	id:'custdivision',
		fieldLabel: 'Division',
		x:150,
		y:50,
		width:250,
		
		name: 'division',
	//	margin:'-20 0 0 400',
      },
      {
      	id:'custteamemail',
		fieldLabel: 'Email',			
		x:150,
		y:90,
		name: 'teamemail',
		vtype:'email',
		width:250,
		
      },
      {
      	xtype:'textfield',
      	id:'custteamphone',
		fieldLabel: 'Phone',
		width:250,
		
		hideTrigger:true,
		x:150,
		y:130,
		name: 'teamphone',
		vtype: 'phone',
		
		//margin:'5 0 0 0'
		
      },
      {
      	id:'custteampoc',
		fieldLabel: 'POC',
		width:250,
		
		x:150,
		y:170,
		name: 'teamphone',
		
		
      },
      
      
      {
		xtype:'button',
		text: 'Add',
		id:'custteaminfo_add',
		iconCls: 'button_add',
		x:320,
		y:220,
		width:75,
		handler: function (){
			            var teams_customerid = Ext.getCmp('basic_customerid').getValue();
			          var currentForm = Ext.getCmp('customerteamsformTab');
						var custteamname = Ext.getCmp('custteamname').getValue();
						var custdivision = Ext.getCmp('custdivision').getValue();
						var custteamemail=Ext.getCmp('custteamemail').getValue();
						var custteamphone=Ext.getCmp('custteamphone').getValue();
						var custteampoc=Ext.getCmp('custteampoc').getValue();
					if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/customers_Teams.php',
						method: 'POST',
						params : {action:1,teams_customerid:teams_customerid,teamname:custteamname,division:custdivision,email:custteamemail,phone:custteamphone,poc:custteampoc},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('custteamgrid').getStore().reload();
							Ext.getCmp('custteamgrid').getView().refresh();
							var grid1=Ext.getCmp('custteamgrid');
						grid1.getStore().load({params:{action:3,customerid:teams_customerid}});
							}
					});
					}
				else
				{
					Ext.MessageBox.alert("Please fill the required fields ");
					
				}
			}
		},
      {
		xtype:'button',
		text: 'Edit/Save',
		id:'custteaminfo_edit',
		iconCls: 'editClass',
		x:410,
		y:220,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
			  var currentForm = Ext.getCmp('customerteamsformTab');
			var teams_customerid = Ext.getCmp('basic_customerid').getValue();
			  var teamid = Ext.getCmp('customers_teamid').getValue();
						var custteamname = Ext.getCmp('custteamname').getValue();
						var custdivision = Ext.getCmp('custdivision').getValue();
						var custteamemail=Ext.getCmp('custteamemail').getValue();
						var custteamphone=Ext.getCmp('custteamphone').getValue();
						var custteampoc=Ext.getCmp('custteampoc').getValue();
				if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/customers_Teams.php',
						method: 'POST',
						params : {action:2,teamid:teamid,teams_customerid:teams_customerid,teamname:custteamname,division:custdivision,email:custteamemail,phone:custteamphone,poc:custteampoc},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('custteamgrid').getStore().reload();
							Ext.getCmp('custteamgrid').getView().refresh();
							var grid1=Ext.getCmp('custteamgrid');
						grid1.getStore().load({params:{action:3,customerid:teams_customerid}});
						}
					});
					}
				else
				{
					Ext.MessageBox.alert("Please fill the required fields ");
					
				}
		}
		},
      {
		xtype:'button',
		text: 'Reset',
		id:'custteaminfo_reset',
		iconCls: 'button_reset',
		x:500,
		y:220,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
			 Ext.getCmp('custteamname').reset();
					 Ext.getCmp('custdivision').reset();
					 Ext.getCmp('custteamemail').reset();
					 Ext.getCmp('custteamphone').reset();
					 Ext.getCmp('custteampoc').reset();
		}
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