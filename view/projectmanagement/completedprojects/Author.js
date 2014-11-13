

/*Completed project author details.*/

var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
		
Ext.define('MyDesktop.view.projectmanagement.completedprojects.Author', {
	extend:'Ext.grid.Panel',
	title: 'Authors',
	alias:'widget.authorCP',
	closeAction: 'hide',
	//selModel:sm,
	width:1040,
	height:330,
	//anchor: '100% 56%',
	//.requires:['MyDesktop.store.Journal'],
	id:'authorCP',
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
		

];
		this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display"
		}),
		
		this.callParent(arguments);

	}
});

