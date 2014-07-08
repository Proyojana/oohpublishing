 Ext.define('MyDesktop.store.Customers_Client', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Customers',
        proxy: {
    		type:'ajax',
			url: 'service/customers.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:2},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
		
	
	