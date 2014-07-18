 Ext.define('MyDesktop.store.ProductionEditor', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Users',
        proxy: {
    		type:'ajax',
			url: 'service/Users.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:9},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	