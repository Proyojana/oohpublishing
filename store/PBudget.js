 Ext.define('MyDesktop.store.PBudget', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.PBudget',
        proxy: {
    		type:'ajax',
			url: 'service/projects.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:13},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
	//employee.load({params:{start: 0, limit: 50}});
	
	
	