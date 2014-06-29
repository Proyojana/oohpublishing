var masternav = Ext.create('MyDesktop.store.PubNavTree');
Ext.define('MyDesktop.view.projectmanagement.MasterNav', {
			store:masternav,
        	extend: 'Ext.tree.Panel',
			alias:'widget.masternav',
    		width: 200,
			border: false,
    		rootVisible: false,
    		renderTo: Ext.getBody()
		});

		