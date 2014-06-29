var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var authr = Ext.create('Ext.data.JsonStore', {
    fields: ['author','name','addr', 'email','tel','seeproof', 'noproof'],
    data: [
    { "author": "Author","name":"Henry Fielding", "addr": "Sharpham, Glastonbury, Somerset, England","email": "henry@gmail.com","tel":"2548794463","seeproof": "yes","noproof": "1"},
   
     ]
});			
Ext.define('MyDesktop.view.projectmanagement.newproject.AuthorGrid', {
	extend:'Ext.grid.Panel',
	title: 'Authors',
	alias:'widget.authorgrid',
	closeAction: 'hide',
	//selModel:sm,
	width:1040,
	height:330,
	//anchor: '100% 56%',
	//.requires:['MyDesktop.store.Journal'],
	id:'authorgrid',
	
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
		
	/*	var journal = Ext.create('MyDesktop.store.Journal');
		journal.load({
			params: {
				start: 0,
				limit: 10,
				
			}
		});
		//journal.loadPage(1);*/
		this.store = authr,
		this.columns = [
		{
				xtype:'rownumberer',
				hidden:true
			},
	{
            header: 'Author/Editor',
            dataIndex: 'author',
            align: 'center',
            flex : 1,
            editor:{
					 	xtype:'textfield'
                        },
        }, {
            header: 'Name',
            dataIndex: 'name',
            align: 'center',
			flex : 1,
			editor:{
					 	xtype:'textfield'
                        },
        },{
            header: 'Address',
            dataIndex: 'addr',
            align: 'center',
            flex : 2,
            editor:{
					 	xtype:'textfield'
                        },			
        }, {
            header: 'Email',
            dataIndex: 'email',
            align: 'center',
			flex:1,
			editor:{
					 	xtype:'textfield'
                        },
        }, {
            header: 'Telephone',
            dataIndex: 'tel',
            align: 'center',
            flex : 1,
            editor:{
					 	xtype:'textfield'
                        },
        }, {
            header: 'To see proofs?',
            dataIndex: 'seeproof',
            align: 'center',
			flex : 1,
			editor:{
					 	xtype:'textfield'
                        },
        }, {
            header: 'No of Proofs',
            dataIndex: 'noproof',
            align: 'center',
			flex : 1,
			editor:{
					 	xtype:'textfield'
                        },
        },		/*{
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
