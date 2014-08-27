 Ext.define('MyDesktop.store.ViewReportSchedule', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.ViewReportSchedule',
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
	
		
	
	