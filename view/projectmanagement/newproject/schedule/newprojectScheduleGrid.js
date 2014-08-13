var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});

Ext.define('MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleGrid', {
	extend:'Ext.grid.Panel',
	title: 'Schedule Grid',
	alias:'widget.newprojectSchedulegrid',
	closeAction: 'hide',
	selModel:sm,
	height:350,
	requires : ['MyDesktop.store.Budget'],

	id:'newprojectSchedulegrid',
	plugins: [
	Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 1
	})
	],
	initComponent: function() {

		var ci = Ext.create('MyDesktop.store.Schedule');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);
		this.store = ci,
		this.columns = [{
			dataIndex: 'usersid',
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
		
				editor: {
					xtype:'numberfield',
					hideTrigger:true,
						listeners: {
						change: function(field, newValue, oldValue) {
										
							var grid = this.up().up();
							//get rowIndex
							var selectedRecord = grid.getSelectionModel().getSelection()[0];
							var rowIndex = grid.store.indexOf(selectedRecord);
							
							
							// get selection model of the grid							
							var selModel = grid.getSelectionModel();
							//var eDay=selModel.getSelection()[0].data.estimated_daysperstage;
							
							if(rowIndex!=0){
							var bDay=grid.getStore().getAt(rowIndex-1).data.bufferday;
							var eEndDate=grid.getStore().getAt(rowIndex-1).data.estimated_end_date;
							var val=Ext.Date.add(eEndDate,Ext.Date.DAY,bDay);
							selModel.getSelection()[0].set('estimated_start_date', val);
							var sdate=selModel.getSelection()[0].data.estimated_start_date;
						
							var val1=Ext.Date.add(sdate,Ext.Date.DAY,newValue);
							//alert(val1);
							selModel.getSelection()[0].set('estimated_end_date', val1);
							}
							
							else
							{
								
								var currentForm = this.up('newprojectScheduleform');
								var startDate = Ext.getCmp('schedule_projectStartDate').getValue();
								
								if(startDate!=null)
								{
									selModel.getSelection()[0].set('estimated_start_date', startDate);
									var sdate=selModel.getSelection()[0].data.estimated_start_date;
						
									var val1=Ext.Date.add(sdate,Ext.Date.DAY,newValue);
							
									selModel.getSelection()[0].set('estimated_end_date', val1);
								}
								else
								{	
									selModel.getSelection()[0].set('estimated_daysperstage', 0);
									Ext.Msg.alert('Message', 'Please Select Project Start Date');
									selModel.getSelection()[0].set('estimated_daysperstage', 0);
								}
							}
					} 

				}
				},

				textStyle:'font-size:13px;'

			},{
				dataIndex: 'actual_daysperstage',
				text: 'Actuals',
				
				editor: {
					xtype:'numberfield',
					hideTrigger:true,
						listeners: {
						change: function(field, newValue, oldValue) {
										
							var grid = this.up().up();
							//get rowIndex
							var selectedRecord = grid.getSelectionModel().getSelection()[0];
							var rowIndex = grid.store.indexOf(selectedRecord);
							
							
							// get selection model of the grid							
							var selModel = grid.getSelectionModel();
							//var eDay=selModel.getSelection()[0].data.estimated_daysperstage;
							
							if(rowIndex!=0){
							var aDay=grid.getStore().getAt(rowIndex-1).data.bufferday;
							var aEndDate=grid.getStore().getAt(rowIndex-1).data.estimated_end_date;
							var val=Ext.Date.add(aEndDate,Ext.Date.DAY,aDay);
							selModel.getSelection()[0].set('actual_start_date', val);
							var sdate=selModel.getSelection()[0].data.actual_start_date;
						
							var val1=Ext.Date.add(sdate,Ext.Date.DAY,newValue);
							//alert(val1);
							selModel.getSelection()[0].set('actual_end_date', val1);
							}
							
							else
							{
								
									//selModel.getSelection()[0].set('estimated_start_date', startDate);
									var sdate=selModel.getSelection()[0].data.actual_start_date;
						
									var val1=Ext.Date.add(sdate,Ext.Date.DAY,newValue);
							
									selModel.getSelection()[0].set('actual_end_date', val1);
								
							}
					} 

				}
				},
	
				align:'center',
			}
			]
		},{
			text:'Start Date',
			
			columns: [{
				dataIndex: 'estimated_start_date',
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
				dataIndex: 'actual_start_date',
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
				text:'Save + Next',
				pressed:true,
				width:100,
				//	margin:'0 0 0 100',
				handler: function() {

					var projectid=Ext.getCmp('scheduleHeader_projectID').getValue();
					var workflow=Ext.getCmp('scheduleHeader_workflow').getValue();
					var job_code=Ext.getCmp('scheduleHeader_Job').getValue();
					var stage='';
					var estimated_daysperstage='';
					var actual_daysperstage='';
					var estimated_start_date='';
					var actual_start_date='';
					var estimated_end_date='';
					var actual_end_date='';
					var bufferday='';
					var activity='';
					var grid=Ext.getCmp('newprojectSchedulegrid');

					var myStore = Ext.getCmp('newprojectSchedulegrid').getStore();
					//items = [];

					myStore.each( function(rec) {
						stage=stage+rec.get('stage')+',';
						estimated_daysperstage=estimated_daysperstage+rec.get('estimated_daysperstage')+',';
						actual_daysperstage=actual_daysperstage+rec.get('actual_daysperstage')+',';
						estimated_start_date=estimated_start_date+rec.get('estimated_start_date')+',';
						actual_start_date=actual_start_date+rec.get('actual_start_date')+',';
						estimated_end_date=estimated_end_date+rec.get('estimated_end_date')+',';
						actual_end_date=actual_end_date+rec.get('actual_end_date')+',';
						bufferday=bufferday+rec.get('bufferday')+',';
						activity=activity+rec.get('activityid')+',';

					});
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/schedule.php',
						method: 'POST',
						params : {
							action:3,
							projectid:projectid,
							workflow:workflow,
							activity:activity,
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
					Ext.getCmp('newprojecttab').layout.setActiveItem('newprojectteamformTab');
				}
			},
			]

		}),

		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);