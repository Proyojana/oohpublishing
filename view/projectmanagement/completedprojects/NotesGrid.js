var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			var available = Ext.create('Ext.data.Store', {
    fields: ['sno','dateraised', 'narrative', 'dateresolved'],
    data : [
         { "sno":"01",    "dateraised":"02/01/14" ,    "narrative":"Changes has been made on Chapter-II header",	     "dateresolved":"21/01/14"},
         
        
         
        ]
    });

Ext.define('MyDesktop.view.projectmanagement.completedprojects.NotesGrid', {
	extend:'Ext.grid.Panel',
	//features:[filters],
	title: 'Notes & Remainders',
	alias:'widget.notesgridCP',
	closeAction: 'hide',
	//selModel:sm,
 	anchor: '76% 30%',
	//requires : ['MyDesktop.store.reviewer'],
	//requires : ['MyDesktop.store.City','MyDesktop.view.city.CityImportForm'],
	
	id:'notesgridCP',
	initComponent: function() {
		
		
		this.store = available,
			this.columns = [
				{
					dataIndex: 'sno',
                                      text: 'SL No:',
					flex:0.5,
				},
				{
					dataIndex: 'dateraised',
					text: 'Date Raised',
					align: 'center',
					
					store:available,
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'narrative',
					text: 'Narrative',
					align: 'center',
					store:available,
					
					flex:2,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'dateresolved',
					text: 'Date Resolved',
					flex:1,
						store:available,
					align: 'center',
					width:270,
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
			items:[
			]
			
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
