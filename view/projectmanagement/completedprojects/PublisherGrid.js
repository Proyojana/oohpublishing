var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});

Ext.define('MyDesktop.view.projectmanagement.completedprojects.PublisherGrid', {
	extend:'Ext.grid.Panel',
	title: 'List Of Projects',
	alias:'widget.publishergridCP',
	closeAction: 'hide',
	selModel:sm,
	//anchor: '76% 49%',
	requires:['MyDesktop.store.Completed'],
	id:'publishergridCP',
	initComponent: function() {
		
		var completed = Ext.create('MyDesktop.store.Completed');
		completed.load({
			params: {
				start: 0,
				limit: 10,
				
			}
		});
		completed.loadPage(1);
		this.store = completed,
		this.columns = [
	{
					dataIndex: 'id',
					hidden:true
				},
                              {
					dataIndex: 'code',
					text: 'Project Code',
					align: 'left',
					flex:1.5,
					
				},
				{
					dataIndex: 'title',
					text: 'Title',
					align: 'left',
					flex:1.5,
					
				},
				{
					dataIndex: 'author',
					text: 'Author',
					align: 'left',
					flex:1,
				},
				
				{
					dataIndex: 'design',
					text: 'Design',
					align: 'center',
					flex:1,
					
				},
				{
					dataIndex: 'series',
					text: 'Series',
					align: 'center',
					flex:1,
				},
				{
					dataIndex: 'format',
					text: 'Format',
					align: 'left',
					flex:0.5,
					
				},
				
				{
					dataIndex: 'deadline',
					text: 'Agreed Deadline',
					align: 'center',
					flex:1,
					
				},
{
					dataIndex: 'word',
					text: 'Word Count',
					align: 'center',
					flex:1,
					
				},
				
				{
					xtype:'actioncolumn',
					align: 'center',
					flex:1,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					   
						
				}
			},]
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


