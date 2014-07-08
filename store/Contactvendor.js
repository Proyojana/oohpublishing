 Ext.define('MyDesktop.store.Contactvendor', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Contactvendor',
        proxy: {
    		type:'ajax',
			url: 'service/ContactInfoVen.php',
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
	
	
	
	