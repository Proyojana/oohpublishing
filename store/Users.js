 Ext.define('MyDesktop.store.Users', {
        extend:'Ext.data.Store',
		pageSize: 40,
        model: 'MyDesktop.model.Users',
        proxy: {
    		type:'ajax',
			url: 'service/Users.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:1},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	