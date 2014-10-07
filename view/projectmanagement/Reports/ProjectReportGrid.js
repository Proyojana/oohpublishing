
Ext.define('MyDesktop.view.projectmanagement.Reports.ProjectReportGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.projectreportgrid',
	closeAction: 'hide',
	
	
	height:200,
	requires : ['MyDesktop.store.ProjectReport'],
	title:'Project Reports',
	id:'projectreportgrid',
	
	initComponent: function() {
		
		var Report = Ext.create('MyDesktop.store.ProjectReport');
		Report.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		Report.loadPage(1);
		
		this.store = Report,
			this.columns = [
				
				{
					dataIndex: 'code',
					text: 'Project Code',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'title',
					text: 'Title',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'status',
					text: 'Status',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'adeadline',
					text: 'Agreed Deadline',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'coe',
					text: 'Cast Off Extend',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'ce',
					text: 'Current Extend',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'Level',
					text: 'Production Editor',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'pm',
					text: 'Project Manager',
					align: 'center',
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				
				
				
		];
		
		this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			
			
		}),
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
