 Ext.define('MyDesktop.store.CurrentProjects', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.CurrentProjects',
        proxy: {
    		type:'ajax',
			url: 'service/VendorCurrentHistory.php',
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
	
	
	