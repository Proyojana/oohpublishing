var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});

var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['usercode','username', 'userdescription','role','team'],
    data: [{"usercode":"US001","username":"James El","userdescription":"New User","role":"Project Manager","team":"Team A"},
    {"usercode":"US002","username":"Richard Branson","userdescription":"New User","role":"Prodution Manager","team":"Team A"},
    {"usercode":"US003","username":"Aaron Ramsey","userdescription":"New User","role":"Copy Editor","team":"Team B"},
     {"usercode":"US004","username":"Blinda Edward","userdescription":"New User","role":"Indexer","team":"Team "},
    
    ]
     });	
Ext.define('MyDesktop.view.mastermanagement.Users.UsersGrid', {
	extend:'Ext.ux.LiveSearchGridPanel',
	alias:'widget.usersgrid',
	closeAction: 'hide',
	selModel:sm,
	height:250,
	//requires : ['MyDesktop.store.Dept'],
	
	id:'usersgrid',
	initComponent: function() {
		
		/*var ci = Ext.create('MyDesktop.store.Users');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);*/
		this.store = store1,
			this.columns = [
				{
					dataIndex: 'userid',
					hidden:true
				},
				{
					dataIndex: 'usercode',
					text: 'User Code',
					align: 'center',
 flex:1,
					width:270,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'username',
					text: 'User Name',
					align: 'center',
 flex:1,
					width:270,
					filter: {
                	type: 'string'
           		}
				},				
				{
					dataIndex: 'role',
					text: 'Role',
					align: 'center',
 flex:1,
					width:270,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'team',
					text: 'Team',
					align: 'center',
 flex:1,
					width:270,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					xtype:'actioncolumn',
					align: 'center',
                    flex:1,
					width:250,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('usersform');
						var rec = grid.getStore().getAt(rowIndex);
						var userid=rec.get('userid');
						currentForm.getForm().load({
   								 url: 'service/Users.php',
							     params: {
        						 	action:2,userid:userid
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('usercode').setReadOnly(true);
						Ext.getCmp('userdescription').setReadOnly(true);
						Ext.getCmp('username').setReadOnly(true);
						
						
						Ext.getCmp('add_users').getEl().hide();
						Ext.getCmp('edit_users').getEl().hide();
						Ext.getCmp('reset_users').getEl().hide();
						
						
    					
    					
    					Ext.getCmp('usersaddform').setTitle('View User');
						
				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
		 	handler: function(grid, rowIndex, colIndex) {
					
					       var currentForm = Ext.getCmp('usersform');
						var rec = grid.getStore().getAt(rowIndex);
						var userid1=rec.get('userid');
						currentForm.getForm().load({
   								 url: 'service/Users.php',
							     params: {
        						 	action:2,userid1:userid1
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('usercode').setReadOnly(false);
						Ext.getCmp('userdescription').setReadOnly(false);
						Ext.getCmp('username').setReadOnly(false);
						
						
						Ext.getCmp('add_users').getEl().show();
						Ext.getCmp('edit_users').getEl().show();
						Ext.getCmp('reset_users').getEl().show();
						
						
    					
    					
    					Ext.getCmp('usersaddform').setTitle('Edit User');
						
				}
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('deptcode')+' ?',+rec.get('deptcode'), function (button) {
							if (button == 'yes') {
								var userid=rec.get('userid');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Users.php',
									method: 'POST',
									params : {action:3,userid:userid},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										ci.load({
											params: {
												start: 0,
												limit: 50
											}
										});
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
		}];
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
