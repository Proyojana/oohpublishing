 Ext.define('MyDesktop.store.Completed', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Completed',
        proxy: {
    		type:'ajax',
			url: 'service/completed.php',
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
	
	
	