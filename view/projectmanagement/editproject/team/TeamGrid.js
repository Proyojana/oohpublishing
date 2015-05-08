var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var role = Ext.create('Ext.data.Store', {
        fields: ['role'],
        data : [
         {"role":"Project Manager"},
         {"role":"Production Editor"},
         {"role":"Copy Editor"},
         {"role":"Proof Reader"},
         {"role":"Indexer"},
         {"role":"Typesetter"},
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.editproject.team.TeamGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.editteamgrid',
	closeAction: 'hide',
	selModel:sm,
	height:250,
	requires:['MyDesktop.store.Users','MyDesktop.store.Team'],
	id:'editteamgrid',
	plugins: [
             Ext.create('Ext.grid.plugin.CellEditing', {
                 clicksToEdit: 1,
                 markDirty: true,
                 listeners: {
                 'edit': function (editor,e) {
                                         var grid = e.grid;
                                                    var record = e.record;
                                                    if(record.data.status==2 || record.data.status==3)
                                                    return false;
                                   }
                               }
             })        
             ],
	initComponent: function() {
		/*var users = Ext.create('MyDesktop.store.Users');
		users.load({params:{action: 1}});*/
		//var users = Ext.create('MyDesktop.store.GetVenCntct');
	//	users.load({params:{action: 1}});
			var users = Ext.create('MyDesktop.store.GetVenCntct');
		users.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		var team = Ext.create('MyDesktop.store.Team');
		team.load({params:{action: 12}});
		this.store = team,
			this.columns = [
				{
					dataIndex: 'id',
					align: 'center',
                    flex:1,
                    hidden:true
 			   },
			   {
				 dataIndex: 'role',
				 text: 'Role',
				 align: 'center',
                 flex:1,
                 editor:{
					 	xtype:'combo',
					 	store: role,
						queryMode: 'local',
						displayField: 'role',
						valueField: 'role',
						}
				
				},	
				{
					dataIndex: 'name',
					text: 'Name',
					align: 'center',
                    flex:1,
					editor:{
						//xtype:'textfield'
					 	xtype:'combo',
					 	store: users,
					 	
						queryMode: 'local',
						displayField: 'vendor_firstname',
						valueField: 'vendor_firstname',
						mode: 'local',
			   	   triggerAction: 'all',
						
						listeners: {
                change: function (field, newValue, oldValue) {
                	
                	 var grid = this.up().up();
                     var selModel = grid.getSelectionModel();
                	 var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/GetVenCntct.php',
					 method: 'POST',
					 params : {action:2,userid1:newValue},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					 var email=obj1.data.useremail;
					selModel.getSelection()[0].set('email', email);                         
					 }
					 });
                    
			            }
			              }	
                        },
                        renderer: function(value) {
					var index = users.find('vendor_id', value);
					if (index != -1) {
					return users.getAt(index).data.vendor_firstname;
					}
					return value;
					}

				},
				{
					dataIndex: 'email',
					text: 'Email',
					align: 'center',
                    flex:1,
					editor:{
					 	xtype:'textfield',
					 	vtype:'email',
                        },
                },
			];
		this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
			{
                               xtype : 'button',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
               						var r = Ext.create('MyDesktop.model.Team', {
               						id:'',
                    				role: '',
                    				name: '',
                 					email: '',
                    				
                    				
                				});
                				//store.getCount()-1
                		       team.insert(team.getCount(), r);
            				 }                           
        },{
                               xtype : 'button',
                               id : 'edit_refresh_new_team',
                               text : 'Refresh',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
                              		team.reload();
            				 }                           
        }
			],listeners: {
							afterrender : function() {
								this.child('#refresh').hide();
							}		
						}	
			
						
		}),
		
		this.callParent(arguments);

	}
});

