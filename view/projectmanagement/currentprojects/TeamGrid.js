var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
		

Ext.define('MyDesktop.view.projectmanagement.currentprojects.TeamGrid', {
	extend:'Ext.grid.Panel',
	//features:[filters],
	title: 'Team Info',
	alias:'widget.teamgrid',
	closeAction: 'hide',
	//selModel:sm,
 	requires : ['MyDesktop.store.Team'],
	//requires : ['MyDesktop.store.City','MyDesktop.view.city.CityImportForm'],
	
	id:'teamgrid',
	initComponent: function() {
		var notes = Ext.create('MyDesktop.store.Team');
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
					dataIndex: 'role',
					text: 'Role',
					align: 'center',
					flex:1,
					
				},
				{
					dataIndex: 'name',
					text: 'Name',
					align: 'center',
					flex:1,
					
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
