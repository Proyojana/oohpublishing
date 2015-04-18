 Ext.define('MyDesktop.store.TSchedule', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.TSchedule',
        proxy: {
    		type:'ajax',
			url: 'service/schedule.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:10},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	