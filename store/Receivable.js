 Ext.define('MyDesktop.store.Receivable', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Receivable',
        proxy: {
    		type:'ajax',
			url: 'service/budget.php',
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
	
		
	
	