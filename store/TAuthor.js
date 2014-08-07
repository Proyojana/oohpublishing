 Ext.define('MyDesktop.store.TAuthor', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.TAuthor',
        proxy: {
    		type:'ajax',
			url: 'service/projects.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:15},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	