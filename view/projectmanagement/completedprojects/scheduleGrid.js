

/*Completed projects for schedule grid*/


var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});

Ext.define('MyDesktop.view.projectmanagement.completedprojects.scheduleGrid', {
	extend:'Ext.grid.Panel',
	title: 'Schedule Grid',
	alias:'widget.schedulegridCP',
	closeAction: 'hide',
	selModel:sm,
	height:350,
	id:'schedulegridCP',
	plugins: [
	Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 1
	})
	],
initComponent: function() {

		var ci = Ext.create('MyDesktop.store.ViewSchedule');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);
		this.store = ci,
		this.columns = [{
			dataIndex: 'schedule_id',
			hidden:true
		},
		{
			dataIndex: 'activityid',
			hidden:true
		},
		{
			dataIndex: 'stageorder',
			text: 'Stage Order',
			align: 'center',
			flex:0.5,
		},
		{
			dataIndex: 'activity',
			text: 'Activity',
			align: 'center',
			flex:1,
			//width:270,
			filter: {
				type: 'string'
			}
		},
		{
			dataIndex: 'stage',
			text: 'Stage',
			align: 'center',
			flex:1,
			//width:270,
			filter: {
				type: 'string'
			}
		},{
			text:'Days per stage',
			
			columns: [{
				dataIndex: 'estimated_daysperstage',
				text: 'Estimate',
				align:'center',
		
				

				textStyle:'font-size:13px;'

			},{
				dataIndex: 'actual_daysperstage',
				text: 'Actuals',
		
				align:'center',
			}
			]
		},{
			text:'Start Date',
			
			columns: [{
				dataIndex: 'estimated_start_date',
				text: 'Estimate',
				align:'center',
				
				textStyle:'font-size:13px;'

			},{
				dataIndex: 'actual_start_date',
				text: 'Actuals',
				align:'center',
				
			}
			]
		},{
			text:'End Date',

			columns: [{
				dataIndex: 'estimated_end_date',
				text: 'Estimate',
				align:'center',
				editor: {
					xtype:'datefield',
				},
				textStyle:'font-size:13px;'

			},{
				dataIndex: 'actual_end_date',
				text: 'Actuals',
				align:'center',
				editor: {
					xtype:'datefield',
				},
			}
			]
		},{

		dataIndex: 'bufferday',
			text: 'Buffer Days',
			editor: {
				xtype:'numberfield',
			},
			align:'center',
		
		
		},];
		this.bbar = Ext.create('Ext.PagingToolbar', {

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
		    items:[
		    {
                               xtype : 'button',
                               id : 'edit_refresh_schedule',
                               text : 'Refresh',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
                              		ci.reload();
            				 }                           
        },
			],listeners: {
							afterrender : function() {
								this.child('#refresh').hide();
							}		
						}	


		}),

		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
