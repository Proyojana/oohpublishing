var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			var n_store = Ext.create('Ext.data.Store', {
    fields: ['sno','dateraised', 'narrative', 'dateresolved'],
    data : [
         { "sno":"01",    "dateraised":"02/01/14" ,    "narrative":"Changes has been made on Chapter-II header",	     "dateresolved":"21/01/14"},
         
        
         
        ]
    });

Ext.define('MyDesktop.view.projectmanagement.newproject.CreateNotesGrid', {
	extend:'Ext.grid.Panel',
	//features:[filters],
	title: 'Notes & Remainders',
	alias:'widget.newnotesgrid',
	closeAction: 'hide',
	//selModel:sm,
 	anchor: '76% 30%',
	//requires : ['MyDesktop.store.reviewer'],
	//requires : ['MyDesktop.store.City','MyDesktop.view.city.CityImportForm'],
	
	id:'newnotesgrid',
	plugins: [
             Ext.create('Ext.grid.plugin.CellEditing', {
                 clicksToEdit: 1,
                  markDirty: true,
                   listeners: {
                 'edit': function (editor,e) {
                                         var grid = e.grid;
                                                    var record = e.record;
                                                    if(record.data.status==2 || record.data.status==3)
                                                    return false;
                                   }
                               }
             })        
   ],
	
	width:'auto',
	initComponent: function() {
		
		
		this.store = n_store,
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
					
				//	store:available,
					flex:1,
					editor:{
					 	xtype:'textfield'
                        },
				},
				{
					dataIndex: 'narrative',
					text: 'Narrative',
					align: 'center',
					//store:available,
					//width:270,
					flex:2,
					editor:{
					 	xtype:'textfield'
                        },

				},
				
				{
					dataIndex: 'dateresolved',
					text: 'Date Resolved',
					flex:1,
					//	store:available,
					align: 'center',
					
					editor:{
					 	xtype:'textfield'
                        },
				},
				/*{
					xtype:'actioncolumn',
					align: 'center',
flex : 1,
					width:250,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						tooltip: 'View',
		
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
		
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
			
				}]
		
		}*/
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
