var masternav = Ext.create('MyDesktop.store.MasterNavTree');
Ext.define('MyDesktop.view.mastermanagement.MasterNav', {
			store:masternav,
        	extend: 'Ext.tree.Panel',
			alias:'widget.masternav',
    		width: 200,
			border: false,
    		rootVisible: false,
    		renderTo: Ext.getBody()
		});

		