 Ext.define('MyDesktop.store.Receivable_a', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Receivable_a',
        proxy: {
    		type:'ajax',
			url: 'service/budget.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:13},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
		
	
	