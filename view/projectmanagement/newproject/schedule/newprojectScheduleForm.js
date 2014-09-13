var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectScheduleform',
   		id:'newprojectScheduleform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleHeaderForm','MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleAddForm','MyDesktop.view.projectmanagement.newproject.schedule.newprojectScheduleGrid'],
	title:'Schedule',
    defaults: {
        labelWidth: 115,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'newprojectScheduleHeaderForm',
			x:0,
			y:0
		
			
		},
		{
			fieldLabel:'Project Start Date',
			id:'schedule_projectStartDate',
			xtype:'datefield',
			x:15,
			y:80,
			width:260,	
			afterLabelTextTpl: required,
				},
		
	{
			xtype:'newprojectSchedulegrid',
			x:0,
			y:120
			//xtype:'cityaddform',
						
		},
		/*{
		xtype:'fieldset',
		id:'city_tab',
		plain:true,
		x:0,
		y:260,
		activeTab: 0,
		height:270,
		defaults: {
			bodyStyle:'padding:10px'
		},
		items:[
		{
			xtype:'newprojectScheduleAddform',
			x:1,
			y:270,
			height:260
		}
		*/
		{
				xtype:'button',
				text:'Save + Next',
				pressed:true,
				width:100,
				x:400,
				y:480,
				//	margin:'0 0 0 100',
				handler: function() {

					var projectid=Ext.getCmp('scheduleHeader_projectID').getValue();
					var workflow=Ext.getCmp('scheduleHeader_workflow').getValue();
					var job_code=Ext.getCmp('scheduleHeader_Job').getValue();
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
									action:4,
									projectid:projectid
								}
							});

						}
					});
					Ext.getCmp('newprojectteamformTab').setDisabled(false);
				}
			},
		
	
			]
	  
	
		this.callParent();
	}
     
}); 
