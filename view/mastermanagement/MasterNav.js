if(role==1)
{
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
	}
else
{
var masternav1 = Ext.create('MyDesktop.store.MasterNavTreeUser');
Ext.define('MyDesktop.view.mastermanagement.MasterNav', {
			store:masternav1,
        	extend: 'Ext.tree.Panel',
			alias:'widget.masternav1',
    		width: 200,
			border: false,
    		rootVisible: false,
    		renderTo: Ext.getBody()
		});
}
		