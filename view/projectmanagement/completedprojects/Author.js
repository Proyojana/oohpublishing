var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['author','name','addr', 'email','tel','seeproof', 'noproof'],
    data: [
    { "author": "Author","name":"Henry Fielding", "addr": "Sharpham, Glastonbury, Somerset, England","email": "henry@gmail.com","tel":"2548794463","seeproof": "yes","noproof": "1"},
   
     ]
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
            dataIndex: 'addr',
            align: 'center',
            flex : 2			
        }, {
            header: 'Email',
            dataIndex: 'email',
            align: 'center',
			flex:1
        }, {
            header: 'Telephone',
            dataIndex: 'tel',
            align: 'center',
            flex : 1
        }, {
            header: 'To see proofs?',
            dataIndex: 'seeproof',
            align: 'center',
			flex : 1
        }, {
            header: 'No of Proofs',
            dataIndex: 'noproof',
            align: 'center',
			flex : 1
        },];
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
