 Ext.define('MyDesktop.store.CurrencyRate', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.CurrencyRate',
        proxy: {
    		type:'ajax',
			url: 'service/CurrencyRate.php',
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
	
	
	