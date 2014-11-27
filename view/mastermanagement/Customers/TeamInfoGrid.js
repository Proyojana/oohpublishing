     var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
     
Ext.define('MyDesktop.view.mastermanagement.Customers.TeamInfoGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.custteamgrid',
	//closeAction: 'hide',
	selModel:sm,
	//height:100,
	requires : ['MyDesktop.store.Customers_team'],
	title:'',
	id:'custteamgrid',
	initComponent: function() {
		
		var ci = Ext.create('MyDesktop.store.Customers_team');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);
		this.store = ci,
			
			this.columns = [
				{
					dataIndex: 'id',
					hidden:true
				},
				{
					dataIndex: 'name',
					text: 'Team Name',
					align: 'center',
				width:100,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'division',
					text: 'Division',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				
				{
					dataIndex: 'mail',
					text: 'E-mail',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'phone',
					text: 'Phone',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'poc',
					text: 'POC',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				
				
				{
					xtype:'actioncolumn',
					align: 'center',
					flex:2,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('customerteamsformTab');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						currentForm.getForm().load({
   								 url: 'service/customers_Teams.php',
							     params: {
        						 	action:4,teamid:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						//hide add,edit and reset buttons
						Ext.getCmp('custteaminfo_add').setVisible(false); 
						Ext.getCmp('custteaminfo_edit').setVisible(false); 
						Ext.getCmp('custteaminfo_reset').setVisible(false);
						 
						Ext.getCmp('custteamname').setReadOnly(true);
						Ext.getCmp('custdivision').setReadOnly(true);
						Ext.getCmp('custteamemail').setReadOnly(true);
						Ext.getCmp('custteamphone').setReadOnly(true);
						Ext.getCmp('custteampoc').setReadOnly(true);
						
				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {
					
					    var currentForm = Ext.getCmp('customerteamsformTab');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						currentForm.getForm().load({
   								 url: 'service/customers_Teams.php',
							     params: {
        						 	action:4,teamid:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						//show add,edit and reset buttons
						Ext.getCmp('custteaminfo_add').setVisible(true); 
						Ext.getCmp('custteaminfo_edit').setVisible(true); 
						Ext.getCmp('custteaminfo_reset').setVisible(true);
						 
						Ext.getCmp('custteamname').setReadOnly(false);
						Ext.getCmp('custdivision').setReadOnly(false);
						Ext.getCmp('custteamemail').setReadOnly(false);
						Ext.getCmp('custteamphone').setReadOnly(false);
						Ext.getCmp('custteampoc').setReadOnly(false);
						
						
				}
			},{
					iconCls: 'deleteClass',
					//tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex) {
					var teams_customerid = Ext.getCmp('basic_customerid').getValue();
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('name')+' ?',+rec.get('name'), function (button) {
							if (button == 'yes') {
								var id=rec.get('id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/customers_Teams.php',
									method: 'POST',
									params : {action:5,teamid:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										
										Ext.getCmp('custteamgrid').getView().refresh();
										var grid1=Ext.getCmp('custteamgrid');
						grid1.getStore().load({params:{action:3,customerid:teams_customerid}});
									},
									failure:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Deletion Failed !', obj.message); 
									}
								});
								
								
							}
						});
					}
					}
				}]
		}
		];
		this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
			]
			
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
