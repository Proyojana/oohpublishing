var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['author','name','addr', 'email','tel','seeproof', 'noproof'],
    data: [
    { "author": "Author","name":"Henry Fielding", "addr": "Sharpham, Glastonbury, Somerset, England","email": "henry@gmail.com","tel":"2548794463","seeproof": "yes","noproof": "1"},
   
     ]
});			
Ext.define('MyDesktop.view.projectmanagement.currentprojects.Author', {
	extend:'Ext.grid.Panel',
	title: 'Authors',
	alias:'widget.author',
	closeAction: 'hide',
	//selModel:sm,
	width:1040,
	height:330,
	//anchor: '100% 56%',
	//.requires:['MyDesktop.store.Journal'],
	id:'author',
	initComponent: function() {
		
	var author = Ext.create('MyDesktop.store.AuthorGrid');
		author.load({
			params: {
				start: 0,
				limit: 50
			}
		});
	this.store = author,
		this.columns = [
	{
            header: 'Author/Editor',
            dataIndex: 'author',
            align: 'center',
            flex : 1
        }, {
            header: 'Name',
            dataIndex: 'name',
            align: 'center',
			flex : 1
        },{
            header: 'Address',
            dataIndex: 'address',
            align: 'center',
            flex : 2			
        }, {
            header: 'Email',
            dataIndex: 'email',
            align: 'center',
			flex:1
        }, {
            header: 'Telephone',
            dataIndex: 'phone',
            align: 'center',
            flex : 1
        }, {
            header: 'To see proofs?',
            dataIndex: 'see_proof',
            align: 'center',
			flex : 1
        }, {
            header: 'No of Proofs',
            dataIndex: 'no_proof',
            align: 'center',
			flex : 1
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
			items:[
			{
                               xtype : 'button',
                               id : 'edit_refresh_new_author',
                               text : 'Refresh',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
                              		author.reload();
            				 }                           
        },
			],
			listeners: {
							afterrender : function() {
								this.child('#refresh').hide();
							}		
						},
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
