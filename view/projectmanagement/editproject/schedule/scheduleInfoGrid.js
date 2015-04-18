Ext.define('MyDesktop.view.projectmanagement.editproject.schedule.scheduleInfoGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.scheduleInfoGrid',
	closeAction: 'hide',
	id:'scheduleInfoGrid',
	
	requires : ['MyDesktop.store.TSchedule'],
	initComponent: function() {
		var tschedule = Ext.create('MyDesktop.store.TSchedule');
		tschedule.load({params:{start: 0, limit: 50}});
	    tschedule.loadPage(1);
	    autoScroll : true,
			this.store = tschedule,
			
			this.columns = [
				{
				
					dataIndex: 'stageorder',
					text: 'Stage Order',
					flex:1,
				},
				{
					dataIndex: 'activityid',
                    text: 'Activity',
					flex:1,
				},
				{
					dataIndex: 'stage',
					text: 'Stage',
					flex:1,
				},
				{
					dataIndex: 'estimated_daysperstage', 
					text: 'Days per stage Estimate',
					align: 'center',
					flex:1,
				},
				{
					
					text: 'Start Date',
					columns: [{
						dataIndex: 'estimated_start_date',
						text: 'Estimate',
						align:'center',
					},{
						dataIndex: 'actual_start_date',
						text: 'Actuals',
						align:'center',
					}]
				},{
					text:'End Date',
					columns: [{
						dataIndex: 'estimated_end_date',
						text: 'Estimate',
						align:'center',
					},{
						dataIndex: 'actual_end_date',
						text: 'Actuals',
						align:'center',
					}]
				}
				
			];

		this.callParent(arguments);

	}
});

