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
		
		var productioneditor = Ext.create('MyDesktop.store.ProductionEditor');
		productioneditor.load({params:{action: 9}});
	
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
						xtype:'textfield'
					 /*	xtype:'combo',
					 	store: productioneditor,
						queryMode: 'local',
						displayField: 'username',
						valueField: 'userid',
						listeners: {
                change: function (field, newValue, oldValue) {
                	var grid = this.up().up();
                        // get selection model of the grid  
                    var selModel = grid.getSelectionModel();
                		var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/Users.php',
					 method: 'POST',
					 params : {action:2,userid1:newValue},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					 var email=obj1.data.useremail;
					selModel.getSelection()[0].set('email', email);                         
					 }
					 });
                    
			            }
			              }	*/
                        },
                         renderer: function(value) {
					var index = productioneditor.find('userid', value);
					if (index != -1) {
					return productioneditor.getAt(index).data.username;
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
			items:[
			/*{
				xtype:'button',
				text:'Save + Next',
				pressed:true,
				width:100,
				handler:function(){
					var project_id=Ext.getCmp('teamHeader_projectID').getValue(); 
					var job_code=Ext.getCmp('teamHeader_Job').getValue(); 
					var role='';
					var name='';
					var email='';
					var myStore = Ext.getCmp('newteamgrid').getStore();
					myStore.each(function(rec) {
						role=role+rec.get('role')+',';
						name=name+rec.get('name')+',';
						email=email+rec.get('email')+',';
						});
						
					var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/Users.php',
						method: 'POST',
						params : {action:11,project_id:project_id,role:role,name:name,email:email},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);
							//Ext.getCmp('newprojectnotesformTab').setDisabled(false);
							
						}
					});
					var currentHeaderForm = Ext.getCmp('newprojectNotesHeaderForm');
                	
                	
						
						currentHeaderForm.getForm().load({
   								 url: 'service/notes.php',
							     params: {
        						 	action:5,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   
							   
						});
					Ext.getCmp('newprojectnotesformTab').setDisabled(false);
						Ext.getCmp('newprojecttab').layout.setActiveItem('newprojectnotesformTab');
				}
			}*/
			]
			
						
		}),
		
		this.callParent(arguments);

	}
});

