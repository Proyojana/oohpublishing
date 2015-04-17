 Ext.define('MyDesktop.store.TBudgetpay', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.TBudgetpay',
        proxy: {
    		type:'ajax',
			url: 'service/budget.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:30},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	