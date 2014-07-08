     var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
     
Ext.define('MyDesktop.view.mastermanagement.Vendors.TeamInfoGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.vendorsteamgrid',
	//closeAction: 'hide',
	selModel:sm,
	//height:100,
requires : ['MyDesktop.store.Teamvendor'],
	title:'',
	id:'vendorsteamgrid',
	initComponent: function() {
		
		var ci = Ext.create('MyDesktop.store.Teamvendor');
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
					dataIndex: 'teamname',
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
					//flex:2,
					width:80,
					filter: {
                	type: 'string'
           		}
				},
				
				
				{
					dataIndex: 'email',
					text: 'E-mail',
					align: 'center',
					//flex:2,
					width:100,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'phone',
					text: 'Phone',
					align: 'center',
					//flex:2,
					width:80,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'poc',
					text: 'POC',
					align: 'center',
					//flex:2,
					width:100,
					filter: {
                	type: 'string'
           		}
				},
				
				
				
				{
					xtype:'actioncolumn',
					align: 'center',
					width:80,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('Vendors_teamformTab');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						//Ext.getCmp('Code').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/TeamsVendor.php',
							     params: {
        						 	action:4,teamid:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('teamaddven').setVisible(false); 
						Ext.getCmp('teameditven').setVisible(false); 
						Ext.getCmp('teamresetvendor').setVisible(false);
						 
						Ext.getCmp('teamname').setReadOnly(true);
						Ext.getCmp('division').setReadOnly(true);
						Ext.getCmp('teamemail').setReadOnly(true);
						Ext.getCmp('teamphone').setReadOnly(true);
						Ext.getCmp('teampoc').setReadOnly(true);
						
						
				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {
					
					    var currentForm = Ext.getCmp('Vendors_teamformTab');
						var rec = grid.getStore().getAt(rowIndex);
						var id=rec.get('id');
						//Ext.getCmp('Code').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/TeamsVendor.php',
							     params: {
        						 	action:4,teamid:id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
					   
							Ext.getCmp('teamaddven').setVisible(true); 
						Ext.getCmp('teameditven').setVisible(true); 
						Ext.getCmp('teamresetvendor').setVisible(true);
						 
						Ext.getCmp('teamname').setReadOnly(false);
						Ext.getCmp('division').setReadOnly(false);
						Ext.getCmp('teamemail').setReadOnly(false);
						Ext.getCmp('teamphone').setReadOnly(false);
						Ext.getCmp('teampoc').setReadOnly(false);
						
						
				}
			},{
					iconCls: 'deleteClass',
					//tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						var basicvendorid=Ext.getCmp('basicid').getValue();
						Ext.Msg.confirm('Remove Record '+rec.get('teamname')+' ?',+rec.get('teamname'), function (button) {
							if (button == 'yes') {
								var id=rec.get('id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/TeamsVendor.php',
									method: 'POST',
									params : {action:5,teamid:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										 var grid1=Ext.getCmp('vendorsteamgrid');
						grid1.getStore().load({params:{action:3,basicvendorid:basicvendorid}});
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
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
