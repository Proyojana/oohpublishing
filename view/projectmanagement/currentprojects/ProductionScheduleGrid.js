
Ext.define('MyDesktop.view.projectmanagement.currentprojects.ProductionScheduleGrid', {
	extend:'Ext.grid.Panel',
	//title: 'Schedule Grid',
	alias:'widget.pschedulegrid',
	closeAction: 'hide',
	
	id:'pschedulegrid',
	
initComponent: function() {

		var ci = Ext.create('MyDesktop.store.ViewReportSchedule');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);
		this.store = ci,
		this.columns = [
		{
			dataIndex: 'activity',
			text: 'Activity',
			flex:1,
			
		},
		{
			dataIndex: 'stage',
			text: 'Stage',
			flex:1,
		},
		{
				dataIndex: 'estimated_end_date',
				text: 'Estimated End Date',
				flex:1,


			},
			{
				dataIndex: 'actual_end_date',
				text: 'Actual End Date',
				flex:1,
				
			},
		];
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);