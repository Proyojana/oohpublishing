var masternav = Ext.create('MyDesktop.store.BudgetNavTree');
Ext.define('MyDesktop.view.budgetmanagement.MasterNav', {
			store:masternav,
        	extend: 'Ext.tree.Panel',
			alias:'widget.masternav',
    		width: 200,
			border: false,
    		rootVisible: false,
    		renderTo: Ext.getBody()
		});

		