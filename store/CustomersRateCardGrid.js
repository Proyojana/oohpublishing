 Ext.define('MyDesktop.store.CustomersRateCardGrid', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.RateCardGrid',
        proxy: {
    		type:'ajax',
			url: 'service/customer_Ratecard.php',
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
	
	
	