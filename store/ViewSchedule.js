 Ext.define('MyDesktop.store.ViewSchedule', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.ViewSchedule',
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
	
		
	
	