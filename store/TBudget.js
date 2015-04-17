 Ext.define('MyDesktop.store.TBudget', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.TBudget',
        proxy: {
    		type:'ajax',
			url: 'service/budget.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:28},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	