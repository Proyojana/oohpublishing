 Ext.define('MyDesktop.store.RateCardGrid', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.RateCardGrid',
        proxy: {
    		type:'ajax',
			url: 'service/Vendors_ratecard.php',
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
	
	
	