var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['role_id','role',],
    data: [{"role_id":"1","role":"Project Manager"},
    {"role_id":"2","role":"Production Editor"},
    {"role_id":"3","role":"Copy Editor"},
    {"role_id":"4","role":"Proof Reader"},
    {"role_id":"5","role":"Indexer"},
    {"role_id":"6","role":"Typesetter"},
    ]});
    	
Ext.define('MyDesktop.view.projectmanagement.newproject.team.TeamGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.newteamgrid',
	closeAction: 'hide',
	selModel:sm,
	height:250,
	requires:['MyDesktop.store.ProjectManagers','MyDesktop.store.ProductionEditor','MyDesktop.store.Projects',],
	id:'newteamgrid',
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
		
		var projectmanager = Ext.create('MyDesktop.store.ProjectManagers');
		projectmanager.load({params:{action: 8}});
		
		var vendor = Ext.create('MyDesktop.store.Vendors');
		vendor.load({params:{action: 1}});
	
		this.store = store1,
			this.columns = [
				{
					dataIndex: 'role_id',
					align: 'center',
                    flex:1,
                    hidden:true
 			   },
			    {
				 dataIndex: 'role',
				 text: 'Role',
				 align: 'center',
                 flex:1,
				 
				},	
				{
					dataIndex: 'name',
					text: 'Name',
					align: 'center',
                    flex:1,
					editor:{
						//xtype:'textfield'
					 	xtype:'combo',
					 	store: vendor,
						queryMode: 'local',
						displayField: 'name',
						valueField: 'name',
						listeners: {
                    /*change: function (field, newValue, oldValue) {
                	var grid = this.up().up();
                        // get selection model of the grid  
                     var selModel = grid.getSelectionModel();
                	 var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/vendors.php',
					 method: 'POST',
					 params : {action:2,id:newValue},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					 var email=obj1.data.basicemail;
					selModel.getSelection()[0].set('email', email);                         
					 }
					 });
			            }*/
			              }	
                        },
                         renderer: function(value) {
					var index = vendor.find('id', value);
					if (index != -1) {
					return vendor.getAt(index).data.name;
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
					 	xtype:'textfield'
                        },

				},
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

