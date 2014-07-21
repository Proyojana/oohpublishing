
    var contrib = Ext.create('Ext.data.Store', {
   fields: ['Chapter_number', 'surname','email','approve','Sent','Back'],
   data : [
        {"Chapter_number":"4", "surname":"George","email":"george@gmail.com","approve":"3","Sent":"14/01/2014","Back":"21/01/2014"},
         {"Chapter_number":"4", "surname":"Brian","email":"brian@gmail.com","approve":"3","Sent":"23/01/2014","Back":""},
        
       ]
   });
Ext.define('MyDesktop.view.projectmanagement.newproject.ContributorsGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.contributorsgrid',
	closeAction: 'hide',
	
//	height:200,
	//requires : ['MyDesktop.store.freelancer'],
	anchor: '76% 30%',
	id:'contributorsgrid',
	title:'Contributors',
	
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
	initComponent: function() {
		
		/*var ci = Ext.create('MyDesktop.store.freelancer');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);*/
		this.store = contrib,
			this.columns = [
				{
					dataIndex: 'Id',
					hidden:true
				},
				{
					dataIndex: 'Chapter_number',
					text: 'Chapter Number',
					align: 'center',
					flex:1,
					editor:{
					 	xtype:'textfield'
                        },
				},
				{
					dataIndex: 'surname',
					text: 'Contributor Name',
					align: 'center',
					flex:1,
				editor:{
					 	xtype:'textfield'
                        },
				},
				
				{
					dataIndex: 'email',
					text: 'Email Address',
					align: 'center',
					flex:2,
					editor:{
					 	xtype:'textfield'
                        },
				},
				{
					dataIndex: 'approve',
					text: 'To See Proofs?',
					align: 'center',
					flex:2,
				editor:{
					 	xtype:'textfield'
                        },
           	
				},
				{
					dataIndex: 'Sent',
					text: 'Proof Sent',
					align: 'center',
					flex:2,
					editor:{
					 	xtype:'textfield'
                        },           	
				},
				{
					dataIndex: 'Back',
					text: 'Proof Back',
					align: 'center',
					flex:2,
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
