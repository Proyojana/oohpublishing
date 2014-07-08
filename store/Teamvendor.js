 Ext.define('MyDesktop.store.Teamvendor', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Teamvendor',
        proxy: {
    		type:'ajax',
			url: 'service/TeamsVendor.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:3},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	
	