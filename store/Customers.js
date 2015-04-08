 Ext.define('MyDesktop.store.Customers', {
        extend:'Ext.data.Store',
		pageSize: 20,
        model: 'MyDesktop.model.Customers',
        proxy: {
    		type:'ajax',
			url: 'service/customers.php',
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
	
		
	
	