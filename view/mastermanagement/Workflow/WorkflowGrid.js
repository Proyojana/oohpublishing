var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
Ext.define('MyDesktop.view.mastermanagement.Workflow.WorkflowGrid', {
	extend:'Ext.ux.LiveSearchGridPanel',
	alias:'widget.workflowgrid',
	closeAction: 'hide',
	selModel:sm,
	height:250,
	requires : ['MyDesktop.store.Workflow'],
	
	id:'workflowgrid',
	initComponent: function() {
		
		var workflow = Ext.create('MyDesktop.store.Workflow');
		workflow.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		workflow.loadPage(1);
		this.store = workflow,
			this.columns = [
				{
				dataIndex: 'workflow_id',
					hidden:true
				},
				{
					dataIndex: 'workflow_code',
					text: 'Workflow Code',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'workflow_name',
					text: 'Workflow Name',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'workflow_client',
					text: 'Clients',
					align: 'center',
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				
				{
					xtype:'actioncolumn',
					align: 'center',
					width:250,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('workflowform');
						var rec = grid.getStore().getAt(rowIndex);
						var workflow_id=rec.get('workflow_id');
						var workflow_code=rec.get('workflow_code');
						Ext.getCmp('workflow_code').setReadOnly(true);
						currentForm.getForm().load({
   								 url: 'service/Workflow.php',
							     params: {
        						 	action:2,workflow_id:workflow_id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
				//		var grid1=Ext.getCmp('clientgrid');
				//		grid1.getStore().load({params:{action:6,workflow_code:workflow_code}}); 
						
var grid3=Ext.getCmp('stagesgrid');
		grid3.getStore().load({params:{action:1,workflowid:workflow_id}});
						
						Ext.getCmp('workflow_code').setReadOnly(true);
						Ext.getCmp('workflow_name').setReadOnly(true);
						Ext.getCmp('workflow_description').setReadOnly(true);
						
						Ext.getCmp('add_workflow').getEl().hide();
						Ext.getCmp('edit_workflow').getEl().hide();
						Ext.getCmp('reset_workflow').getEl().hide();
						
				}
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {
					
					    var currentForm = Ext.getCmp('workflowform');
						var rec = grid.getStore().getAt(rowIndex);
						var workflow_id=rec.get('workflow_id');
						var workflow_code=rec.get('workflow_code');
						Ext.getCmp('workflow_code').setReadOnly(true);
						
						currentForm.getForm().load({
   								 url: 'service/Workflow.php',
							     params: {
        						 	action:2,workflow_id:workflow_id
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
				//		var grid1=Ext.getCmp('clientgrid');
				//		grid1.getStore().load({params:{action:6,workflow_code:workflow_code}});
						
		var grid3=Ext.getCmp('stagesgrid');
		grid3.getStore().load({params:{action:1,workflowid:workflow_id}});
						Ext.getCmp('workflow_code').setReadOnly(false);
						Ext.getCmp('workflow_name').setReadOnly(false);
						Ext.getCmp('workflow_description').setReadOnly(false);
						
						Ext.getCmp('add_workflow').getEl().show();
						Ext.getCmp('edit_workflow').getEl().show();
						Ext.getCmp('reset_workflow').getEl().show();			
						
				}
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('workflow_code')+' ?',+rec.get('workflow_code'), function (button) {
							if (button == 'yes') {
								var workflow_id=rec.get('workflow_id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Workflow.php',
									method: 'POST',
									params : {action:3,workflow_id:workflow_id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										product.load({
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
