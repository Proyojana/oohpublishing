var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			
   var ratecard = Ext.create('Ext.data.JsonStore', {
   fields: ['Services','Name', 'Email','Phone'],
   });
Ext.define('MyDesktop.view.mastermanagement.Workflow.StagesGrid', {
	extend:'Ext.grid.Panel',
	title: 'Stages',
	alias:'widget.stagesgrid',
	closeAction: 'hide',
	selModel:sm,
	requires:['MyDesktop.store.ProductionStages'],
	id:'stagesgrid',
	plugins: [
              Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1,
                  id:'editing',
                  listeners: {
                  'edit': function (editor,e) {
		                  	var grid = e.grid;
		                  	var record=e.record;
                 			var code = e.value;
                 			
                 		   	}
				}
             })        
    ],
	initComponent: function() {
	
		var activity = Ext.create('MyDesktop.store.ProductionStages');
		activity.load({
			params: {
				start: 0,
				limit: 50
			}
		});
			activity.loadPage(1);
		var ratecard = Ext.create('MyDesktop.store.Stages');
		ratecard.load({
			params: {
				start: 0,
				limit: 50
			}
		});
	
		this.store = ratecard,
		this.tbar = Ext.create('Ext.Toolbar', {  
							   items:[{
                               xtype : 'button',
                               id : 'addnewrowactivity',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
               						 var r = Ext.create('MyDesktop.model.Stages', {
               						 stage_id:'',
                    				stage_name: '',
                    				activity: ''
                				});
                		       ratecard.insert(0, r);
            				 }                           
        },
        
        ]
        });
		this.columns = [
				{
					dataIndex: 'stage_id',
					hidden:true
				},
				
				{
					dataIndex: 'stage_name',
					text: 'Stage Name',
					align:'center',
					flex:1,
					editor:{
						xtype:'textfield'
					}
					
				},
				{
					dataIndex: 'activity',
					text: 'Activity',
					flex:1,
					align:'center',
					editor:
					{ 
					xtype:'combo',
					store: activity,
		        	queryMode: 'local',
		       		displayField: 'product_name',
		        	valueField: 'product_id',
		        	mode: 'local',
			   	   triggerAction: 'all',
		           },
		           
				},
			
								
		{
			xtype:'actioncolumn',
			align: 'center',
			width:150,
			text:'Actions',
			
			items: [
				{
				iconCls: 'saveClass',
				tooltip: 'save',
				handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						        var rec = grid.getStore().getAt(rowIndex);
						        var workflow_id = Ext.getCmp('workflow_id').getValue();
								var stage_name=rec.get('stage_name');
								var stage_id=rec.get('stage_id');
								var activity=rec.get('activity');
															
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/stages.php',
									method: 'POST',
									params : {action:2,stage_id:stage_id,workflow_id:workflow_id,activity:activity,stage_name:stage_name},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully saved', obj.message); 
										var grid3=Ext.getCmp('stagesgrid');
						grid3.getStore().load({params:{action:1,workflowid:workflow_id}});
									},
									failure:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('saving Failed !', obj.message); 
									}
								});
					}
					
					
				}
			},
			{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
						var workflow_id = Ext.getCmp('workflow_id').getValue();
						//var teams_customerid = Ext.getCmp('basic_customerid').getValue();
						var grid = this.up('grid');
					if (grid) {
						       	var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('stage_name')+' ?',+rec.get('stage_name'), function (button) {
							if (button == 'yes') {
								var id=rec.get('stage_id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/stages.php',
									method: 'POST',
									params : {action:3,stage_id:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										 var grid3=Ext.getCmp('stagesgrid');
						grid3.getStore().load({params:{action:1,workflowid:workflow_id}});
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
				},
			]
		}];
		
		this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display"
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
