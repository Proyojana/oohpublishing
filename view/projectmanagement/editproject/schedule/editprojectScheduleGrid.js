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
initComponent: function() {//load activity combo
		var activity = Ext.create('MyDesktop.store.ProductionStages');
		activity.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		var ci = Ext.create('MyDesktop.store.Schedule');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		
		
		ci.loadPage(1);
		this.store = ci,
		this.tbar = Ext.create('Ext.Toolbar', {  
							   items:[{
                               xtype : 'button',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
               						var r = Ext.create('MyDesktop.model.Schedule', {
               						schedule_id:'',
                    				stageorder: '',
                    				activity: '',
                 					activityid: '',
                    				stage: '',
                    				estimated_daysperstage:'',
                    				actual_daysperstage: '',
                    				estimated_start_date: '',
                 					actual_start_date: '',
                    				estimated_end_date: '',
                    				actual_end_date:'',
                    				bufferday: '',
                    				
                				});
                				//store.getCount()-1
                		       ci.insert(ci.getCount(), r);
            				 }                           
        },
        
        ]
        });
		this.columns = [{
			dataIndex: 'schedule_id',
			hidden:true
		},
	
		{
			dataIndex: 'stageorder',
			text: 'Stage Order',
			align: 'center',
			editor: {
				xtype:'numberfield',
				hideTrigger:true,
			},
			flex:0.5,
		},
		{
			dataIndex: 'activityid',
			text: 'Activity',
			align: 'center',
			flex:1,
			 editor: { 
						xtype:'combo',
						store: activity,
						queryMode: 'local',
						displayField: 'product_name',
						valueField: 'product_id',
						},
						
	renderer: function(value) {
					var index = activity.find('product_id', value);
					if (index != -1) {
					return activity.getAt(index).data.product_name;
					}
					return value;
					}
		},
		{
			dataIndex: 'stage',
			text: 'Stage',
			align: 'center',
			flex:1,
			//width:270,
			editor: { 
						xtype:'textfield',
						
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
							/* set value for estimated_start_date */
							var bDay=grid.getStore().getAt(rowIndex-1).data.bufferday;
							var eEndDate=grid.getStore().getAt(rowIndex-1).data.estimated_end_date;
							var val=Ext.Date.add(eEndDate,Ext.Date.DAY,bDay);
							selModel.getSelection()[0].set('estimated_start_date', val);
							
							/* set value for estimated_end_date */
							var sdate=selModel.getSelection()[0].data.estimated_start_date;
							var val1=Ext.Date.add(sdate,Ext.Date.DAY,newValue);
							selModel.getSelection()[0].set('estimated_end_date', val1);
							}
							
							else
							{
								
								var currentForm = this.up('newprojectScheduleform');
								var startDate = Ext.getCmp('schedule_projectStartDate').getValue();
								
								if(startDate!=null)
								{
									/* set value for estimated_start_date */
									selModel.getSelection()[0].set('estimated_start_date', startDate);
									
									/* set value for estimated_end_date */
									var sdate=selModel.getSelection()[0].data.estimated_start_date;
									var val1=Ext.Date.add(sdate,Ext.Date.DAY,newValue);
									selModel.getSelection()[0].set('estimated_end_date', val1);
								}
								else
								{	
									
									Ext.Msg.alert('Message', 'Please Select Project Start Date');
									//empty the entered value in grid column estimated_daysperstage
									var rec = grid.store.getAt(rowIndex);
                					rec.set('estimated_daysperstage', '0');
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
							//	var aDay=grid.getStore().getAt(rowIndex-1).data.bufferday;
							var aEndDate=grid.getStore().getAt(rowIndex-1).data.actual_end_date;
							/*var val=Ext.Date.add(aEndDate,Ext.Date.DAY,aDay);*/
							selModel.getSelection()[0].set('actual_start_date', aEndDate);
							var sdate=selModel.getSelection()[0].data.actual_start_date;
							var val1=Ext.Date.add(sdate,Ext.Date.DAY,newValue);
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
					renderer: function(value){
						//alert(value);
						if(value!=null && value!='' && value!='null'){
							var v=value.getDay();
							if(v==0||v==6){
							return '<span style="color:#FF0000;font-weight:bold">'+value+'</span>';	
							}
							else
							{
								return value;
							}
						}
						else
						{						
							return value;
														
						}
						
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
				renderer: function(value){
						//alert(value);
						if(value!=null && value!='' && value!='null'){
							var v=value.getDay();
							if(v==0||v==6){
							return '<span style="color:#FF0000;font-weight:bold">'+value+'</span>';	
							}
							else
							{
								return value;
							}
						}
						else
						{						
							return value;
														
						}
						
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
					listeners: {
						change: function(field, newValue, oldValue) {
							var grid = this.up().up();
							// get selection model of the grid
							var selModel = grid.getSelectionModel();
							var start_date=selModel.getSelection()[0].data.estimated_start_date;
							//date diffrence 
							var sec = 1000;
							var min = sec * 60;
							var hour = min * 60;
							var day = hour * 24;
							
							var dateDiff = (newValue - start_date) / day;
							
							selModel.getSelection()[0].set('estimated_daysperstage', dateDiff);

						},
					} ,
				},
				renderer: function(value){
						//alert(value);
						if(value!=null && value!='' && value!='null'){
							var v=value.getDay();
							if(v==0||v==6){
							return '<span style="color:#FF0000;font-weight:bold">'+value+'</span>';	
							}
							else
							{
								return value;
							}
						}
						else
						{						
							return value;
														
						}
						
					},
				textStyle:'font-size:13px;'

			},{
				dataIndex: 'actual_end_date',
				text: 'Actuals',
				align:'center',
				editor: {
					xtype:'datefield',
					listeners: {
						change: function(field, newValue, oldValue) {
							var grid = this.up().up();
							// get selection model of the grid
							var selModel = grid.getSelectionModel();
							var start_date=selModel.getSelection()[0].data.actual_start_date;
							//date diffrence 
							var sec = 1000;
							var min = sec * 60;
							var hour = min * 60;
							var day = hour * 24;
							
							var dateDiff = (newValue - start_date) / day;
							
							selModel.getSelection()[0].set('actual_daysperstage', dateDiff);

						},
					} ,
				},
				renderer: function(value){
						//alert(value);
						if(value!=null && value!='' && value!='null'){
							var v=value.getDay();
							if(v==0||v==6){
							return '<span style="color:#FF0000;font-weight:bold">'+value+'</span>';	
							}
							else
							{
								return value;
							}
						}
						else
						{						
							return value;
														
						}
						
					},
			}
			]
		},{

		dataIndex: 'bufferday',
			text: 'Buffer Days',
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
											
							/* set value for estimated start date **/
							var eEndDate=selModel.getSelection()[0].data.estimated_end_date;
							var val=Ext.Date.add(eEndDate,Ext.Date.DAY,newValue);
							
							var rec = grid.store.getAt(rowIndex+1);
                			rec.set('estimated_start_date', val);
							
							/* set value for estimated end date */
							var eDay=grid.getStore().getAt(rowIndex+1).data.estimated_daysperstage;
							var eStartDate=grid.getStore().getAt(rowIndex+1).data.estimated_start_date;
							var eEndDateval=Ext.Date.add(eStartDate,Ext.Date.DAY,eDay);
							rec.set('estimated_end_date', eEndDateval);
							
							
								

							
					} 

				}
			},
			align:'center',
		
		
		},{
		 xtype:'actioncolumn',
		 align: 'center',
		 flex:1,
		 //width:250,
		 text:'Actions',
		 items: [{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
						
						var grid = this.up('grid');
					if (grid) {
						var projectid=Ext.getCmp('edit_scheduleHeader_projectID').getValue();
						
						       	var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('stage')+' ?',+rec.get('stage'), function (button) {
							if (button == 'yes') {
								var id=rec.get('schedule_id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/schedule.php',
									method: 'POST',
									params : {action:6,id:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										 var grid3=Ext.getCmp('editprojectSchedulegrid');
											grid3.getStore().load({
												params: {
													action:4,
													projectid:projectid
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
				},]
		 }];
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
					var job_code=Ext.getCmp('edit_scheduleHeader_Job').getValue();
					var stage='';
					var stageorder='';
					var estimated_daysperstage='';
					var actual_daysperstage='';
					var estimated_start_date='';
					var actual_start_date='';
					var estimated_end_date='';
					var actual_end_date='';
					var bufferday='';
					var activity='';
					var schedule_id='';
					var grid=Ext.getCmp('editprojectSchedulegrid');

					var myStore = Ext.getCmp('editprojectSchedulegrid').getStore();
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
						stageorder=stageorder+rec.get('stageorder')+',';
						schedule_id=schedule_id+rec.get('schedule_id')+',';

					});
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/schedule.php',
						method: 'POST',
						params : {
							action:3,
							projectid:projectid,
							stageorder:stageorder,
							scheduleid:schedule_id,
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


							//refresh grid
							var grid3=Ext.getCmp('editprojectSchedulegrid');
							grid3.getStore().load({
								params: {
									action:4,
									projectid:projectid
								}
							});

						}
					});
				
				}
			},
			]

		}),

		this.callParent(arguments);
		
			}
});

// Load first data page
//    employee.loadPage(1);