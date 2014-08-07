Ext.define('MyDesktop.view.projectmanagement.currentprojects.TypesetterAuthorGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.tauthorgrid',
	closeAction: 'hide',
	id:'tauthorgrid',
	
	requires : ['MyDesktop.store.TAuthor'],
	initComponent: function() {
		var tauthor = Ext.create('MyDesktop.store.TAuthor');
		tauthor.load({params:{start: 0, limit: 50}});
	    tauthor.loadPage(1);
			this.store = tauthor,
			this.columns = [
				{
					dataIndex: 'au_name',
                    text: 'Name',
					flex:1,
				},
				{
					dataIndex: 'au_address',
					text: 'Address',
					flex:1,
				},
				{
					dataIndex: 'au_nop', 
					text: 'No.of Proof',
					align: 'center',
					flex:1,
				},
				
			];

		this.callParent(arguments);

	}
});

