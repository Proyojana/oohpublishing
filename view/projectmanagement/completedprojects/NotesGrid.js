
/*Completed project notesgrid*/

var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
		

Ext.define('MyDesktop.view.projectmanagement.completedprojects.NotesGrid', {
	extend:'Ext.grid.Panel',
	//features:[filters],
	title: 'Notes & Reminders',
	alias:'widget.notesgridCP',
	closeAction: 'hide',
	//selModel:sm,
 	anchor: '76% 30%',
	requires : ['MyDesktop.store.Notes'],
	
	
	id:'notesgridCP',
	initComponent: function() {
		var notes = Ext.create('MyDesktop.store.Notes');
		notes.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		notes.loadPage(1);
		this.store = notes,		
			this.columns = [
			
				{
					dataIndex: 'dateraised',
					text: 'Date Raised',
					align: 'center',
					flex:1,
					
				},
				{
					dataIndex: 'narrative',
					text: 'Narrative',
					align: 'center',
					flex:3,
					
				},
				
				{
					dataIndex: 'dateresolved',
					text: 'Date Resolved',
					flex:1,
					align: 'center',
				},
				
			];
		this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
			]
			
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);

