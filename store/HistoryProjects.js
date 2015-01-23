 Ext.define('MyDesktop.store.HistoryProjects', {
        extend:'Ext.data.Store',
		pageSize: 50,
        model: 'MyDesktop.model.HistoryProjects',
        proxy: {
    		type:'ajax',
			url: 'service/VendorCurrentHistory.php',
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
	

	
	
	