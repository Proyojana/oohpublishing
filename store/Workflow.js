 Ext.define('MyDesktop.store.Workflow', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.Workflow',
        proxy: {
    		type:'ajax',
			url: 'service/Workflow.php',
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
	
	
	