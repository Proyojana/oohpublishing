 Ext.define('MyDesktop.store.Service', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Service',
        proxy: {
    		type:'ajax',
			url: 'service/Service.php',
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
	
	
	