 Ext.define('MyDesktop.store.ProjectReport', {
        extend:'Ext.data.Store',
		pageSize: 50,
        model: 'MyDesktop.model.ProjectReport',
        proxy: {
    		type:'ajax',
			url: 'service/Reports.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:7},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	