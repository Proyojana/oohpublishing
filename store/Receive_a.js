 Ext.define('MyDesktop.store.Receive_a', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Receive_a',
        proxy: {
    		type:'ajax',
			url: 'service/budget.php',
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
	
	
	