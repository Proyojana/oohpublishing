var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['code','title', 'author','hbisbn','pbisbn', 'format','deadline','word', 'note'],
    data: [
    { "code":"PR005","title": "Tom Jones","author": "Henry Fielding","hbisbn":"23345345", "pbisbn": "23345345456","format": "HTML","deadline":"25/08/2014","word": "300","note": "Yes"},
    {"code":"PR006", "title": "Pride and Prejudice","author": "Jane Austen","hbisbn":"87984656", "pbisbn": "87984656","format": "HTML","deadline":"23/09/2014","word": "700","note": "Yes"},
    {"code":"PR007","title": "Le Rouge et le Noir","author": "Stendhal","hbisbn":"87984656", "pbisbn": "87984656","format": "HTML","deadline":"23/10/2014","word": "700","note": "Yes"},
    {"code":"PR008","title": "The Brothers Karamazov","author": " Dostoevsky","hbisbn":"87984656", "pbisbn": "87984656","format": "HTML","deadline":"23/10/2014","word": "700","note": "Yes"}
    
     ]
});			
Ext.define('MyDesktop.view.projectmanagement.currentprojects.PublisherGrid', {
	extend:'Ext.grid.Panel',
	title: 'List Of Projects',
	alias:'widget.publishergrid',
	closeAction: 'hide',
	selModel:sm,
	//width:1040,
//	height:250,
	anchor: '76% 49%',
	requires:['MyDesktop.view.projectmanagement.currentprojects.productionreport','MyDesktop.view.projectmanagement.currentprojects.typesetterform'  ],
	id:'publishergrid',
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
						iconCls: 'control_rewindClass',
						//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
						tooltip: 'Production Report',
					handler: function(grid, rowIndex, colIndex) {
					   
					   var win = Ext.create('Ext.Window', {
					extend : 'Ext.form.Panel',
					layout : {
						type : 'absolute'
					},
					 autoScroll:true,
				     //   maximizable : true,
					//title : 'Resubmission Reason',
					//frame : true,
					title:'Production Report',
					width : 650,
					height : 690,
					//modal:true,
					
					items : [
				
				     {
				    xtype:'productionreport',
				      x:0,
				    y:0
				   
					}
					
					]
					});
					win.show();
					

						
				}
			},{
				iconCls: 'applica_goClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Typesetting Report',
				handler: function(grid, rowIndex, colIndex) {
					var win = Ext.create('Ext.Window', {
					extend : 'Ext.form.Panel',
					layout : {
						type : 'absolute'
					},
					 autoScroll:true,
				     //   maximizable : true,
					//title : 'Resubmission Reason',
					//frame : true,
					title:'Typesetting Report',
					width : 650,
					height : 690,
					//modal:true,
					
					items : [
				
				     {
				    xtype:'typesetterform',
				      x:0,
				    y:0
				   
					}
					
					]
					});
					win.show();
					

					   
						
				}
			}]
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
