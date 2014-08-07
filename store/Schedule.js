 Ext.define('MyDesktop.store.Schedule', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Schedule',
        proxy: {
    		type:'ajax',
			url: 'service/schedule.php',
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
	
		
	
	