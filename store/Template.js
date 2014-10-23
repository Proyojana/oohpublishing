 Ext.define('MyDesktop.store.Template', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Template',
        proxy: {
    		type:'ajax',
			url: 'service/emailTemplate.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:5},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	