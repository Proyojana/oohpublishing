 Ext.define('MyDesktop.store.archives', {
        extend:'Ext.data.Store',
		pageSize: 30,
        model: 'MyDesktop.model.archives',
        proxy: {
    		type:'ajax',
			url: 'service/emailTemplate.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:9},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	