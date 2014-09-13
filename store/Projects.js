 Ext.define('MyDesktop.store.Projects', {
        extend:'Ext.data.Store',
		pageSize: 10,
        model: 'MyDesktop.model.Projects',
        proxy: {
    		type:'ajax',
			url: 'service/projects.php',
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
	
	
	