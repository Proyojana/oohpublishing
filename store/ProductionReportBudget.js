 Ext.define('MyDesktop.store.ProductionReportBudget', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.ProductionReportBudget',
        proxy: {
    		type:'ajax',
			url: 'service/budget.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:33},
    		reader: {
				type:'json',
	        	root: 'results'
    		}
		},
    });
	
	
	
	
	