 Ext.define('MyDesktop.store.GetVenCntct', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.GetVenCntct',
        proxy: {
    		type:'ajax',
			url: 'service/GetVenCntct.php',
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
	
	
	