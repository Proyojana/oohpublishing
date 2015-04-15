 Ext.define('MyDesktop.store.Vendors', {
        extend:'Ext.data.Store',
		pageSize: 20,
        model: 'MyDesktop.model.Vendors',
        proxy: {
    		type:'ajax',
			url: 'service/vendors.php',
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
	
	
	