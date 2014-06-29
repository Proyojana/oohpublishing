var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['code','title', 'author','hbisbn','pbisbn', 'format','deadline','word', 'note'],
    data: [
    {"code":"PR001", "title": "A pair of Blue Eyes","author": "Thomash Hardy","hbisbn":"23566", "pbisbn": "23566","format": "HTML","deadline":"25/01/2014","word": "300","note": "Yes"},
    { "code":"PR002","title": "Crisis of India","author": "Ronal Segal","hbisbn":"1623566", "pbisbn": "1623566","format": "HTML","deadline":"23/01/2014","word": "700","note": "Yes"},
    {"code":"PR003","title": "A Gift Of Monothesists","author": "Ram Mohan Ray","hbisbn":"12314", "pbisbn": "12314","format": "HTML","deadline":"23/01/2014","word": "700","note": "Yes"},
    {"code":"PR004","title": "A Nation is Making","author": " Surender","hbisbn":"489746", "pbisbn": "489746","format": "HTML","deadline":"23/01/2014","word": "700","note": "Yes"}
    
     ]
});			
Ext.define('MyDesktop.view.projectmanagement.completedprojects.PublisherGrid', {
	extend:'Ext.grid.Panel',
	title: 'List Of Projects',
	alias:'widget.publishergridCP',
	closeAction: 'hide',
	selModel:sm,
	//width:1040,
//	height:250,
	anchor: '76% 49%',
	//.requires:['MyDesktop.store.Journal'],
	id:'publishergridCP',
	initComponent: function() {
		
	/*	var journal = Ext.create('MyDesktop.store.Journal');
		journal.load({
			params: {
				start: 0,
				limit: 10,
				
			}
		});
		//journal.loadPage(1);*/
		this.store = store1,
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
					//width:100,
				},
				{
					dataIndex: 'title',
					text: 'Title',
					align: 'left',
					flex:1.5,
					//width:100,
				},
				{
					dataIndex: 'author',
					text: 'Author',
					align: 'left',
					//width:100,
					flex:1,
				},
				
				{
					dataIndex: 'hbisbn',
					text: 'HB ISBN',
					align: 'center',
					//width:100,
					flex:1,
					
				},
				{
					dataIndex: 'pbisbn',
					text: 'PB ISBN',
					align: 'center',
					//width:100,
					flex:1,
				},
				{
					dataIndex: 'format',
					text: 'Format',
					align: 'left',
					//width:100,
					flex:0.5,
					
				},
				
				{
					dataIndex: 'deadline',
					text: 'Agreed Deadline',
					align: 'center',
					//width:100,
					flex:1,
					
				},
{
					dataIndex: 'word',
					text: 'Word Count',
					align: 'center',
					//width:100,
					flex:1,
					
				},
				
				{
					dataIndex: 'note',
					text: 'Notes',
					align: 'left',
					//width:100,
					flex:0.5,
					
				},
				{
					xtype:'actioncolumn',
					align: 'center',
					//width:100,
					flex:1,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					   
						
				}
			},/*{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {
					
					   
						
				}
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
					
					
					}
				}*/]
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

// Load first data page
//    employee.loadPage(1);
