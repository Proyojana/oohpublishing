var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});

Ext.define('MyDesktop.view.projectmanagement.Archives.ArchivesGrid', {
	extend:'Ext.grid.Panel',
	title: 'List Of Projects',
	alias:'widget.archivesgrid',
	closeAction: 'hide',
	selModel:sm,
	//anchor: '76% 49%',
	requires:['MyDesktop.store.archives'],
	id:'archivesgrid',
	initComponent: function() {
		
		var completed = Ext.create('MyDesktop.store.archives');
		completed.load({
			params: {
				start: 0,
				limit: 30,
				
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
					dataIndex: 'word_count',
					text: 'Word Count',
					align: 'center',
					flex:1,
					
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


