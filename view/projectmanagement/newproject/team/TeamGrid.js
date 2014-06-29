var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['job','jobtitle', 'name','role','description'],
    data: [{"job":"US001","jobtitle":"Project A","name":"James El","role":"Project Manager","description":"Manages the project"},
    {"job":"US002","jobtitle":"Project A","name":"Richard Branson","role":"Production Editor","description":"Focused on putting the article into its printed form"},
    {"job":"US003","jobtitle":"Project A","name":"Aaron Ramsey","role":"Copy Editor","description":"Checks the formatting, style, and accuracy of text"},
     {"job":"US004","jobtitle":"Project A","name":"Blinda Edward","role":"Proof Reader","description":"Correct typographical errors and mistakes in grammar"},
      {"job":"US004","jobtitle":"Project A","name":"Gilbert","role":"Indexer","description":"Provides an index"},
       {"job":"US004","jobtitle":"Project A","name":"Steve Jaccob","role":"Typesetter","description":"Arranging physical types or the digital equivalents"},
    
    ]
     });	
Ext.define('MyDesktop.view.projectmanagement.newproject.team.TeamGrid', {
	extend:'Ext.ux.LiveSearchGridPanel',
	alias:'widget.newteamgrid',
	closeAction: 'hide',
	selModel:sm,
	height:250,
	//requires : ['MyDesktop.store.Dept'],
	
	id:'newteamgrid',
	initComponent: function() {
		
		
		this.store = store1,
			this.columns = [
				{
					dataIndex: 'job',
					text: 'Job #',
					align: 'center',
                    flex:1,
                    hidden:true
 			},
				{
					dataIndex: 'jobtitle',
					text: 'Title',
					align: 'center',
 flex:1,
					
				},
				{
					dataIndex: 'name',
					text: 'Name',
					align: 'center',
                    flex:1,
					
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'role',
					text: 'Role',
					align: 'center',
 flex:1,
					
					filter: {
                	type: 'string'
           		}
				},				
				{
					dataIndex: 'description',
					text: 'Description',
					align: 'center',
 flex:1,
					
					filter: {
                	type: 'string'
           		}
				},
				/*{
					dataIndex: 'description',
					text: 'Proof Reader',
					align: 'center',
 flex:1,
					
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'description',
					text: 'Indexer',
					align: 'center',
 flex:1,
					
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'description',
					text: 'Typesetter',
					align: 'center',
 flex:1,
					
					filter: {
                	type: 'string'
           		}
				},*/
				
				{
					xtype:'actioncolumn',
					align: 'center',
 flex:1,
					width:250,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						tooltip: 'View',
					handler: function(grid, rowIndex, colIndex) {
					  
						
				}
			},{
				iconCls: 'editClass',
				tooltip: 'Edit',
		 	handler: function(grid, rowIndex, colIndex) {
					
					   
						
				}
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
					
					
					}
				}]
		}];
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

