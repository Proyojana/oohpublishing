var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
 Ext.apply(Ext.form.VTypes, {
            'phone': function () {
                var re = /^[0-9]{0,20}$/;  
                return function (v) { return re.test(v); };
            }(), 'phoneText': 'Must be Numeric Values ',
          
        });    

Ext.define('MyDesktop.view.mastermanagement.Vendors.TeamsInfoForm' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.teamform',
	id: 'teamform',
	margin: '2 10 9 10',
	layout: {
		type: 'absolute'
	},
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Vendors.TeamInfoGrid'],
	title:'Client Teams',
	defaults: {
		labelWidth: 80,
	},
	defaultType: 'textfield',
	//initComponent:function(){
			items:[		
			{
				id:'teamid',
				hidden:true,
			},
			{
		id:'teamname',
		fieldLabel: 'Team Name',
		name: 'teamname',
		
		x:150,
		y:10,
		//margin:'-25 0 0 400',
		width:250
	},
		
     {
      	id:'division',
		fieldLabel: 'Division',
		
		x:150,
		y:50,
		width:250,
		
		name: 'division',
	//	margin:'-20 0 0 400',
      },
      {
      	id:'teamemail',
		fieldLabel: 'Email',	
		
		x:150,
		y:90,
		name: 'teamemail',
		vtype:'email',
		msgTarget : 'side',
		width:250,
		//margin:'5 0 0 0'
      },
      { 
      	xtype:'textfield',
		hideTrigger:true,
      	id:'teamphone',
		fieldLabel: 'Phone',
		width:250,
		
		x:150,
		y:130,
		name: 'teamphone',
		vtype: 'phone',
		//margin:'5 0 0 0'
		
      },
      {
      	id:'teampoc',
		fieldLabel: 'POC',
		width:250,
		
		x:150,
		y:170,
		name: 'poc',
		//margin:'5 0 0 0'
		
      },
      
      
      {
		xtype:'button',
		text: 'Add',
		id:'teamaddven',
		iconCls: 'button_add',
		x:320,
		y:220,
		width:75,
		handler: function (){
			var currentForm = Ext.getCmp('Vendors_teamformTab');
			 var basicvendorid=Ext.getCmp('basicid').getValue();
			         // var teams_customerid = Ext.getCmp('basic_customerid').getValue();
			          //alert(basicvendorid);
						var teamname = Ext.getCmp('teamname').getValue();
						var division = Ext.getCmp('division').getValue();
						var teamemail=Ext.getCmp('teamemail').getValue();
						var teamphone=Ext.getCmp('teamphone').getValue();
						var teampoc=Ext.getCmp('teampoc').getValue();
					if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/TeamsVendor.php',
						method: 'POST',
						params : {action:1,basicvendorid:basicvendorid,teamname:teamname,division:division,teamemail:teamemail,teamphone:teamphone,teampoc:teampoc},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							var grid1=Ext.getCmp('vendorsteamgrid');
						    grid1.getStore().load({params:{action:3,basicvendorid:basicvendorid}});						     							
							 Ext.getCmp('vendorsteamgrid').getView().refresh();
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
		
		id:'teameditven',
		iconCls: 'editClass',
		x:410,
		y:220,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
			var currentForm = Ext.getCmp('Vendors_teamformTab');
			
			 var basicvendorid=Ext.getCmp('basicid').getValue();
			 var teamid=Ext.getCmp('teamid').getValue();
			        
			          
						var teamname = Ext.getCmp('teamname').getValue();
						var division = Ext.getCmp('division').getValue();
						var teamemail=Ext.getCmp('teamemail').getValue();
						var teamphone=Ext.getCmp('teamphone').getValue();
						var teampoc=Ext.getCmp('teampoc').getValue();
						
						if(currentForm.getForm().isValid()==true)
					{
						var conn = new Ext.data.Connection();
					    conn.request({
						url: 'service/TeamsVendor.php',
						method: 'POST',
						params : {action:2,teamid:teamid,teamname:teamname,division:division,teamemail:teamemail,teamphone:teamphone,teampoc:teampoc},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							var grid1=Ext.getCmp('vendorsteamgrid');
						    grid1.getStore().load({params:{action:3,basicvendorid:basicvendorid}});						 						
							 Ext.getCmp('vendorsteamgrid').getView().refresh();
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
		id:'teamresetvendor',
		iconCls: 'button_reset',
		x:500,
		y:220,
		//margin:'0 0 0 10',
		width:75,
		handler: function (){
						var teamname = Ext.getCmp('teamname').reset();
						var division = Ext.getCmp('division').reset();
						var teamemail=Ext.getCmp('teamemail').reset();
						var teamphone=Ext.getCmp('teamphone').reset();
						var teampoc=Ext.getCmp('teampoc').reset();
						
		}
	},
		{
			xtype:'vendorsteamgrid',
			x:440,
			y:10,
			height:180,
			width:568,
		}
		]
	
	
	
});