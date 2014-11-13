 Ext.define('MyDesktop.store.completedprojects', {
        extend:'Ext.data.Store',
		pageSize: 10,
        model: 'MyDesktop.model.completedprojects',
        proxy: {
    		type:'ajax',
			url: 'service/completedprojects.php',
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
	
	
	