 Ext.define('MyDesktop.store.Team', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Team',
        proxy: {
    		type:'ajax',
			url: 'service/Users.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:12},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	