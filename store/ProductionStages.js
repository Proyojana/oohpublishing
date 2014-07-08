 Ext.define('MyDesktop.store.ProductionStages', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.ProductionStages',
        proxy: {
    		type:'ajax',
			url: 'service/activity.php',
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
	
	
	