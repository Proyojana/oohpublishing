 Ext.define('MyDesktop.store.Customers_team', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Customers_team',
        proxy: {
    		type:'ajax',
			url: 'service/customers_Teams.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:3},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
		
	
	