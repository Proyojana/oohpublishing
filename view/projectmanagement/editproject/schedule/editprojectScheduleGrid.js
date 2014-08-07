var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});

Ext.define('MyDesktop.view.projectmanagement.editproject.schedule.editprojectScheduleGrid', {
	extend:'Ext.grid.Panel',
	title: 'Schedule Grid',
	alias:'widget.editprojectSchedulegrid',
	closeAction: 'hide',
	selModel:sm,
	height:350,
	requires : ['MyDesktop.store.Budget'],

	id:'editprojectSchedulegrid',
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
		},{
			dataIndex: 'schedule_stage',
			text: 'Stage',
			align: 'center',
			flex:1,
			
			filter: {
				type: 'string'
			}
		},{
			text:'Days per stage',

			columns: [{
				dataIndex: 'schedule_estimated_daysperstage',
				text: 'Estimate',
				align:'center',
				editor: {
					xtype:'textfield',
						/**listeners: {
						change: function(field, newValue, oldValue) {
							var grid = this.up().up();
							// get selection model of the grid
							var selModel = grid.getSelectionModel();
							var startdate=selModel.getSelection()[0].data.estimated_start_date;
								alert(startdate);
								alert(newValue);
							var val=Ext.Date.add(startdate,Ext.Date.DAY,newValue);
							
							selModel.getSelection()[0].set('estimated_end_date', val);

						},
					} ,**/
				},

				textStyle:'font-size:13px;'

			},{
				dataIndex: 'schedule_actual_daysperstage',
				text: 'Actuals',
				editor: {
					xtype:'textfield',
					/**listeners: {
						change: function(field, newValue, oldValue) {
							var grid = this.up().up();
							// get selection model of the grid
							var selModel = grid.getSelectionModel();
							var enddate=selModel.getSelection()[0].data.actual_start_date;

							var val=Ext.Date.add(enddate,Ext.Date.DAY,newValue);

							selModel.getSelection()[0].set('actual_end_date', val);

						},
					} ,**/
				},
				align:'center',
			}
			]
		},{
			text:'Start Date',

			columns: [{
				dataIndex: 'schedule_estimated_start_date',
				text: 'Estimate',
				align:'center',
				editor: {
					xtype:'datefield',

					listeners: {
						change: function(field, newValue, oldValue) {
							var grid = this.up().up();
							// get selection model of the grid
							var selModel = grid.getSelectionModel();
							var days=selModel.getSelection()[0].data.estimated_daysperstage;

							var val=Ext.Date.add(newValue,Ext.Date.DAY,days);

							selModel.getSelection()[0].set('estimated_end_date', val);

						},
					} ,

				},

				textStyle:'font-size:13px;'

			},{
				dataIndex: 'schedule_actual_start_date',
				text: 'Actuals',
				align:'center',
				editor: {
					xtype:'datefield',
					listeners: {
						change: function(field, newValue, oldValue) {
							var grid = this.up().up();
							// get selection model of the grid
							var selModel = grid.getSelectionModel();
							var days=selModel.getSelection()[0].data.actual_daysperstage;

							var val=Ext.Date.add(newValue,Ext.Date.DAY,days);

							selModel.getSelection()[0].set('actual_end_date', val);

						},
					} ,
				},
			}
			]
		},{
			text:'End Date',

			columns: [{
				dataIndex: 'schedule_estimated_end_date',
				text: 'Estimate',
				align:'center',
				editor: {
					xtype:'datefield',
				},
				textStyle:'font-size:13px;'

			},{
				dataIndex: 'schedule_actual_end_date',
				text: 'Actuals',
				align:'center',
				editor: {
					xtype:'datefield',
				},
			}
			]
		},{
			dataIndex: 'schedule_bufferday',
			text: 'Buffer Days',
			editor: {
				xtype:'textfield',
			},
			align:'center',
		},/**{
		 xtype:'actioncolumn',
		 align: 'center',
		 flex:1,
		 //width:250,
		 text:'Actions',
		 items: [{
		 iconCls: 'viewClass',
		 //icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
		 tooltip: 'View',
		 handler: function(grid, rowIndex, colIndex) {
		 var currentForm = Ext.getCmp('deptform');
		 var rec = grid.getStore().getAt(rowIndex);
		 var date=rec.get('team');
		 //alert(date);
		 console.log(date);
		 var conn = new Ext.data.Connection();
		 conn.request({
		 url: 'service/schedule.php',
		 method: 'POST',
		 params : {
		 action:2,
		 date:date
		 },
		 success: function(response) {
		 obj = Ext.JSON.decode(response.responseText);
		 Ext.Msg.alert('Message', obj.message);

		 }
		 });

		 }
		 },{
		 iconCls: 'editClass',
		 //icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
		 tooltip: 'Edit',
		 handler: function(grid, rowIndex, colIndex) {

		 var currentForm = Ext.getCmp('deptform');
		 var rec = grid.getStore().getAt(rowIndex);
		 var deptid=rec.get('deptid');
		 Ext.getCmp('deptcode').setReadOnly(true);
		 currentForm.getForm().load({
		 url: 'service/Dept.php',
		 params: {
		 action:2,
		 deptid:deptid
		 },
		 failure: function(form, action) {
		 Ext.Msg.alert("Load failed", action.result.errorMessage);
		 }
		 });

		 Ext.getCmp('depttab').layout.setActiveItem('deptform');
		 Ext.getCmp('deptcode').setReadOnly(false);
		 Ext.getCmp('deptdesc').setReadOnly(false);
		 Ext.getCmp('deptname').setReadOnly(false);

		 Ext.getCmp('add_dept').getEl().show();
		 Ext.getCmp('edit_dept').getEl().show();
		 Ext.getCmp('reset_dept').getEl().show();

		 Ext.getCmp('deptaddform').setTitle('Edit Dept');

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
		 var deptid=rec.get('deptid');
		 var conn = new Ext.data.Connection();
		 conn.request({
		 url: 'service/Dept.php',
		 method: 'POST',
		 params : {
		 action:3,
		 deptid:deptid
		 },
		 success: function(response) {
		 obj = Ext.JSON.decode(response.responseText);
		 Ext.Msg.alert('Successfully Deleted', obj.message);
		 stat.load({
		 params: {
		 start: 0,
		 limit: 50
		 }
		 });
		 },
		 failure: function(response) {
		 obj = Ext.JSON.decode(response.responseText);
		 Ext.Msg.alert('Deletion Failed !', obj.message);
		 }
		 });

		 }
		 });
		 }

		 }
		 }]
		 }**/];
		this.bbar = Ext.create('Ext.PagingToolbar', {

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
		    items:[{
				xtype:'button',
				text:'Save',
				pressed:true,
				width:100,
				//	margin:'0 0 0 100',
				handler: function() {

					var projectid=Ext.getCmp('edit_scheduleHeader_projectID').getValue();
					var workflow=Ext.getCmp('edit_scheduleHeader_workflow').getValue();
					//var job_code=Ext.getCmp('scheduleHeader_Job').getValue();
					var stage='';
					var estimated_daysperstage='';
					var actual_daysperstage='';
					var estimated_start_date='';
					var actual_start_date='';
					var estimated_end_date='';
					var actual_end_date='';
					var bufferday='';
					var grid=Ext.getCmp('newprojectSchedulegrid');

					var myStore = Ext.getCmp('newprojectSchedulegrid').getStore();
					//items = [];

					myStore.each( function(rec) {
						/* 	//alert(rec);
						 items.push({
						 html: rec.get('estimated_start_date')
						 });

						 console.log(items);

						 console.log(rec);*/
						stage=stage+rec.get('stage')+',';
						estimated_daysperstage=estimated_daysperstage+rec.get('estimated_daysperstage')+',';
						actual_daysperstage=actual_daysperstage+rec.get('actual_daysperstage')+',';
						estimated_start_date=estimated_start_date+rec.get('estimated_start_date')+',';
						actual_start_date=actual_start_date+rec.get('actual_start_date')+',';
						estimated_end_date=estimated_end_date+rec.get('estimated_end_date')+',';
						actual_end_date=actual_end_date+rec.get('actual_end_date')+',';
						bufferday=bufferday+rec.get('bufferday')+',';

					});
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/schedule.php',
						method: 'POST',
						params : {
							action:3,
							projectid:projectid,
							workflow:workflow,
							stage:stage,
							estimated_daysperstage:estimated_daysperstage,
							actual_daysperstage:actual_daysperstage,
							estimated_start_date:estimated_start_date,
							actual_start_date:actual_start_date,
							estimated_end_date:estimated_end_date,
							actual_end_date:actual_end_date,
							bufferday:bufferday

						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);

							var currentHeaderForm = Ext.getCmp('newprojectTeamHeaderForm');
							/****load data in header form*****/

							currentHeaderForm.getForm().load({
								url: 'service/projects.php',
								params: {
									action:16,
									job_code:job_code
								},
								failure: function(form, action) {
									Ext.Msg.alert("Load failed", action.result.errorMessage);
								}
							});

							//refresh grid
							var grid3=Ext.getCmp('newprojectSchedulegrid');
							grid3.getStore().load({
								params: {
									action:8,
									workflowid:workflow,
									projectid:projectID
								}
							});

						}
					});
					Ext.getCmp('newprojectteamformTab').setDisabled(false);
				}
			},
			]


		}),

		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);